<template>
  <div class="topbar">
    <div class="navbar">
      <div class="logo-box">
        <!-- <img class="logo" src="../../assets/logo-wan.svg" alt="">
        <span>
          Fox Wan
        </span> -->
      </div>
      <div class="profile">
        <span class="avatar">
          Z
        </span>
        <span class="name">
          zhouyg
        </span>
      </div>
    </div>
    <div class="content">

      <div class="left-nav-box">
        <LeftNav />
      </div>
      <div class="right-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import LeftNav from './LeftNav.vue';

export default {
  name: '',
  components: {
    LeftNav,
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
:root{
  --navbar-height: 60px;
  --margin: 10px;
}
.topbar {
  position: fixed;
  left: var(--margin);
  right: var(--margin);
  top: var(--margin);
  bottom: var(--margin);

  .content {
    margin-top: var(--margin);
    width: 100%;
    position: absolute;
    left: 0;
    top: var(--navbar-height);
    bottom: var(--margin);
  }
  .left-nav-box {
    height: 100%;
  }
}
.navbar {
  background-color: #000;
  height: var(--navbar-height);
  border: 1px solid #fff;
  box-sizing: border-box;

  .logo-box {
    font-weight: bold;
    position: relative;
    top: 15px;
    left: 20px;
    font-size: 20px;
    display: inline-block;

    img {
      height: 30px;
      vertical-align: -7px;
    }
  }
  .profile {
    float: right;
    height: 40px;
    position: relative;
    top: 12.5px;
    right: 20px;

    .avatar {
      background-color: #fff;
      border-radius: 50%;
      width: 35px;
      height: 35px;
      display: inline-block;
      line-height: 35px;
      text-align: center;
      font-size: 18px;
      color: #000;
    }
    .name {
      font-size: 16px;
      margin-left: 8px;
    }
  }
}
</style>
