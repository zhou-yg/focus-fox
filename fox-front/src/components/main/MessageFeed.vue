<template>
  <div class="message-feed">
    <header>
      Focus
    </header>
    <div class="message">

    </div>
    <footer>
      <div class="footer-input"  @keydown.enter="search">
        <el-input placeholder="链接，关键字/词 ..." v-model="searchText" />
      </div>
      <div class="footer-op">
        <el-button type="primary" @click="search">发送</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: '',
  components: {

  },
  data () {
    return {
      searchText: '',
    };
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    search () {
      console.log(this.searchText);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message-feed {
  background-color: #fff;
  border: 1px solid #bbb;
  margin: 10px;

  > header {
    padding: 10px;
    font-weight: bold;
  }

  .message {
    border: 1px solid #bbb;
    border-left: 0;
    border-right: 0;
    height: 300px;
  }

  > footer {
    padding: 10px;
    display: flex;
    .footer-input {
      flex:1;
    }
    .footer-op {
      margin-left: 10px;
    }
  }
}
</style>
