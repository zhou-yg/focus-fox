import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/my-page', app.middleware.mockUser() ,controller.home.myPage);
};
