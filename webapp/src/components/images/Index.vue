<template>
  <div class="images-index">
    <header class="index-header">
      <md-toolbar>
        <i class="logo"></i>
        <h2>nomi丸</h2>
      </md-toolbar>
    </header>
    <div class="auto1">
      批量看<span class="yellow">图</span>
    </div>
    <div class="auto2">
      <div class="dib w500">
        <md-input-container>
          <label>网页链接</label>
          <md-input ref="search" v-model="url"></md-input>
        </md-input-container>
      </div>
      <div class="dib">
        <md-button class="md-raised md-primary" @click="search">快速搜索</md-button>
      </div>
    </div>
    <div class="auto2 auto3">
      <span class="sub-theme animation-shake link">大家都在搜...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      url: '',
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(this.$refs.search.$el.focus())
    })
  },
  methods: {
    search () {
      const u = encodeURIComponent(this.url)
      this.$router.push({
        path: `/views/images/search/result2`,
        query: {
          kw: u,
        },
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.images-index{
  .index-header{
    .logo {
      background-image: url(http://vuematerial.io/assets/logo-vue-material-default.png);
      background-size: 100% 100%;
      width: 4em;
      height: 2.5em;
      display: inline-block;
    }
  }
  .auto1,
  .auto2{
    color: #333;
    font-size: 14px;
    transform: translate(-50%, 0%);
    position: absolute;
    left: 50%;
    top: 40%;
    white-space: nowrap;
  }
  .auto1{
    transform: translate(-50%, -80px);
    font-size: 40px;

    .yellow{
      color: #FF9800;
    }
  }
  .auto3{
    top: 50%;
  }
  .w500{
    width: 500px;
  }

  .dib {
    display: inline-block;
    vertical-align: middle;
  }
  #url{
    width: 500px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #eee;
    outline: 0;
    padding: 5px 12px;
    color: #333;
  }
  #search{
    background: none;
    padding: 5px 10px;
    border: 1px solid #eee;
    height: 24px;
    line-height: 24px;
    outline: 0;
    cursor: pointer;
    box-sizing: content-box;
  }
  #search:hover{
    background-color: #ffa620;
    color: #fff;
  }
}
</style>
