const plugin = require('./plugin');
const u = require('url')

function parseUrlKeyword (keyword) {
  if (!/^http/.test(keyword)) {
    keyword = `http://${keyword}`;
  }
  const parsedUrl = u.parse(keyword, true);

  const splitHostnameArr = parsedUrl.hostname.split('.');
  const websiteName = splitHostnameArr.length === 2 ? splitHostnameArr[0] : splitHostnameArr[1];

  return {
    parsedUrl,
    website: websiteName,
  }
}

module.exports = {
  async search (keyword) {
    const reg = /(((http|https)?:\/\/([-a-zA-Z0-9]*\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))|(([\w]\.tb\.cn|t.\cb)\/[-a-zA-Z0-9@:%_\+.~#?&//=]*))/gi;

    let r;
    if (reg.test(keyword)) {
      r = parseUrlKeyword(keyword);
    } else {
      r = {
        website: keyword,
      };
    }

    plugin.search(r);
    plugin.getResult(r);
  },
}
