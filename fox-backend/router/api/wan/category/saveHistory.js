module.exports = {
  method: 'post',
  async handler (ctx, next) {
    const {_id, cpu, mmap, ppu} = ctx.request.body;
    
    const {data} = await ctx.models.history.insert({
      gameId: _id,
      cpu,
      mmap,
      pput,
      type: 1,
      timestamp: Date.now(),
    });

    if (data.n > 0) {
      ctx.body = 'done';
    } else {
      ctx.status = 500;
      ctx.body = 'insert fail';
    }
  }
}