const path = require('path')
const fs = require('fs')

const backEndDir = path.resolve(__dirname, '../../../fox-backend/router/api/')

const outputJson = path.resolve(__dirname, '../../src/tools/server-api.json')

function readApi (base, name) {
  base = path.resolve(base, name)
  const files = fs.readdirSync(path.resolve(__dirname, base))
  return files.map(file => {
    var filePath = path.resolve(__dirname, base, file)
    if (/\.js$/.test(file)) {
      file = file.replace(/\.js$/, '')
      var handler = require(filePath)
      var method = handler.method
      if (!method) {
        method = 'get'
      } else {
        handler = handler.handler
      }

      return {
        path: path.resolve(base, file),
        method,
        handler,
      }
    } else if (fs.lstatSync(filePath).isDirectory()) {
      return readApi(base, file)
    }
  }).filter(_ => _)
}

var apiArr = readApi(backEndDir, '')

while (apiArr.some(obj => Array.isArray(obj))) {
  apiArr = apiArr.reduce((pre, next) => pre.concat(next), [])
}
apiArr = apiArr.map(obj => {
  obj.path = obj.path.replace(backEndDir, '')
  return obj
})

console.log(apiArr)

fs.writeFileSync(outputJson, JSON.stringify(apiArr.map(obj => '/api' + obj.path), null, 2))
