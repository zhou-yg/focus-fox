<script type="text/babel">
/**
 * Created by zhouyg.
 */
import Vue from 'vue';
import ContentList from './common/ContentList.vue';
import PreviewContent from './common/PreviewContent.vue';

import axios from 'axios';

const Cpt = Vue.extend({
  components: {
    PreviewContent,
    ContentList,
  },
  props: {
  },
  data () {
    return {
      code: '',
      name: '',
      index: 0,
    };
  },
  computed: {
    listWithPlatform () {
      let obj = {
        ngacc: [],
        others: [],
      };
      this.list.forEach((o) => {
        if (o.sourcePlatform && obj[o.sourcePlatform]) {
          obj[o.sourcePlatform].push(o);
        }  else {
          obj.others.push(o)
        }
      });
      console.log(obj);
      return obj;
    },
    statePng () {
      let u = `http://localhost:6800/imgs/${this.name}-login.png?t=${this.index}`;
      return u;
    },
  },
  mounted () {
    this.$nextTick(() => {
    });
    setInterval(() => {
      if (this.name) {
        this.index = Date.now();        
      }
    }, 1000);
  },
  methods: {
    async submitCode () {
      let w = window.open(`http://localhost:6800/readline/${this.code}`);
      setTimeout(() => {
        w.close();
      }, 1000);
    },
  },
});

export default Cpt;
</script>

<template lang="html">
  <div class="site-login-state">
    <div class="row">
      <router-link to="/views/images/sites">
        <md-button class="md-raised md-primary" ><<返回</md-button>
      </router-link>
    </div>
    <div class="row p">
      <md-field>
        <label>验证码</label>
        <md-input v-model="code"></md-input>
        <md-button class="md-raised md-primary" @click="submitCode">提交</md-button>
      </md-field>
    </div>
    <div class="">
      <md-card>
        <md-card-header>
          <md-radio v-model="name" value="ngacc">ngacc</md-radio>
          <md-radio v-model="name" value="toutiao">toutiao</md-radio>
        </md-card-header>
        <md-card-content>
          <img :src="statePng" alt="">
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<style lang="css" scoped="">
.site-login-state {
  padding: 15px;

  .row {
    background-color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    position: relative;
    margin-bottom: 16px;
    &.p {
      padding: 6px 8px 0.1px;
    }
  }
}
</style>
