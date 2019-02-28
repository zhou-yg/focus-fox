const path = require('path');
const fs = require('fs');

const request = require('request');

function download (url) {
  return request({
    method: 'get',
    url,
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
      console.log(`down err:`, err);
    }
  });
}
function upload (file, dest, cb) {
  return request({
    method: 'post',
    url: `http://207.148.114.234:10800/upload`,
    formData: {
      file,
      dest,
    },
  }, cb);
}

module.exports = {
  method: 'post',
  async handler (ctx, next) {
    let {type = 'default', name, downlink,category, url, img} = ctx.request.body;

    let old = await ctx.models.category.find({downlink});
    if (old.data.length > 0) {
      ctx.body = `${name} ${downlink} already exists`;
    } else {
      let {base} = path.parse(downlink);
      // let cws = fs.createWriteStream(path.join(__ROOT_CACHE__, base));
      // let downs = download(downlink);
      // downs.pipe(cws);
      //
      // console.log(`add 0`);
      // await new Promise((resolve) => {
      //   cws.on('finish', () => {
      //     resolve();
      //   });
      //   cws.on('drain', () => {
      //     console.log(`drain`);
      //   });
      // });

      console.log(`add 1`);
      await new Promise(resolve => {
          upload(fs.createReadStream(path.join(__ROOT_CACHE__, base)), `/${type}/${category}`, (err, res, body) => {
            console.log(body);
            resolve();
          });
      });
      console.log(`add 2`);
      let r3 = await ctx.models.category.insertIfNotExists({
        downlink,
      }, {
        name, downlink,category, url, img,
        fileResource: `/${type}/${category}/${base}`,
      });
      console.log(`add 3`, r3);
      ctx.body = 'done';
    }
  },
};
