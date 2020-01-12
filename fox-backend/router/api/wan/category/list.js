const path = require('path');

const checkNesFile = require('../../../../utils/checkNesFile');

module.exports = async function (ctx, next) {
  const {type, page = 1, pageSize = 10} = ctx.request.query;

  const {data} = await ctx.models.category.find({
    category: type,
  });

  const filterData = data.filter(obj => !obj.hidden);

  const index = pageSize * (page - 1);

  const d = filterData.slice(index, index + Number(pageSize));

  await Promise.all(d.map(gameData => {
    return new Promise(async (resolve) => {
      gameData.size = await checkNesFile(gameData.fileResource);
      gameData.exists = gameData.size > 0;
      gameData.fileResource = encodeURIComponent(gameData.fileResource);
      resolve();
    });
  }))

  ctx.body = {
    all: filterData.length,
    data: d,
  };
}
