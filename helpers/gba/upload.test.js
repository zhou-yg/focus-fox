const fs = require('fs');
const path = require('path');
const request = require('request');

// const url = `http://localhost:10800/upload`;
const url = `http://207.148.114.234:10800/upload`;


let file = fs.createReadStream(path.join(__dirname, '../../.cache/2009101212583046327.nes'));

request({
  method: 'post',
  url,
  header: {
    // 'Content-Type': 'multipart/form-data',
  },
  formData: {
    file,
    dest: '/nes/',
  },
}, (err, res, body) => {
  console.log(err);
  console.log(body);
});
