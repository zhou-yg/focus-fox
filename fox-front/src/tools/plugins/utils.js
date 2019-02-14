import * as utils from '../utils'

if (typeof window !== 'undefined') {
  window.U = utils
}

export default {
  install (Vue) {
    Vue.prototype.$utils = {
      ...utils,
    }
  },
}
