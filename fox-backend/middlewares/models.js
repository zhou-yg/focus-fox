const fs = require('fs');
const path = require('path');

let models = fs.readdirSync(path.join(__dirname, '../models/wan/'))
                .filter(n => !/^DB.js/.test(n))
                .map(n => {
                  return {
                    [n.replace(/\.js$/, '')]: require(path.join(__dirname, '../models/wan/', n)),
                  };
                }).reduce((p, n) => ({...p, ...n}), {});

// models.category.find({name: 'a'}).then(v => {
//   console.log(`v:`, v);
// });

module.exports = function testUser(ctx, next) {
  ctx.models = {
    ...models,
  };
  return next();
}
