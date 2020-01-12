const path = require('path');
const fs = require('fs');

const request = require('request');

const staticHost = `http://localhost:10800`;
const staticHostPublic = `http://localhost:10800/public`;

function cacheFileExists(cachePath, remoteRelativePath) {
  if (fs.existsSync(cachePath)) {
    let cacheBuffer = fs.readFileSync(cachePath);
    return new Promise((resolve, reject) => {
      request({
        url: `${staticHost}/status?path=${encodeURIComponent(remoteRelativePath)}`,
        method: 'GET',
      }, (err, res, body) => {
        if (err) {
          reject(err);
        } else {
          let {size} = JSON.parse(body);
          resolve(size >0 && size === cacheBuffer.length);
        }
      });
    });
  }
  return false;
}
//@TEST
// let r = cacheFileExists(path.join(__ROOT_CACHE__, '2009101212583046327.nes'), '/nes/1/2009101212583046327.nes');
// r.then(v => console.log(v));

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
    url: `${staticHost}/upload`,
    formData: {
      file,
      dest,
    },
  }, cb);
}

async function downAndUpload (downlink, remoteStaticPath) {
  let {base} = path.parse(downlink);
  let cacheFilePath = path.join(__ROOT_CACHE__, base);
  let remoteStaticPathBase = `${remoteStaticPath}/${base}`;
  let isCacheFileExists = await cacheFileExists(cacheFilePath, remoteStaticPathBase);

  console.log('checkCache => ', isCacheFileExists, remoteStaticPathBase, downlink);
  if (!isCacheFileExists) {
    let cws = fs.createWriteStream(cacheFilePath);
    let downs = download(downlink);
    downs.pipe(cws);

    await new Promise((resolve) => {
      cws.on('finish', () => {
        resolve();
      });
    });
    console.log(`download link complete:`, downlink);
    await new Promise(resolve => {
        upload(fs.createReadStream(path.join(__ROOT_CACHE__, base)), remoteStaticPath, (err, res, body) => {
          console.log('upload stats => ',body);
          resolve();
        });
    });
    console.log(`upload to remote complete! => `, downlink);
  } else {
  }
  return remoteStaticPathBase;
}

module.exports = {
  method: 'post',
  async handler (ctx, next) {
    let {type = 'default', name, downlink,category, url, img} = ctx.request.body;

    console.log(`downlink:`, downlink);

    let old = await ctx.models.category.find({downlink});
    if (old.data.length > 0) {
      ctx.body = `${name} ${downlink} already exists`;
    } else {

      console.log(`add 1:`, name);

      const [fileResource, imgResource] = await Promise.all([
        downAndUpload(downlink, `${type}/${category}/roms`),
        downAndUpload(img, `${type}/${category}/imgs`),
      ]);

      console.log(`add 2`, fileResource, imgResource);
      let r3 = await ctx.models.category.insertIfNotExists({
        downlink,
      }, {
        type,
        name, downlink,category, url, img,
        fileResource,
        imgResource,
      });
      console.log(`add 3`, r3);
      ctx.body = 'done';
    }
  },
};
