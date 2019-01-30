<template>
  <div class="search-result2">
    <ul class="search-result2-list" v-if="showImageSrcArr.length > 0">
      <li v-for="(imgAttr, index) in showImageSrcArr"  v-if="imgAttr.attribs.src" :class="{
          selected: imgAttr.selected,
        }">
        <img :src="imgAttr.attribs.src" alt="" @click="selectImg(imgAttr)"/>
        <!-- <div class="error-tip" v-else >
          无资源链接
        </div> -->
        <div class="el-icon-check img-selected" v-if="imgAttr.selected" >
        </div>
        <div class="operations">
          <div class="op" @click="selectImg(imgAttr)">
            <i class="el-icon-close" v-if="imgAttr.selected" ></i>
            <i class="el-icon-check" v-else ></i>
          </div>
          <div class="op" @click="showMoreImg(imgAttr)">
            <i class="icon-fangda"></i>大
          </div>
        </div>
      </li>
    </ul>
    <div class="search-result2-null" v-if="!showImageSrcArr.length">
      <img src="../../assets/null.gif" alt="">
    </div>

    <image-display ref="imageDisplay" />
  </div>
</template>

<script>
import axios from 'axios'
import cheerio from 'cheerio'
import ImageDisplay from 'components/basic/ImageDisplay.vue'

export default {
  name: '',
  data () {
    return {
      url: '',
      '$selector': null,
      imgs: [],
      imageSrcArr: [],
      i: 0,
    }
  },
  mounted () {
    this.updateUrl()
  },
  computed: {
    outputData () {
      const selectedArr = this.imageSrcArr.filter(obj => {
        return obj.selected
      })

      const selectorArr = this.$utils.generateSelectorFromNode(selectedArr, this.$selector)

      return selectedArr.map((obj, i) => {
        return {
          ...obj,
          selector: selectorArr[i],
        }
      })
    },
    showImageSrcArr () {
      const blockListLocal = this.$store.state.blockListLocal
      return this.imageSrcArr.filter((node) => {
        return !this.$utils.existInBlock(blockListLocal, node.attribs.src)
      })
    },
  },
  methods: {
    selectImg (imgAttr) {
      imgAttr.selected = !imgAttr.selected
      this.imageSrcArr = this.imageSrcArr.slice()
    },
    showImages () {
      if (this.imgs.length <= 0) {
        return
      }
      this.imageSrcArr = [].map.call(this.imgs, (node) => {
        const attribs = Object.assign({}, node.attribs, {
          src: node.attribs.src ? `${window.HOST}/api/proxy?url=${encodeURIComponent(node.attribs.src)}&referer=${encodeURIComponent(this.url)}` : '',
        })
        node.attribs = attribs
        node.src = node.attribs.src
        node.selected = false
        node.selector = null
        return node
      })
    },
    updateUrl () {
      const url = this.$route.query.kw
      this.url = url

      const u = `${window.HOST}/api/proxy?url=${this.url}`

      axios({
        url: u
      }).then(res => {
        this.$selector = cheerio.load(res.data)
        this.imgs = this.$selector('img')
        this.showImages()
      }).catch(e => {
        console.error(e)
      })
    },
    showMoreImg (imgAttr) {
      this.$refs.imageDisplay.show(imgAttr.attribs.src, this.showImageSrcArr.map(obj => {
        return obj.attribs.src
      }))
    },
  },
  components: {
    ImageDisplay,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-result2{
  height: 100%;
}
.search-result2-null {
  font-size: 16px;
  text-align: center;
  width: 100%;
  height: 100%;
  img {
    margin-top: 100px;
    width: 200px;
  }
}
.search-result2-list {
  li {
    margin: 10px;
    width: 100px;
    height: 100px;
    display: inline-block;
    position: relative;
    cursor: pointer;

    &.selected {
      top: -3px;
      box-shadow: 3px 3px 2px 1px #999;
    }

    img{
      width: 100%;
      height: 100%;
    }
    .error-tip{
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      user-select: none;
    }
    .img-selected {
      background-color: green;
      width: 1.5em;
      height: 1.5em;
      line-height: 1.5em;
      text-align: center;
      color: #fff;
      position: absolute;
      right: 0;
      top: 0;
    }
    &:hover {
      .operations {
        display: block;
      }
    }
    .operations {
      background-color: rgba(0, 0, 0, 0.3);
      width: 100%;
      height: 30px;
      position: absolute;
      left: 0;
      bottom: 0;
      display: none;
      .op {
        padding: 0 0.5em;
        width: 2.5em;
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-weight: bold;
        font-size: 12px;
        white-space: nowrap;
        float: right;
      }
    }
  }
}
</style>
