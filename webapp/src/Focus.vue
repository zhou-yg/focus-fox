<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    window.$R = this.$route
    window.$Rr = this.$router
  },
}
</script>

<style>
#app {
  background-image:url(https://ojrbqzf6q.qnssl.com/2017090793986bg.png);
  font-family: Roboto, Noto, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-family: "Helvetica Neue",Helvetica,Arial,STHeiti,"Microsoft Yahei",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.danger {
  color: red;
}
</style>
