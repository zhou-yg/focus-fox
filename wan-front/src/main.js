// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-default/index.css'

import Vue from 'vue'
import App from './Focus'
import api2 from './tools/plugins/api2'
import utils from './tools/plugins/utils'
import Element from 'element-ui'

Vue.use(Element)
Vue.use(api2)
Vue.use(utils)
Vue.config.productionTip = false

import createRouter from './router'
import createStore from './store/'

window.HOST = __DEBUG__ ? `http://localhost:6889` : window.location.origin

const router = createRouter()
const store = createStore()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App,
  },
})
