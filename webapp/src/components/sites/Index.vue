<script type="text/babel">
/**
 * Created by zhouyg.
 */
import Vue from 'vue';

import axios from 'axios';

const Cpt = Vue.extend({
  components: {
  },
  props: {
  },
  data () {
    return {
    };
  },
  computed: {

  },
  mounted () {
    this.$nextTick(() => {
    });
  },
  methods: {
    open (url) {
      let w = window.open(url);
      setTimeout(() => w.close(), 1000);
    },
  },
});

export default Cpt;
</script>

<template lang="html">
  <div class="index">
    <div class="index-item">
      <md-card>
        <md-card-header>
          <div class="md-title">Puppeteer测试</div>
        </md-card-header>

        <md-card-content>
        </md-card-content>

        <md-card-actions>
          <a href="http://localhost:6800/test" target="_blank">
            <md-button  class="md-raised md-primary">测试</md-button>
          </a>
        </md-card-actions>
      </md-card>
    </div>
    <div class="index-item">
      <md-card>
        <md-card-header>
          <div class="md-title">内容库</div>
        </md-card-header>

        <md-card-content>
        </md-card-content>

        <md-card-actions>
          <router-link to="/views/images/sites/list">
            <md-button  class="md-raised md-primary">查看</md-button>
          </router-link>
        </md-card-actions>
      </md-card>
    </div>
    <div class="index-item">
      <md-card>
        <md-card-header>
          <div class="md-title">已推送库</div>
        </md-card-header>

        <md-card-content>
        </md-card-content>

        <md-card-actions>
          <router-link to="/views/images/sites/published">
            <md-button  class="md-raised md-primary">查看</md-button>
          </router-link>
        </md-card-actions>
      </md-card>
    </div>

    <div class="index-item">
      <md-card>
        <md-card-header>
          <div class="md-title">搜索NGACC</div>
        </md-card-header>

        <md-card-content>
        </md-card-content>

        <md-card-actions>
          <a href="javascript:void 0" @click="open('http://localhost:6800/ngacc/content1')" >
            <md-button  class="md-raised md-primary">段子</md-button>
          </a>

        </md-card-actions>
      </md-card>
    </div>
    <div class="index-item">
      <md-card>
        <md-card-header>
          <div class="md-title">推送Toutiao</div>
        </md-card-header>

        <md-card-content>
        </md-card-content>

        <md-card-actions>
          <a href="javascript:void 0" @click="open('http://localhost:6800/toutiao/graphic')" >
            <md-button  class="md-raised md-primary">图文</md-button>
          </a>

        </md-card-actions>
      </md-card>
    </div>

    <div class="index-item">
      <md-card>
        <md-card-header>
          <div class="md-title">登录状态查询</div>
        </md-card-header>

        <md-card-content>
          <!-- <p>
            <a href="http://localhost:6800/imgs/ngacc-login.png" target="_blank">ngacc-login.png</a>
          </p> -->
        </md-card-content>

        <md-card-actions>
          <router-link to="/views/images/sites/login-state">
            <md-button  class="md-raised md-primary">查看</md-button>
          </router-link>
        </md-card-actions>
      </md-card>
    </div>

  </div>
</template>

<style lang="css" scoped="">
.index {
  padding: 30px;
  .index-item {
    margin: 0 16px 16px 0;
    width: 300px;
    display: inline-block;
    vertical-align: top;
  }
}
</style>
