const path = require('path');

const nesJson = require(path.join(__ROOT__, 'helpers/nes-category/dist/nes.json'));

module.exports = async function (ctx, next) {
  const {type, page = 1, pageSize = 10} = ctx.request.query;

  let all = 0;
  let data = [];

  if (nesJson[type]) {
    all = nesJson[type].length;
    data = nesJson[type].slice(pageSize * (page - 1), pageSize * (page - 1) + pageSize);
  }

  ctx.body = {
    all,
    data,
  };
}
