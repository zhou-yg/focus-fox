// http

type CategoryType = 1 | 2 | 3 | 4 | 5 | 6 |7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

type WanCategoryAddPushingState = 0 | 1 | 2 | 3;

interface WanCategoryAdd {
  type: 'nes' | 'gba',
  "_id": string,
  "id": string,
  "name": string,
  "downlink": string,
  "category": CategoryType;
  "url": string,
  "img": string;
  downBase: string;
  onPushing: WanCategoryAddPushingState;
}

interface WanCategoryPushed extends WanCategoryAdd {
  fileResource: string;
  imgResource: string;
}

interface WanCategoryQuery {
  name:string;
  downlink:string;
}
interface WanCategoryIdQuery {
  _id: string;
}
interface WanCategoryPage {
  type:CategoryType;
  page:number;
  pageSize ?:number;
}
interface WanCategoryPageRes {
  all: number;
  data: Array<WanCategoryAdd>;
}
interface WanPushedCategoryPageRes {
  all: number;
  data: Array<WanCategoryPushed>;
}

interface ApiNormal<T, U> {
    get: (arg:T, config?:any) => Promise<U>;
    post: (arg:T, config?:any) => Promise<U>;
}

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
}

interface ApiLayer1 {
  api: {
    wan: {
      category: {
        add: ApiNormal<WanCategoryAdd, string>;
        hidden: ApiNormal<WanCategoryQuery, string>;
        remove: ApiNormal<WanCategoryQuery, string>;
        list: ApiNormal<WanCategoryPage, WanPushedCategoryPageRes>;
        listRepo: ApiNormal<WanCategoryPage, WanCategoryPageRes>;
        listItemById: ApiNormal<WanCategoryIdQuery, WanCategoryPushed>;
      },
    },
    user: {
      profile: ApiNormal<any, UserProfile>;
    }
  };
}

// mobx
interface WanCategoryPageRes2 extends WanCategoryPageRes {
    page: number;
    init: boolean;
    selectType: CategoryType;
}

interface WanPushedCategoryPageRes3 extends WanPushedCategoryPageRes {
    page: number;
    init: boolean;
    selectType: CategoryType;
}

interface AllState {
  repoList:WanCategoryPageRes2;
  onlineList: WanPushedCategoryPageRes3;
}
interface AllActions {
  getList: (page: number, type:CategoryType) => void;
  getOnlineList: (page: number, type:CategoryType) => void;
  pushNes: (item: WanCategoryAdd) => Promise<WanCategoryAddPushingState>;
  listItemById: (_id: string) => void;
}

type StateKey = 'repoList' | 'onlineList';
