<template>
  <div class="preview-content">
    <md-card>
      <md-card-header>
        <header class="top-operation" v-if="!disabled">
          <span>
            <md-button class="md-raised md-primary" disabled v-if="item.published">Has Published</md-button>
            <md-button class="md-raised md-primary" @click="published" v-else >Publish</md-button>
          </span>
          <span>
            <md-button class="md-raised md-accent" @click="remove" >remove</md-button>
          </span>
        </header>
        <br>
        <div class="md-title">{{item.sourceTitle}}</div>
      </md-card-header>
      <md-card-content>
        <p v-for="(line, index) in transContent" class="pline">
          <img v-if="line.img" :src="line.src" alt="" />
          <span v-else>{{line}}</span>

          <span class="op">
            <span @click="removeLine(index)" class="danger">删</span>
          </span>
        </p>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: '',
  props: {
    disabled: Boolean,
    item: {
      type: Object,
      default: () => ({
        content: '',
      }),
    },
  },
  components: {

  },
  data () {
    return {
    }
  },
  mounted () {

  },
  computed: {
    transContent () {
      const content = (this.item.content || '').split('__JOIN__');
      const referer = 'http://nga.cn';

      return content.map(line => {
        if (/^http/.test(line)) {
          return {
            img: true,
            src: this.$utils.proxyUrl(line, referer),
          };
        }
        return line;
      });
    },
  },
  methods: {
    async published () {
      this.item.published = true;
      await this.$api.markPublished(this.item);

      await this.$api.publishItem(this.item);
    },
    async remove () {

      await this.$api.removeItem(this.item);

      this.$emit('remove', this.item);
    },
    removeLine (index) {
      const content = (this.item.content || '').split('__JOIN__');
      content.splice(index, 1);
      this.item.content = content.join('__JOIN__');
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.preview-content {
  width: 100%;
  height: 100%;

  .top-operation {
    overflow: hidden;
    > span {
      margin-left: 8px;
      float: right;
    }
  }
  .pline {
    position: relative;

    .op {
      > span {
        cursor: pointer;
      }
    }
  }
}
</style>
