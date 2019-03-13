const path = require('path');

module.exports = async function (ctx, next) {
  const {_id} = ctx.request.query;

  ctx.body = [
    {
      _id: '1',
      type: 0,
      time: Date.now(),
    },
    {
      _id: '2',
      type: 1,
      time: Date.now(),
    },
  ];
}
