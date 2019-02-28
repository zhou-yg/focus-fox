const request = require('request');


request.post({
  url:'http://localhost:10666/api/wan/category/add',
  form: {
    type: 'nes',
    "id": "000",
    "name": "爆破小子",
    "downlink": "http://nesyouxi.net/media/nes/3362/2009101212583046327.nes",
    "category": 1,
    "url": "http://nesyouxi.net/nes/3362/",
    "img": "http://nesyouxi.net/media/images/2010161188327.jpg",
  },
}, (err, res, body) => {
  console.log(err);
  console.log(body);
});
