import { useObservable } from "mobx-react-lite";

import http, {WanCategoryPageRes, CategoryType, WanCategoryAdd, WanCategoryAddPushingState} from 'src/tools/http';

interface WanCategoryPageRes2 extends WanCategoryPageRes {
    page: number;
    init: boolean;
    selectType: CategoryType;
}

interface AllState {
  repoList:WanCategoryPageRes2;
}
interface AllActions {
  getList: (page: number, type:CategoryType) => void;
  pushNes: (item: WanCategoryAdd) => Promise<WanCategoryAddPushingState>;
}

type StateKey = 'repoList';

const initStateMap = {
  repoList: ():WanCategoryPageRes2 => ({
    data: [], all: 0, page: 1, init: false,
    selectType: 1,
  }),
};

const allState:AllState = {
  repoList: initStateMap.repoList(),
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
