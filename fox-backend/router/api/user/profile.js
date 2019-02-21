module.exports = async function profile(ctx, next) {

  ctx.body = ctx.session.user;
};
