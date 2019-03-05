const request = require('request');

request({
  method: 'GET',
  url:'http://localhost:10666/api/wan/category/list',
  json: {
    type: 1,
  },
}, (a,b,body) => {
  if (a) throw a;
  console.log(body);

  request.post({
    url:'http://localhost:10666/api/wan/category/hidden',
    form: {
      "name": "爆破小子",
      "downlink": "http://nesyouxi.net/media/nes/3362/2009101212583046327.nes",
    },
  }, (err, res, body) => {
    console.log(err);
    console.log(body);
  });
});
