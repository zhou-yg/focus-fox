import axios from 'axios'
import client from 'simple-mongo-server/lib/mongoMap/client'

const url1 = 'http://mongo.nomiwan.com/sms/sites/'
const url2 = 'http://mongo.nomiwan.com/sms/sitePublish/'

function req (name, arg, method = 'GET', others = {}) {
  return axios({
    url: `http://localhost:6889/api/${name}`,
    method,
    data: arg,
    headers: {
      'Content-Type': 'application/json',
    },
    ...others
  })
}
function commander (name, arg, method = 'GET') {
  return axios({
    url: `http://localhost:8889/commander/${name}`,
    method,
    data: arg,
  })
}

export default {
  install (Vue) {
    Vue.prototype.$api = {
      html (arg) {
        return req('html', arg)
      },
      imgs (arg) {
        return req('imgs', arg, 'POST', {
          responseType: 'blob',
        })
      },
      sitesList (arg) {
        return axios({
          url: url1 + 'find',
          method: 'POST',
          data: {
            arg,
          },
        })
      },
      publishedList (arg) {
        return axios({
          url: url2 + 'find',
          method: 'POST',
          data: {
            arg,
          },
        })
      },
      markPublished (item) {
        if (item._id) {
          return
        }
        return axios({
          url: url1 + 'update',
          method: 'POST',
          data: {
            arg: {
              _id: item._id,
            },
            doc: {
              $set: {
                published: true,
                sourceTitle: 22,
              },
            },
          },
        })
      },
      async removeItem (item) {
        if (item._id) {
          return axios({
            url: url1 + 'remove',
            method: 'POST',
            data: {
              arg: {
                _id: item._id,
              },
            },
          })
        }
        return
      },
      async publishItem (item) {
        const r = await axios({
          url: url2 + 'find',
        })

        if ([].concat(r.data.data).length > 0) {
          return axios({
            url: url2 + 'update',
            method: 'POST',
            data: {
              arg: {
                _id: r.data.data._id,
              },
              doc: {
                $set: {
                  item: item,
                },
              },
            },
          })
        } else {
          return axios({
            url: url2 + 'insert',
            method: 'POST',
            data: {
              arg: {
                item,
              },
            },
          })
        }
      },
    }
  },
}
