import { useObservable } from "mobx-react-lite";

import http, {STATIC_HOST} from 'src/tools/http';


function transOnlineItem (obj:WanCategoryPushed): WanCategoryPushed {

  let m = [
    '其它',
    '动作',
    '角色扮演',
    '射击',
    '运动',
    '益智',
    '策略',
    '冒险',
    '竞速',
    '棋牌',
    '桌面',
    '战略模拟',
    '合集',
    '格斗',
  ];


  let downBase = obj.downlink.match(/[\w]+?\.[\w]+?$/);
  obj.downBase = downBase ? downBase[0] : '';
  let len = obj.downBase.length;
  if (len > 10) {
    obj.downBase = obj.downBase.substr(len - 10, len);
  }

  obj.imgResource = STATIC_HOST + obj.imgResource;
  obj.fileResource = STATIC_HOST + obj.fileResource;

  obj.categoryName = m[obj.category];

  return obj;
}

const initStateMap = {
  repoList: ():WanCategoryPageRes2 => ({
    data: [], all: 0, page: 1, init: false,
    selectType: 1,
  }),
  onlineList: ():WanPushedCategoryPageRes3 => ({
    data: [], all: 0, page: 1, init: false,
    selectType: 1,
  }),
  gameHistory: ():GameHistoryState => ({
    id: '',
    list: [],
    init: false,
  }),
};

const allState:AllState = {
  repoList: initStateMap.repoList(),
  onlineList: initStateMap.onlineList(),
  gameHistory: initStateMap.gameHistory(),
};

const actions:AllActions = {
  getList: (page:number, type:CategoryType) => {
    allState.repoList.page = page;
    allState.repoList.selectType = type;

    http.api.wan.category.listRepo.get({
      type,
      page,
      pageSize: 10,
    }).then(({all, data}) => {
      allState.repoList.all = all;
      allState.repoList.data = data.map(obj => {
        let downBase = obj.downlink.match(/[\w]+?\.[\w]+?$/);
        obj.downBase = downBase ? downBase[0] : '';
        let len = obj.downBase.length;
        if (len > 10) {
          obj.downBase = obj.downBase.substr(len - 10, len);
        }
        return obj;
      });
    });
  },
  getOnlineList (page: number, type:CategoryType) {
    allState.onlineList.page = page;
    allState.onlineList.selectType = type;

    http.api.wan.category.list.get({
      type,
      page,
      pageSize: 10,
    }).then(({all, data}) => {
      allState.onlineList.all = all;
      allState.onlineList.data = data.map(transOnlineItem);
    });
  },

  pushNes: async (item: WanCategoryAdd) => {

    await http.api.wan.category.add.post(item);

    return Promise.resolve(3 as WanCategoryAddPushingState);
  },

  listItemById: async (_id: string) => {
    let r = await  http.api.wan.category.listItemById.get({_id});

    allState.onlineList.data = [transOnlineItem(r)];
  },
  getGameHistoryById: async (_id: string) => {
    let r = await  http.api.wan.category.getGameHistoryById.get({_id});
    allState.gameHistory.list = r;
    allState.gameHistory.id = _id;

    console.log(allState.gameHistory)
  },
}

// window.test = state;

export function useAllState (keys: Array<StateKey>): [AllState, AllActions] {
  keys.forEach((k) => {
    if (!allState[k].init) {
      allState[k] = useObservable(initStateMap[k]());
      allState[k].init = true;
    }
  });

  return [
    allState,
    actions
  ];
};
