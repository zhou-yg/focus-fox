var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  postcss: [
    require('postcss-salad')({
      "features": {
        "bem": {
          "shortcuts": {
            "component": "c",
            "modifier": "m",
            "descendent": "d"
          },
          "separators": {
            "descendent": "__",
            "modifier": "--"
          }
        }
      }
    }),
  ],
}
