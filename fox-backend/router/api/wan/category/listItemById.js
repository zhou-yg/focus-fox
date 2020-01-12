const path = require('path');

const checkNesFile = require('../../../../utils/checkNesFile');

module.exports = async function (ctx, next) {
  const {_id} = ctx.request.query;

  const {data} = await ctx.models.category.find({
    _id: _id,
  });

  const filterData = data.filter(obj => !obj.hidden);
  const item = filterData[0];

  item.size = await checkNesFile(item.fileResource);
  item.exists = item.size > 0;
  item.fileResource = encodeURIComponent(item.fileResource);

  ctx.body = item;
}
