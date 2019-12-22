const path = require('path');
const nesJson = require(path.join(__dirname, '../nes-category/dist/nes.json'));
const request = require('request');
const types = Object.keys(nesJson);
let list = [];

const categoryNames = [
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

types.forEach(type => {
  const games = nesJson[type];
  list = list.concat(games);
});

async function task(i) {
  const o = list[i];

  if (!o) {
    return;
  }

  delete o.id;

  console.log(`${i} ------start-----> `, o.name)

  request({
    url: 'http://localhost:10666/api/wan/category/add',
    method: 'POST',
    json: true,
    body: {
      type: 'nes',
      ...o,
    },
  }, (err, res, body) => {
    console.log(err);
    console.log(body);
    console.log(`${i} ------end-----> `)
    task(i + 1);
  });
}

console.log('all is: ', list.length);
task(209);
