const path = require('path');

module.exports = async function (ctx, next) {
  const {_id} = ctx.request.query;

  const {data} = await ctx.models.category.find({
    _id: _id,
  });

  const filterData = data.filter(obj => !obj.hidden);

  ctx.body = filterData[0];
}
