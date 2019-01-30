<template>
  <div class="content-list">
    <div class="l1">

      <md-card>
        <md-card-header>
          <div class="md-title">{{title}}</div>
        </md-card-header>

        <md-card-content>
          <md-list>
            <md-list-item  v-for="item in showList" :key="item.sourceTitle">
              <md-checkbox v-model="item.published" disabled />
              <span @click.stop="selectedItem = item" class="md-list-item-text">
                {{item.sourceTitle || '空'}}</span>
            </md-list-item>
          </md-list>
        </md-card-content>
      </md-card>
      <header>
      </header>
    </div>
    <div class="l2">
      <PreviewContent
        :disabled="disabled"
        :key="JSON.stringify(selectedItem)"
        :item="selectedItem"
        @remove="onRemove" />
    </div>
  </div>
</template>

<script>
import PreviewContent from './PreviewContent.vue';

export default {
  name: '',
  props: {
    disabled: Boolean,
    title: String,
    list: {
      type: Array,
      default: () => ([]),
    },
  },
  components: {
    PreviewContent,
  },
  data () {
    return {
      selectedItem: this.list[0],
      removed: [],
    };
  },
  mounted () {

  },
  computed: {
    showList () {
      let i=0;
      let l = this.list;
      // while (i++ < 6) {
      //   l = l.concat(l);
      // }
      return l.filter(o => this.removed.indexOf(o._id) === -1);
    },
  },
  methods: {
    onRemove (item) {
      this.selectedItem = undefined;
      this.removed = this.removed.concat(item);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content-list {
  padding: 15px 0;
  display: flex;
  .l1 {
    flex:1;
    min-width:400px;
    /* box-shadow: 1px 1px 10px 0px #bbb; */
    .md-card-content {
      height: 600px;
      overflow: auto;
      padding-bottom: 20px;
    }
    .md-list-item-text {
      cursor: pointer;
    }
  }
  .l2 {
    flex:1;
    margin-left: 20px;
    height: 672px;
    overflow: auto;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  }
}
</style>
