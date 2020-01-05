import { useObservable} from "mobx-react-lite";
import { observable } from "mobx"
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
  repoList: () => (observable<WanCategoryPageRes2>({
    data: [], all: 0, page: 1,
    selectType: 1,
  })),
  onlineList: () => (observable<WanPushedCategoryPageRes3>({
    data: [], all: 0, page: 1,
    selectType: 1,
  })),
  gameHistory: () => (observable<GameHistoryState>({
    id: '',
    list: [],
  })),
  keymap: () => (observable<KeymapState>({
    list: []
  }))
};

const allState:AllState = {
  repoList: initStateMap.repoList(),
  onlineList: initStateMap.onlineList(),
  gameHistory: initStateMap.gameHistory(),
  keymap: initStateMap.keymap(),
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
      pageSize: 20,
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
  getNesHistoryById: async (_id: string) => {
    let r = await  http.api.wan.category.getNesHistoryById.get({_id});
    allState.gameHistory.list = r;
    allState.gameHistory.id = _id;
  },
  getKeymap: async () => {

    allState.keymap.list = (await http.api.wan.category.keymap.post({})).map(obj => {
      // let keys:Array<KeymapKeys> = ['up', 'down', 'left', 'right', 'a', 'b', 'select', 'start'];
      // keys.forEach(k => {
      //   console.log(k, typeof k, obj[k]);
      //   obj[k] = parseInt(obj[k] as unknown as string);
      // });
      return obj;
    });

    console.log('up:',allState.keymap.list[0].up);
  },
  updateKeymap: async (index: number, from: KeymapKeys, toKeyCode: number) => {

    allState.keymap.list[index][from] = toKeyCode;
    // debugger;
    await http.api.wan.category.keymap.post({
      from,
      toKeyCode,
    });
    // allState.keymap = allState.keymap.slice();
    console.log('update', allState.keymap.list[index].up)
  },
}

window.test = actions;

export function useAllState (): [AllState, AllActions] {
  let currentState: { [key:string]:any } = {};
  Object.keys(allState).forEach((k) => {

    currentState[k] = useObservable(allState[k as StateKey]);
  });

  return [
    currentState as AllState,
    actions
  ];
};
