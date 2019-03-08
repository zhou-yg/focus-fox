import { useObservable } from "mobx-react-lite";

import http, {STATIC_HOST, WanCategoryPageRes, WanPushedCategoryPageRes, CategoryType, WanCategoryAdd, WanCategoryAddPushingState} from 'src/tools/http';

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
}

type StateKey = 'repoList' | 'onlineList';

const initStateMap = {
  repoList: ():WanCategoryPageRes2 => ({
    data: [], all: 0, page: 1, init: false,
    selectType: 1,
  }),
  onlineList: ():WanPushedCategoryPageRes3 => ({
    data: [], all: 0, page: 1, init: false,
    selectType: 1,
  }),
};

const allState:AllState = {
  repoList: initStateMap.repoList(),
  onlineList: initStateMap.onlineList(),
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
      allState.onlineList.data = data.map(obj => {
        obj.imgResource = STATIC_HOST + obj.imgResource;
        obj.fileResource = STATIC_HOST + obj.fileResource;
        return obj;
      });
    });
  },

  pushNes: async (item: WanCategoryAdd) => {

    await http.api.wan.category.add.post(item);

    return Promise.resolve(3 as WanCategoryAddPushingState);
  },
}

// window.test = state;

export function useAllState (keys: Array<StateKey>): [AllState, AllActions] {
  keys.forEach(k => {
    if (!allState[k].init) {
      allState[k] = useObservable<WanCategoryPageRes2>(initStateMap[k]());
      allState[k].init = true;
    }
  });

  return [
    allState,
    actions
  ];
};
