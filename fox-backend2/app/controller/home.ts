import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }
  public async myPage() {
    const {ctx} = this;

    ctx.body = JSON.stringify({
      user: ctx.user,
      config: (this.config, null, 2),
    })
  }
}
