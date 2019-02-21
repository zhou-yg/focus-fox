/*
keyword: '',
*/

const sub = require('../../services/subscribe/');

module.exports = {
  method: 'post',
  async handler (ctx, next) {
    let { keyword } = ctx.reqeust.body;

    let r = await sub.search(keyword);

    ctx.body = r;
  },
}
