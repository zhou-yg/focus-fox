// http
type KeymapKeys = 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | 'select' | 'start';

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
  categoryName: string;
  exists: boolean;
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

interface NesHistoryItem {
    _id: string;
    time: number;
    type: 0 | 1; // 0主动，1自动
    saveData: void;
}

interface KeymapQuery {
  from?: KeymapKeys;
  toKeyCode?: number;
}
interface KeymapResUnit {
  [key in KeymapKeys];
  up: number;
  down: number;
  left: number;
  right: number;
  a: number;
  b: number;
  select: number;
  start: number;
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
        getNesHistoryById: ApiNormal<WanCategoryIdQuery, Array<NesHistoryItem>>;
        keymap: ApiNormal<KeymapQuery, Array<KeymapResUnit>>;
      },
    },
    user: {
      profile: ApiNormal<any, UserProfile>;
    }
  };
}

// mobx
type StateKey = 'repoList' | 'onlineList' | 'gameHistory' | 'keymap';

interface WanCategoryPageRes2 extends WanCategoryPageRes {
    page: number;
    selectType: CategoryType;
}

interface WanPushedCategoryPageRes3 extends WanPushedCategoryPageRes {
    page: number;
    selectType: CategoryType;
}
interface GameHistoryState {
  id: string;
  list: Array<NesHistoryItem>;
}
interface AllActions {
  getList: (page: number, type:CategoryType) => void;
  getOnlineList: (page: number, type:CategoryType) => void;
  pushNes: (item: WanCategoryAdd) => Promise<WanCategoryAddPushingState>;
  listItemById: (_id: string) => void;
  getNesHistoryById: (_id:string) => void;
  getKeymap: () => void;
  updateKeymap: (index:number, from: KeymapKeys, toKeyCode: number) => void;
}

interface KeymapState {
  list: Array<KeymapResUnit>;
}

interface AllState {
  [key in StateKey]
  repoList:WanCategoryPageRes2;
  onlineList: WanPushedCategoryPageRes3;
  gameHistory: GameHistoryState;
  keymap: KeymapState;
}
