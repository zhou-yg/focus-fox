import Index from '../components/main/Index';
import Category from '../components/main/Category';
import Repo from '../components/main/Repo';
import Game from '../components/main/Nes';

interface RouteConfigItem {
  href: string;
  component: (props: any) => JSX.Element;
}

interface RouterConfig {
  leftNav: Array<RouteConfigItem>;
  game: RouteConfigItem;
}

const routerConfig:RouterConfig = {
  leftNav: [
    {
      href: '/wan/index',
      component: Index,
    },
    {
      href: '/wan/repo',
      component: Repo,
    },
    {
      href: '/wan/category/:type',
      component: Category,
    },
  ],
  game: {
    href: '/wan/game/:_id',
    component: Game,
  },
};

export default routerConfig;
