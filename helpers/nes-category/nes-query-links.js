const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const moment = require('moment');

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

const MAX = 14;

// const getJson = (i) => [...new Set(JSON.parse(fs.readFileSync(path.join(__dirname, `./category-all/category-${i}.json`)).toString()))]
const getJson = (i) => [...new Set(JSON.parse(fs.readFileSync(path.join(__dirname, `./category-all/category-${i}.json`)).toString()))]
const getJson2 = (i) => [...new Set(JSON.parse(fs.readFileSync(path.join(__dirname, `./category-all/links-${i}-errors.json`)).toString()))]
const getPageUrl = (path) => /^http/.test(path) ? path : `http://nesyouxi.net${path}`;

function sleep(t = 1000) {
  return new Promise(resolve => setTimeout(resolve, t));
}

function checkInFile(index, url) {
  const targetFile = path.join(__dirname, `./roms-donwload-links/links-${index}.json`);
  let old = fs.existsSync(targetFile) ? JSON.parse(fs.readFileSync(targetFile).toString()) : [];

  return old.every(obj => obj.url !== url);
}
function writeInFile(index, arr = []) {
  const targetFile = path.join(__dirname, `./roms-donwload-links/links-${index}.json`);
  let old = fs.existsSync(targetFile) ? JSON.parse(fs.readFileSync(targetFile).toString()) : [];

  arr.forEach(({url, name, downlink}) => {

    if (old.every(obj => obj.name !== name || obj.url !== url)) {
      old.push({name, downlink, url});
      fs.writeFileSync(targetFile, JSON.stringify(old, null, 2));
    }
  });
}
function writeErrors(index, url) {
  const targetFile = path.join(__dirname, `./category-all/links-${index}-errors.json`);
  let old = fs.existsSync(targetFile) ? JSON.parse(fs.readFileSync(targetFile).toString()) : [];

  if (old.every(u => u !== url)) {
    old.push(url);
    fs.writeFileSync(targetFile, JSON.stringify(old, null, 2));
  }
}

async function getOneLink(url, end, error) {
  console.log(`request ${url} ${moment()}`);
    request({
      url: url,
      timeout: 10*1000,
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        Cookie: '__cfduid=df39ff03a45da30bde80492eedc4acebd1550739856; csrftoken=uRxKIeMOUKPIM1Usk77H8X23N7Ei2mvI2gi93LdIPDHmBYB2wJREpRlSEbiGgQJT; UM_distinctid=1690f4c667544a-0a74fea75e7bd1-10346654-13c680-1690f4c66769a0; bdshare_firstime=1550739859591; _ga=GA1.2.1497149447.1550739861; _gid=GA1.2.1007266035.1550739861; CNZZDATA5530657=cnzz_eid%3D181722372-1550738939-%26ntime%3D1550804251; _gat=1',
        Host: 'nesyouxi.net',
        Pragma: 'no-cache',
        Referer: 'http://nesyouxi.net/',
        'Upgrade-Insecure-Requests': 1,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
      },
    }, (err, res, body) => {
      if (err) {
        console.log(`0.retry ${url} ${err.message}`);
        setTimeout(() => {
          getOneLink(url, end, error)
        }, 2000);
        return;
      }

      const $ = cheerio.load(body);

      let name = '';
      $('.section-title.big').map((_, a) => {
        if (a.children && a.children[0] && a.children[0].data) {
          name = (a.children[0].data).trim();
        }
      });

      let result = []
      $('.download-button').map((_, a) => {
        if (a.children && a.children[0] && a.children[0].data) {
          if (!/zip格式/.test(a.children[0].data)) {
            let n = name;
            if (!/(nes格式)|下载|地址/.test(a.children[0].data)) {
              n = (a.children[0].data).trim();
            }
            result.push({
              name: n,
              downlink: a.attribs.href,
              url,
            });
          }
        }
      });

      if (result.length) {
        end(result);
      } else {
        writeErrors(i, url);
        error();
      }
    });
}

async function getLinks(index) {
  const urlArr = (index === 2 ? getJson2(index) : getJson(index)).map(getPageUrl);

  let i = 0;
  let r = [];
  while (i < urlArr.length) {
    try {
      let code = await new Promise(resolve => {
        if (checkInFile(index, urlArr[i])) {
          getOneLink(urlArr[i], (result) => {
            r = r.concat(result);
            writeInFile(index, result);
            resolve();
          }, () => {
            resolve();
          });
        } else {
          console.log(`${index} ${urlArr[i]} exits`);
          resolve(-1);
        }
      });
      if (code !== -1) {
        await sleep();
      }
    } catch(e) {
      console.log(e);
    } finally {
      i++;
    }
  }
  console.log(r);
  console.log(`====== ${index} end ======`);
}

let i = 3;
// getLinks(2);
(async function () {
  while (i <= MAX) {
    await getLinks(i);
    await sleep();
    i++;
  }
})();
