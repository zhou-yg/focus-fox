<template>
  <div class="search">

    <div class="left-panel">
      <router-view ref="myView" ></router-view>
    </div>

    <div class="right-op">
      <h3>网页链接</h3>
      <div class="mode">
        <el-input
          v-model="showUrl"
          type="textarea"/>
        <p>
          <el-button @click="updateUrl" size="small">更新链接</el-button>
        </p>
      </div>
      <h3>浏览模式：</h3>
      <div class="mode">
        <el-radio-group v-model="mode" size="small">
          <el-radio :label="0">
            网页
          </el-radio>
          <el-radio :label="1">
            仅图片
          </el-radio>
        </el-radio-group>
      </div>


      <h3>屏蔽</h3>
      <div class="mode">
        <el-button @click="blockList" size="small">屏蔽所选</el-button>
      </div>

      <h3>下载：</h3>
      <div class="mode">
        <div class="mode">
          <el-checkbox v-model="openMultiPages">开启多页下载</el-checkbox>
          <el-input
            type="textarea"
            placeholder="这里输入下一页的链接"
            v-if="openMultiPages"
            v-model="nextMultiPageUrl" />
        </div>
        <el-button :disabled="downloadDisabled" @click="downSelected" size="small">下载选中的</el-button>
      </div>
      <div class="mode output" v-html="consoleMsg" v-if="consoleMsg" >

      </div>
    </div>

  </div>
</template>

<script>
import cheerio from 'cheerio'
import axios from 'axios'

// 建立循环下载
function buildMultiImgs (nodes, endCallback) {
  const getNextUrl = this.$utils.createNextUrl(this.showUrl, this.nextMultiPageUrl)
  var r = [].concat(nodes)

  var i = -1
  const run = () => {
    i++
    const url = getNextUrl()
    if (url) {
      this.showMsg(`${i}.正在加载${url}...`)
      const u = `${window.HOST}/api/proxy?url=${encodeURIComponent(url)}&referer=${this.url}`
      axios({
        url: u,
      }).then(res => {
        const $selector = cheerio.load(res.data)
        const findResultArr = nodes.map(node => {
          return [].slice.call($selector(node.selector))
        }).reduce((p, c) => {
          return p.concat(c)
        }, [])

        this.showMsg(`${i}.成功获取${findResultArr.length}个链接`)

        if (findResultArr.length > 0) {
          r = r.concat(findResultArr)
          run()
        } else {
          endCallback(r)
        }
      })
    }
  }

  run()
}

export default {
  name: '',
  data () {
    return {
      mode: 0,
      url: '',
      showUrl: '',

      openMultiPages: false,
      nextMultiPageUrl: '',

      consoleMsg: '',

      downloadDisabled: false,
    }
  },
  mounted () {
    const url = this.$route.query.kw
    this.url = url
    this.showUrl = decodeURIComponent(url)

    const {origin, pathname} = window.location

    if (/result1/.test(pathname)) {
      this.mode = 0
    } else if (/result2/.test(pathname)) {
      this.mode = 1
    }
  },
  watch: {
    mode (v, old) {
      switch (v) {
        case 0:
          this.showPage()
          break
        case 1:
          this.showPictures()
          break
        default:

      }
    },
  },
  computed: {
    targetHtml () {
      return `${window.HOST}/api/proxy?url=${this.url}`
    },
  },
  methods: {
    showMsg (m) {
      if (m) {
        this.consoleMsg = m + '<br/>' + this.consoleMsg
      } else {
        this.consoleMsg = ''
      }
    },
    updateUrl () {
      const {origin, pathname} = window.location

      this.url = this.showUrl
      this.$router.replace({
        query: {
          kw: encodeURIComponent(this.url),
        },
      })
      // window.history.pushState({}, 'clean', `${origin}${pathname}?kw=${encodeURIComponent(this.url)}`)

      console.log(this.$refs.myView, this.$refs.myView.updateUrl)
      if (this.$refs.myView.updateUrl) {
        this.$refs.myView.updateUrl()
      }
    },
    showPage () {
      this.$router.push({
        path: `/views/images/search/result1`,
        query: {
          kw: this.url,
        },
      })
    },
    showPictures () {
      this.$router.push({
        path: `/views/images/search/result2`,
        query: {
          kw: this.url,
        },
      })
    },
    downImgs (resultArr) {
      this.$api.imgs({
        srcArr: resultArr.map((node) => node.attribs.src),
        headers: {
          referer: this.showUrl,
        },
      }).then(res => {
        this.downloadDisabled = false
        this.consoleMsg = ''
        this.$utils.blobToDownload(res.data, `${Date.now()}.zip`)
      }).catch(e => {
        alert(e.message)
        this.downloadDisabled = false
        this.consoleMsg = ''
      })
    },
    downSelected () {
      const nodes = this.$refs.myView.outputData
      const srcArr = nodes.map((node) => node.attribs.src)

      this.downloadDisabled = true

      if (srcArr.length > 0) {
        if (this.openMultiPages) {
          if (this.nextMultiPageUrl) {
            buildMultiImgs.call(this, nodes, (resultArr) => {
              this.downImgs(resultArr)
            })
          } else {
            this.downloadDisabled = false
            this.$alert('缺少下一页的链接', '', {
              type: 'error',
            })
          }
        } else {
          this.downImgs(nodes)
        }
      } else {
        this.downloadDisabled = false
        this.$alert('未选择任何图片', '操作出错', {
          type: 'error',
        })
      }
    },
    blockList () {
      const srcArr = this.$refs.myView.outputData.map(({src}) => src)
      this.$store.dispatch('addBlock', srcArr)
    },
  },
  components: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search{
  height: 100%;
  display: flex;
}
.left-panel{
  flex:1;
  height: 100%;
}
.right-op{
  background-color: #fff;
  box-sizing: border-box;
  border-left: 1px solid #eee;
  padding: 0 10px;
  width: 300px;

  .mode{
    margin: 10px;

    .mode{
      margin-left: 0;
      margin-right: 0;
    }
    &.output {
      border-radius: 3px;
      border: 1px solid #eee;
      padding: 10px;
      max-height: 120px;
      overflow-y: auto;
      word-wrap: break-word;
    }
  }
}
</style>
