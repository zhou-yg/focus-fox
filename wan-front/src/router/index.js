import Vue from 'vue'
import Router from 'vue-router'

import Main from 'src/pages/Main.vue'
import Index from 'src/components/main/Index.vue'

Vue.use(Router)

export default function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/wan',
        name: 'wan index',
        component: Main,
        children: [
          {
            path: 'main',
            component: Index,
          },
        ],
      },
    ],
  })
}
