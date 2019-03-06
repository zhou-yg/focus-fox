<script type="text/babel">
/**
 * Created by zhouyg.
 */
import Vue from 'vue';

const Cpt = Vue.extend({
  components: {
  },
  props: {
  },
  data () {
    return {
    };
  },
  computed: {

  },
  created () {
    this.getList();
  },
  mounted () {
    this.$nextTick(() => {

    });
  },
  methods: {
    getList () {
      let type = this.$route.query.type;
      this.$api.wan.category.list({type}).then(res => {
        console.log(res.data);
      });
    },
  },
});

export default Cpt;
</script>

<template lang="html">
  <div class="main-category">
    main-category
  </div>
</template>

<style lang="css">
.main-category{
}
</style>
