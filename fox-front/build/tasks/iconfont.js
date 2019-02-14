const path = require('path');
const fs = require('fs');
const request = require('request');
const fontDir = path.resolve(__dirname, '../../src/assets/fonts/');
const iconCssFile = path.resolve(__dirname, '../../src/assets/styles/icon.css');
const tempIconCssFile = path.resolve(process.env.HOME, './tempIcon.css');
const timeStampKeyName = 'iconTimeStamp';
const timeStampKeyNameReg = new RegExp(`${timeStampKeyName}=[\\d]+`, 'g');
const now = Date.now();
const fontTypes = [
  `eot`,
  `woff`,
  `ttf`,
  'svg',
];
var iconHash = process.argv[2];
// @TEST
// iconHash = 'cn50zakxufim5cdi';
if (!iconHash) {
  throw '缺少icon hash，@zhouyg';
}
iconHash = iconHash.replace(/^font_/, '');
function buildFontHref (type, code) {
  return `http://at.alicdn.com/t/font_${code}.${type}`;
}
function buildFontCssHref (code) {
  return `http://at.alicdn.com/t/font_${code}.css`;
}
// 下载文件
fontTypes.map(type => {
  const href = buildFontHref(type, iconHash);
  const destFile = path.join(fontDir, `iconfont.${type}`);
  request.get(href).pipe(fs.createWriteStream(destFile));
});
// 下载css
const tempWriteStream = fs.createWriteStream(tempIconCssFile);
request.get(buildFontCssHref(iconHash)).pipe(tempWriteStream);
tempWriteStream.on('finish', () => {
  console.log('下载css');
  const temp = fs.readFileSync(tempIconCssFile).toString();
  var iconCss = fs.readFileSync(iconCssFile).toString();
  const reg = /\.icon-[\s\S]*$/;
  var tempR = temp.match(reg);
  if (tempR) {
    tempR = tempR[0];
    iconCss = iconCss.replace(reg, tempR);
    fs.writeFileSync(iconCssFile, iconCss);
    console.log(`更新.class完成 ==> ${iconCssFile}`);
  } else {
    throw new Error('啊蛤？');
  }
});
// 修改时间戳
const cssText = fs.readFileSync(iconCssFile).toString().replace(timeStampKeyNameReg, `${timeStampKeyName}=${now}`);
fs.writeFileSync(iconCssFile, cssText);
console.log(`更新文件完成 ==> ${iconCssFile}`);
