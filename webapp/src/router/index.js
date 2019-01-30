import Vue from 'vue'
import Router from 'vue-router'
import Index from 'src/components/images/Index.vue'

import ConsolePanel from 'src/components/images/ConsolePanel.vue'
import SearchIframe from 'src/components/images/SearchIframe.vue'
import SearchList from 'src/components/images/SearchList.vue'

import Sites from 'src/components/sites/Index.vue'
import SitesList from 'src/components/sites/SitesList.vue'
import PublishedList from 'src/components/sites/PublishedList.vue'
import SiteLoginState from 'src/components/sites/SiteLoginState.vue'

import FocusIndex from 'src/components/focus/Index.vue'
import FocusEvents from 'src/components/focus/pages/FocusEvents.vue'

Vue.use(Router)

export default function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      // {
      //   path: '/',
      //   name: 'index',
      //   redirect: '/views/images'
      // },
      {
        path: '/views/images/index',
        name: 'images index',
        component: Index,
      },
      {
        path: '/views/images/search',
        component: ConsolePanel,
        children: [
          {
            path: 'result1',
            component: SearchIframe,
          },
          {
            path: 'result2',
            component: SearchList,
          },
        ],
      },
      {
        path: '/views/images/sites',
        name: 'sites index',
        component: Sites,
      },
      {
        path: '/views/images/sites/list',
        name: 'SitesList',
        component: SitesList,
      },
      {
        path: '/views/images/sites/published',
        name: 'publishedList',
        component: PublishedList,
      },
      {
        path: '/views/images/sites/login-state',
        name: 'loginState',
        component: SiteLoginState,
      },

      {
        path: '/views/images/focus',
        name: 'focus index',
        component: FocusIndex,
        children: [
          {
            path: 'main',
            component: FocusEvents,
          },
        ],
      },
    ],
  })
}
