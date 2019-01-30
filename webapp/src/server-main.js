// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import VueMaterial from 'vue-material'
import Element from 'element-ui'
import api from './tools/plugins/api'
import utils from './tools/plugins/utils'

// Vue.use(VueMaterial)
Vue.use(Element)
Vue.use(api)
Vue.use(utils)
Vue.config.productionTip = false

import createRouter from './router'
import createStore from './store/'

function createApp () {
  const router = createRouter()
  const store = createStore()

  /* eslint-disable no-new */
  const app = new Vue({
    router,
    store,
    render (h) {
      return h(App)
    },
  })
  return {
    app,
    router,
  }
}

export default context => {
  return new Promise(resolve => {
    const {app, router} = createApp()
    const path = context.path

    router.push(path)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      resolve(app)
    })
  })
}
