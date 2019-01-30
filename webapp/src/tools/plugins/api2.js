import axios from 'axios'
import client from 'simple-mongo-server/lib/mongoMap/client'

const url1 = 'http://mongo.nomiwan.com/sms/sites/'
const url2 = 'http://mongo.nomiwan.com/sms/sitePublish/'

function req (path, arg, method = 'GET', others = {}) {
  path = path.replace(/^\//, '')

  return axios({
    url: `http://localhost:6889/${path}`,
    method,
    data: arg,
    headers: {
      'Content-Type': 'application/json',
    },
    ...others
  })
}

function wrapperApi (paths) {
  let root = {}
  paths.forEach(path => {
    let pathArr = path.split('/').filter(v => v)
    let myRoot = root
    pathArr.forEach((p, i) => {
      if (!myRoot[p]) {
        myRoot[p] = {}
      }
      if (i === pathArr.length - 1) {
        myRoot[p] = {
          get: (arg, config) => req(path, arg, 'GET', config),
          post: (arg, config) => req(path, arg, 'POST', config),
        }
      } else {
        let parent = myRoot[p]
        myRoot = parent
      }
    })
  })
  return root
}

export default {
  install (Vue) {
    if (!Vue.prototype.$api) {
      Vue.prototype.$api = {}
    }
    window.$api = Object.assign(Vue.prototype.$api, {
      ...wrapperApi([
        '/api/test'
      ]),
    })
  }
}
