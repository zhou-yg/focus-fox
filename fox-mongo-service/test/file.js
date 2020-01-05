const request = require('request');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

const testFile = path.join(__dirname, '../package.json');

const stream = fs.createReadStream(testFile);

request({
  url: 'http://localhost:8880/sms/test/insert',
  method: 'POST',
  formData: {
    arg: JSON.stringify({
      ke: 123,
    }),
    myfile: stream,
  },
}, function (err, res, body) {
  if (err) {
    console.log(err);
  }
  console.log(body);
});
