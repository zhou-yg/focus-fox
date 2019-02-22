const fs = require('fs');
const path = require('path');

const jsonFileArr = fs.readdirSync(__dirname).filter(f => /\.json$/.test(f)).map(f => {
  return JSON.parse(fs.readFileSync(f).toString());
}).reduce((p, n) => p.concat(n));

const jsonFileSetArr = [...new Set(jsonFileArr)];

console.log(`jsonFileSetArr.length:`, jsonFileSetArr.length);

fs.writeFileSync(`category-all.json`, JSON.stringify(jsonFileSetArr, null, 2));
