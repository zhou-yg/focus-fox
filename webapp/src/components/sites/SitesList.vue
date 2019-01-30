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
      list: [],
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
  },
  mounted () {
    this.$nextTick(() => {
    });
    this.getSiteData();
  },
  methods: {
    async getSiteData () {
      const {data} = await this.$api.sitesList({});
      this.list = [].concat(data.data);
    },
  },
});

export default Cpt;
</script>

<template lang="html">
  <div class="sites-index">
    <header>
      <router-link to="/views/images/sites">
        <md-button class="md-raised md-primary" ><<返回</md-button>
      </router-link>
    </header>
    <ContentList
      title="ngacc"
      :key="'ngacc' + listWithPlatform.ngacc.length"
      :list="listWithPlatform.ngacc" />
    <hr/>
    <ContentList
      title="others"
      :key="'others' + listWithPlatform.others.length"
      :list="listWithPlatform.others" />
  </div>
</template>

<style lang="css" scoped="">
.sites-index {
  padding: 15px;

  > header {
    background-color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  }
  hr {
    margin: 10px;
  }
}
</style>
