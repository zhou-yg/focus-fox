<template>
  <div class="topbar">
    <div class="navbar">
      <div class="logo-box">
        <img class="logo" src="../../assets/logo.svg" alt="">
        <span>
          Focus Fox
        </span>
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
:root{
  --navbar-height: 60px;
}
.topbar {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;

  .content {
    width: 100%;
    position: absolute;
    left: 0;
    top: var(--navbar-height);
    bottom: 0;
  }
}
.navbar {
  background-color: #fff;
  height: var(--navbar-height);
  border-bottom: 1px solid #bbb;
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
    top: 10px;
    right: 20px;

    .avatar {
      background-color: #eee;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: inline-block;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
    }
    .name {
      font-size: 16px;
      margin-left: 8px;
    }
  }
}
</style>
