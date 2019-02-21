module.exports = async function testUser(ctx, next) {
  if (!ctx.session.user && __DEV__) {
    ctx.session.user = {
      _id: -1000,
      name: 'zhouyg',
      avatar: null,
    };
  }
  return next();
}
