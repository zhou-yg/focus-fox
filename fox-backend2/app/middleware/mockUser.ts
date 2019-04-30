export default (app) => {
  return async (ctx, next) => {
    if (!ctx.session.user && app.config.env === 'local') {
      ctx.session.user = {
        _id: -1000,
        id: -12000,
        name: 'zhouyg',
        avatar: null,
      };
    }
    return next();
  }
}
