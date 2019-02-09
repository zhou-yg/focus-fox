<script type="text/babel">
/**
 * Created by zhouyg.
 */
import Vue from 'vue';
import MessageFeed from './MessageFeed.vue';

const Cpt = Vue.extend({
  components: {
    MessageFeed,
  },
  props: {
  },
  data () {
    return {
    };
  },
  computed: {

  },
  mounted () {
    this.$nextTick(() => {

    });
  },
  methods: {
  },
});

export default Cpt;
</script>

<template lang="html">
  <div class="main-index">
    <div class="l">

    </div>
    <div class="c">
      <MessageFeed />
    </div>
    <div class="r">

    </div>
  </div>
</template>

<style lang="css">
.main-index{
  display: flex;
  height: 100%;
  .l, .r {
    background-color: #eee;
    width: 20%;
  }
  .c {
    background-color: #eee;
    border: 1px solid #bbb;
    border-top: 0;
    border-bottom: 0;
    width: 60%;
  }
}
</style>
