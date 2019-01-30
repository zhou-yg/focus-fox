import 'element-ui/lib/theme-default/index.css'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import App from './App'
import Element from 'element-ui'
import api from './tools/plugins/api'
import api2 from './tools/plugins/api2'
import utils from './tools/plugins/utils'

Vue.use(VueMaterial)
Vue.use(Element)
Vue.use(api)
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
