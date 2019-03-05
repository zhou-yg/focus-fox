const path = require('path');

module.exports = async function (ctx, next) {
  const {type, page = 1, pageSize = 10} = ctx.request.query;

  const r = await ctx.models.category.find({
    category: type,
  });
  ctx.body = {
    all: 0,
    data: r.data,
  };
}
