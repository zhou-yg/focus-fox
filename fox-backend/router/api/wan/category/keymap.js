const path = require('path');

const toValues = () => ({
  'up': 38,
  'down': 40,
  'left': 37,
  'right': 39,
  'a': 65,
  'b': 83,
  'select': 9,
  'start': 13,
});

const constrolKeys = Object.keys(toValues());

module.exports = {
  method: 'post',
  handler: async function (ctx, next) {
    const {from, toKeyCode} = ctx.request.body;
    const userId = ctx.session.user.id;

    if (from && toKeyCode) {
      if (constrolKeys.includes(from)) {

        let {data:r} = await ctx.models.keymap.find({userId})
        let action = '';
        let doc;
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
          };
        } else {
          r = toValues();
          action = 'insert';
          r[from] = toKeyCode;
          r.userId = userId;
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
        r = r[0];
      } else {
        r = toValues()
      }
      ctx.body = r;
    }
  },
}
