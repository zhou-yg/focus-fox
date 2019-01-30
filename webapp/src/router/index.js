import Vue from 'vue'
import Router from 'vue-router'

import FocusIndex from 'src/pages/Focus.vue'
import FocusEvents from 'src/components/focus/FocusEvents.vue'

Vue.use(Router)

export default function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/focus',
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
