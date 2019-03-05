const path = require('path');

module.exports = {
  method: 'post',
  handler: async function (ctx, next) {
    const {name, downlink} = ctx.request.body;

    if (name && downlink) {
      const {data} = await ctx.models.category.find({
        downlink,
      });

      if (data.length > 0) {
        await Promise.all(data.map(obj => {
          return ctx.models.category.update({
            downlink,
          }, {
            $set: {
              hidden: true,
            },
          });
        }));
        ctx.body = `${data.length} done`;
      } else {
        ctx.status = 404;
      }
    } else {
      ctx.status = 500;
      ctx.body = 'need name && downlink';
    }
  },
};
