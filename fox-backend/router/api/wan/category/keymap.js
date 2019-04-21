const path = require('path');

const toValues = () => ({
  'up': 87,
  'down': 83,
  'left': 65,
  'right': 68,
  'a': 75,
  'b': 74,
  'select': 86,
  'start': 66,
});

const constrolKeys = Object.keys(toValues());

module.exports = {
  method: 'post',
  handler: async function (ctx, next) {
    const {index = 0, from, toKeyCode} = ctx.request.body;
    const userId = ctx.session.user.id;

    if (from && toKeyCode) {
      if (constrolKeys.includes(from)) {

        let {data:r} = await ctx.models.keymap.find({
          userId,
          index,
        });
        let action = '';
        let doc;
        console.log(r);
        if (r.length > 0) {
          r = r[0];
          r[from] = toKeyCode;
          action = 'update';
          doc = {
            $set: {
              [from]: toKeyCode,
            },
          };
          r = {
            userId,
            index,
          };
        } else {
          r = toValues();
          action = 'insert';
          r[from] = toKeyCode;
          r.userId = userId;
          r.index = index;
        }

        await ctx.models.keymap[action](r, doc);

        ctx.body = r;

      } else {
        ctx.status = 400;
        ctx.body = `${from} isn't in [${constrolKeys.join(',')}]`
      }
    } else {
      let {data:r} = await ctx.models.keymap.find({userId});
      if (r.length > 0) {
        // r = r[0]; // 多组
        r.map(obj => {
          constrolKeys.forEach(k => obj[k] = parseInt(obj[k]))
        });
      } else {
        r = toValues()
      }
      ctx.body = r;
    }
  },
}
