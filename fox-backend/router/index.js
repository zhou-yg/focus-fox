const path = require('path');
var loadApi = require('../util/loadApi');
var R = require('koa-router');

var registerRouter = loadApi(path.resolve(__dirname, './api'), '');

var router = new R()

registerRouter(router, 'api')

module.exports = router;
