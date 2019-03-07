import axios from 'axios'
// 同步backend api 下
import apiServerJson from './server-api.json'

type CategoryType = 1 | 2 | 3 | 4 | 5 | 6 |7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

interface WanCategoryAdd {
  type: 'nes' | 'gba',
  "id": string,
  "name": string,
  "downlink": string,
  "category": CategoryType;
  "url": string,
  "img": string;
}
interface WanCategoryQuery {
  name:string;
  downlink:string;
}
interface WanCategoryPage {
  type:CategoryType;
  page:number;
  pageSize:number;
}

interface ApiNormal<T> {
    get: (arg:T, config:any) => Promise<any>;
    post: (arg:T, config:any) => Promise<any>;
}

interface ApiLayer1 {
  api: {
    wan: {
      category: {
        add: ApiNormal<WanCategoryAdd>;
        hidden: ApiNormal<WanCategoryQuery>;
        remove: ApiNormal<WanCategoryQuery>;
        list: ApiNormal<WanCategoryPage>;
        listRepo: ApiNormal<WanCategoryPage>;
      },
    },
    user: {
      profile: ApiNormal<any>;
    }
  };
}

function req (path:string, arg:any, method = 'GET', others = {}) {
  path = path.replace(/^\//, '');

  return axios({
    url: `http://localhost:10666/${path}`,
    method,
    data: arg,
    headers: {
      'Content-Type': 'application/json',
    },
    ...others
  })
}

function wrapperApi (paths:Array<string>):ApiLayer1 {
  let root:any = {}
  paths.forEach((path) => {
    let pathArr = path.split('/').filter(v => v)
    let myRoot = root;
    pathArr.forEach((p, i) => {
      if (!myRoot[p]) {
        myRoot[p] = {}
      }
      if (i === pathArr.length - 1) {
        myRoot[p] = {
          get: (arg:any, config:any) => req(path, arg, 'GET', config),
          post: (arg:any, config:any) => req(path, arg, 'POST', config),
        }
      } else {
        let parent = myRoot[p]
        myRoot = parent
      }
    })
  })
  return root
}

const outputApi:ApiLayer1 = {
  ...wrapperApi([
    '/api/test',
    ...apiServerJson,
  ]),
};

export default outputApi;
