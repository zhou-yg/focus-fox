import Index from '../components/main/Index';
import Category from '../components/main/Category';
import Repo from '../components/main/Repo';

interface RouteConfigItem {
  href: string;
  component: (props: any) => JSX.Element;
}

interface RouterConfig {
  leftNav: Array<RouteConfigItem>;
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
};

export default routerConfig;
