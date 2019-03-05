const path = require('path');

module.exports = async function (ctx, next) {
  const {type, page = 1, pageSize = 10} = ctx.request.query;

  const {data} = await ctx.models.category.find({
    category: type,
  });

  const filterData = data.filter(obj => !obj.hidden);

  ctx.body = {
    all: filterData.length,
    data: filterData.slice(pageSize * (page - 1), pageSize * (page - 1) + pageSize),
  };
}
