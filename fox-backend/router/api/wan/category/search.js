const path = require('path');

module.exports = async function (ctx, next) {
  const {keywords} = ctx.request.query;

  ctx.body = `keywords: ${keywords}`;
}
