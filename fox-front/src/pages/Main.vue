<script type="text/babel">
/**
 * Created by zhouyg.
 */
import Vue from 'vue';
import Topbar from 'components/layout/Topbar.vue';

const Cpt = Vue.extend({
  components: {
    Topbar,
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
  <div class="">
    <Topbar >
      <router-view />
    </Topbar>
  </div>
</template>

<style lang="css">
</style>
