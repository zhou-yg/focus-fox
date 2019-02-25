const fs = require('fs');
const path = require('path');

const dir1 = path.join(__dirname, 'roms-download-links');
const dir2 = path.join(__dirname, 'category-imgs');
const dist = path.join(__dirname, './dist/nes.json');

const host = 'http://nesyouxi.net';

let idpre = '00';
let r = {
  // [name]: {}
}
let r2 = {
  // [category]: { [name]: {} }
};

let linksAll = JSON.parse(fs.readFileSync(path.join(dir1, 'links-all.json')).toString());

linksAll.forEach((obj, i) => {
  if (!r[obj.name]) {
    r[obj.name] = {
      id: `${idpre}${i}`,
      name: obj.name,
      downlink: `${host}${obj.downlink}`,
      category: obj.category,
      url: obj.url,
    };
  }
});

// console.log(1, Object.keys(r));
let linksValues = Object.values(r);

// console.log(linksValues);

let imgsAll = JSON.parse(fs.readFileSync(path.join(dir2, 'category-imgs-all.json')).toString());
imgsAll.forEach(obj => {
  obj.href = `${host}${obj.href}`;

  let i = 0;
  while (i < linksValues.length) {
    let obj2 = linksValues[i];

    if (obj2.url === obj.href) {
      obj2.img = `${host}${obj.src}`;
      // console.log(obj2.img, obj2.url, obj.href);
      break;
    }
    i++;
  }
});

// console.log(linksValues[10]);

linksValues.forEach(obj => {
  if (!r2[obj.category]) {
    r2[obj.category] = [];
  }
  r2[obj.category].push(obj);
});

fs.writeFileSync(dist, JSON.stringify(r2, null, 2));
