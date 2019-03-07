import { useObservable } from "mobx-react-lite";

import http, {WanCategoryPageRes} from 'src/tools/http';

interface WanCategoryPageRes2 extends WanCategoryPageRes {
    page: number;
    init: boolean;
}

interface AllState {
  repoList:WanCategoryPageRes2;
}
interface AllActions {
  getList: (page: number) => void;
}

type StateKey = 'repoList';

const initStateMap = {
  repoList: ():WanCategoryPageRes2 => ({ data: [], all: 0, page: 1, init: false}),
};

const allState:AllState = {
  repoList: initStateMap.repoList(),
};

const actions:AllActions = {
  getList: (page:number) => {
    allState.repoList.page = page;
    http.api.wan.category.listRepo.get({
      type: 1,
      page,
      pageSize: 15,
    }).then(({all, data}) => {
      allState.repoList.all = all;
      allState.repoList.data = data;
    });
  }
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
