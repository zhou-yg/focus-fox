module.exports = async function remove (ctx, next) {
  let {name, downlink} = ctx.request.query;

  if (name && downlink) {
    let old = await ctx.models.category.remove({downlink});
    console.log(old);
    if (old.data.n > 0) {
      ctx.body = `${name} ${downlink} already removed`;
    } else {
      ctx.body = `${name} ${downlink} remvoed failed . check if exists`;
    }
  } else {
    ctx.status = 400;
    ctx.body = `name downlink need`;
  }
}
