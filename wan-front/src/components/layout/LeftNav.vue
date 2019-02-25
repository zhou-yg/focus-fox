<script type="text/babel">
/**
 * Created by zhouyg.
 */
import Vue from 'vue';

const categoryNames = [
  '动作',
  '角色扮演',
  '射击',
  '运动',
  '益智',
  '策略',
  '冒险',
  '竞速',
  '棋牌',
  '桌面',
  '战略模拟',
  '格斗',
  '合集',
  '其它',
];

const Cpt = Vue.extend({
  components: {
  },
  props: {
  },
  data () {
    return {
      leftNavConfig: [
        {
          type: 'header',
          name: '我的记录',
          href: '',
        },
        {
          type: 'header-top',
          name: '游戏分类',
          children: categoryNames.map((name, index) => {
            return {
              name,
              index,
              href: `/wan/category?type=${index}`,
            };
          }),
        },
      ]
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
  <div class="left-nav">
    <div class="row" v-for="item in leftNavConfig">
      <router-link :to="item.href" v-if="item.type === 'header'" >
        <div class="header pointer">
          {{item.name}}
        </div>
      </router-link>
      <div  v-if="item.type === 'header-top'" class="header-top">
        {{item.name}}
        <div class="bottom-list">
          <ul>
            <li class="pointer" v-for="childItem in item.children">
              <router-link :to="childItem.href">{{childItem.name}}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.left-nav {
  width: 220px;
  height: 100%;
  border: 1px solid #fff;

  .row {
    padding: 16px;
    border-bottom: 1px solid #fff;
    font-size: 16px;

    /* case 1 */
    .header {
      &:after {
        border-width: 4px;
        float: right;
        position: relative;
        top: 4px;
      }
    }
    /* case 2 */
    .header-top {

    }
    .bottom-list {
      margin-top: 10px;
      padding-left: 20px;

      ul {
        display: flex;
        flex-wrap: wrap;
        > li {
          width: 50%;
          margin-top: 10px;
        }
        > li:nth-child(2n) {
          text-align: right;
        }
      }
    }
  }
}
</style>
