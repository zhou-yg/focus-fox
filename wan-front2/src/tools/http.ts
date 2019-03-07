import axios from 'axios'
// 同步backend api 下
import apiServerJson from './server-api.json'

export type CategoryType = 1 | 2 | 3 | 4 | 5 | 6 |7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

interface WanCategoryAdd {
  type: 'nes' | 'gba',
  "id": string,
  "name": string,
  "downlink": string,
  "category": CategoryType;
  "url": string,
  "img": string;
  downBase: string;
}
interface WanCategoryQuery {
  name:string;
  downlink:string;
}
interface WanCategoryPage {
  type:CategoryType;
  page:number;
  pageSize ?:number;
}
export interface WanCategoryPageRes {
  all: number;
  data: Array<WanCategoryAdd>;
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
        list: ApiNormal<WanCategoryPage, WanCategoryPageRes>;
        listRepo: ApiNormal<WanCategoryPage, WanCategoryPageRes>;
      },
    },
    user: {
      profile: ApiNormal<any, UserProfile>;
    }
  };
}

function req (path:string, arg:any, method = 'GET', others = {}): Promise<any> {
  path = path.replace(/^\//, '');

  let k = method === 'GET' ? 'params' : 'data';

  return axios({
    url: `http://localhost:10666/${path}`,
    method,
    [k]: arg,
    headers: {
      'Content-Type': 'application/json',
    },
    ...others
  }).then(res => {
    return Promise.resolve(res.data);
  });
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
