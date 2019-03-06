import Index from '../components/main/Index';
import Category from '../components/main/Category';
import Repo from '../components/main/Repo';

interface RouteConfigItem {
  href: string;
  component: () => JSX.Element;
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
      href: '/wan/category',
      component: Category,
    },
  ],
};

export default routerConfig;
