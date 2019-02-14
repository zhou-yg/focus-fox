const fs = require('fs');
const path = require('path');

function readApi (base, name) {
  base = path.resolve(base, name);
  const files = fs.readdirSync(path.resolve(__dirname, base));
  return files.map(file => {
    var filePath = path.resolve(__dirname, base, file);
    if (/\.js$/.test(file)) {
      file = file.replace(/\.js$/, '');
      var handler = require(filePath);
      var method = handler.method;
      if(!method){
        method = 'get';
      }else {
        handler = handler.handler;
      }

      return {
        path: path.resolve(base, file),
        method,
        handler,
      };
    } else if (fs.lstatSync(filePath).isDirectory()) {
      return readApi(base, file);
    }
  }).filter(_ => _);
}

module.exports = function (base) {
  var apiArr = readApi(base, '');

  while(apiArr.some(obj => Array.isArray(obj))) {
    apiArr = apiArr.reduce((pre, next) => pre.concat(next), []);
  }
  apiArr = apiArr.map(obj => {
    obj.path = obj.path.replace(base, '');
    return obj;
  });

  return function registerRouter (router, pre, apiNamesWhileList = []) {
    apiArr.forEach(obj => {
      if (apiNamesWhileList.indexOf(obj.path) !== -1 || apiNamesWhileList.length === 0) {
        router[obj.method](`/${pre}${obj.path}`, obj.handler);
      }
    });
    return router;
  }
};
