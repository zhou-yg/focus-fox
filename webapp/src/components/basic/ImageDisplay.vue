<template>
  <md-dialog class="image-display" ref="dialog">

    <md-dialog-content>
      <div class="img-box">
        <div class="go-left" :class="{
          'disabled': preDisabled,
        }" @click="goPre">  </div>
        <img :src="imgUrl" />
        <div class="go-right" :class="{
          'disabled': nextDisabled,
        }" @click="goNext">  </div>
      </div>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click="closeDialog">退出浏览</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      imgUrl: '',
      imgArr: [],
      curIndex: 0,
    }
  },
  computed: {
    preDisabled () {
      return this.curIndex === 0
    },
    nextDisabled () {
      return this.curIndex >= this.imgArr.length - 1
    },
  },
  mounted () {

  },
  methods: {
    show (url, imgArr = []) {
      if (url) {
        this.imgUrl = url
        const curIndex = imgArr.indexOf(url)
        if (curIndex === -1) {
          this.curIndex = 0
          this.imgArr = [url].concat(imgArr)
        } else {
          this.curIndex = curIndex
          this.imgArr = imgArr
        }
        this.$refs.dialog.open()
      }
    },
    closeDialog () {
      this.$refs.dialog.close()
    },
    goPre () {
      if (!this.preDisabled) {
        this.curIndex--
        this.imgUrl = this.imgArr[this.curIndex]
      }
    },
    goNext () {
      if (!this.nextDisabled) {
        this.curIndex++
        this.imgUrl = this.imgArr[this.curIndex]
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image-display {
  .img-box {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    img {
      margin:0 10px;
      width: 600px;
    }
  }
  .go-left,
  .go-right{
    border: solid 5px #bbb;
    border-color: transparent transparent #333 #333;
    width: 25px;
    height: 25px;
    cursor: pointer;

    &.disabled {
      border-color: transparent transparent #eee #eee;
      cursor: not-allowed;
    }
  }
  .go-left {
    transform: rotate(45deg);
  }
  .go-right {
    transform: rotate(-135deg);
  }
}
</style>
