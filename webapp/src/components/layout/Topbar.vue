<template>
  <div class="topbar">
    <div class="navbar">
      <div class="logo-box">
        <img class="logo" src="../../assets/logo.svg" alt="">
        <span>
          Focus Fox
        </span>
      </div>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {

  },
  data () {
    return {
    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
.navbar {
  height: 60px;
  border-bottom: 1px solid #eee;

  .logo-box {
    height: 40px;
    font-weight: bold;
    position: relative;
    top: 10px;
    left: 10px;
    font-size: 20px;
    img {
      height: 30px;
      vertical-align: -7px;
    }
  }
}
</style>
