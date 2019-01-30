<template>
  <div class="search-result">
    <iframe ref="iframe" :src="targetHtml" width="" height=""></iframe>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      url: '',
    }
  },
  mounted () {
    const url = this.$route.query.kw
    this.url = url
    this.appendTipHeader()
  },
  computed: {
    targetHtml () {
      return `${window.HOST}/api/proxy?url=${this.url}`
    },
  },
  methods: {
    appendTipHeader () {
      const wd = this.$refs.iframe
      window.wd = wd
      // const d = wd.document.createElement('div')
      // const headerTip = `
      //   <div style="background-color: red;height:3em;line-height:3em;text-align:center;font-size:14px;position:fixed;top:0;left:0;">
      //     点击需要下载的图片
      //   </div>
      // `
      // wd.document.body.appendChild(d)
      // d.innerHTML = headerTip
    },
  },
  components: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-result{
  height: 100%;
}
iframe {
  border: 0;
  width: 100%;
  height: 100%;
}
</style>
