const path = require('path');

module.exports = async function (ctx, next) {
  const {type, page = 1, pageSize = 10} = ctx.request.query;

  const {data} = await ctx.models.category.find({
    category: type,
  });
  ctx.body = {
    all: data.length,
    data: data.slice(pageSize * page, pageSize),
  };
}
