const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'roms-download-links');

const jsonFileArr = fs.readdirSync(dir).filter(f => /\d\.json$/.test(f)).map((f, i) => {
  let arr = JSON.parse(fs.readFileSync(path.join(dir, f)).toString());
  arr.forEach(obj => obj.category = i + 1);
  return arr;
}).reduce((p, n) => p.concat(n));

const jsonFileSetArr = [...new Set(jsonFileArr)];

console.log(`jsonFileSetArr.length:`, jsonFileSetArr.length);

fs.writeFileSync(path.join(dir, `links-all.json`), JSON.stringify(jsonFileSetArr, null, 2));
