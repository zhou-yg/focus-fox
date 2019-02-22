const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const moment = require('moment');

const MAX = 14;

let i = 14;
let category = (i = 1, p = 1) => `http://nesyouxi.net/category/${i}/page/${p}`;

function sleep(t = 1000) {
  return new Promise(resolve => setTimeout(resolve, t));
}

function getCategory(categoryIndex) {
  let page = 0;

  let nesPages = [];
  let maxPage = 0;
  let erros = [];

  async function getPage(end) {
    page += 1;

    if (maxPage !== 0 && page > maxPage) {
      end();
      return;
    }

    console.log(`getPage: ${page} < ${maxPage}`, moment());

    const url = category(categoryIndex, page);
    try {
      await new Promise(resolve => {
        request({
          url,
          timeout: 10 * 1000,
        }, (err, res, body) => {

          if (err) {
            console.log(`retry ${page}`);
            page -= 1;
            setTimeout(() => {
              getPage(end);
            }, 2000);
            return;
          }
          const $ = cheerio.load(body);

          $('.col-sm-8.main-left a').map((_, a) => {
            const href = a.attribs.href;
            if (/nes\/\d+/.test(href)) {
              nesPages.push(href);
            } else if (/page\/\d+/.test(href)){
              let r = href.match(/page\/(\d+)/);
              if (r) {
                if (r[1] > maxPage) {
                  maxPage = parseInt(r[1]);
                }
              }
            }
          });

          resolve();
        });
      });
    } catch (e) {
      console.log(e);
      erros.push(url);
      fs.writeFileSync(`category-${categoryIndex}.erros.json`, JSON.stringify(erros, null ,2));
    }
    fs.writeFileSync(`category-${categoryIndex}.json`, JSON.stringify(nesPages, null ,2));

    await sleep();

    getPage(end);
  }

  return new Promise(resolve => {
    getPage(() => {
      fs.writeFileSync(`category-${categoryIndex}.json`, JSON.stringify(nesPages, null ,2));
      console.log('====== end ===== ');
      resolve();
    });
  });
}
(async function () {
  while (i <= MAX) {
    await getCategory(i);
    i++;
    await sleep();
  }
})();
// getCategory(i);

// $ = cheerio.load(fs.readFileSync('test.html').toString());
// let nesPages = [];
// let maxPage = 0;
// const allLinks = $('.col-sm-8.main-left a').map((i, a) => {
//   const href = a.attribs.href;
//   if (/nes\/\d+/.test(href)) {
//     nesPages.push(href);
//   } else if (/page\/\d+/.test(href)){
//     let r = href.match(/page\/(\d+)/);
//     if (r) {
//       if (r[1] > maxPage) {
//         maxPage = parseInt(r[1]);
//       }
//     }
//   }
// });
// console.log(nesPages, maxPage);
