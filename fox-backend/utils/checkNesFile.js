const request = require('request');

const staticHost = `http://localhost:10800`;
const staticHostPublic = `http://localhost:10800/public`;

module.exports = (file) => {
  return new Promise((resolve, reject) => {
    const url = `${staticHost}/status?path=${encodeURIComponent(file)}`;
    request({
      url,
      method: 'GET',
    }, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        let {size} = JSON.parse(body);
        console.log(url, size);
        resolve(size);
      }
    });
  });
}
