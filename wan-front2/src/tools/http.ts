import axios from 'axios'
// 同步backend api 下
import apiServerJson from './server-api.json'

export const STATIC_HOST = `http://static.nomiwan.com:10800/public/`;

async function req (path:string, arg:any, method = 'GET', others = {}): Promise<any> {
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
