const HOST = 'http://mongo.nomiwan.com:8880/sms';
const request = require('request');

class DB {
  constructor (dbName) {
    this.dbName = dbName;
  }
  base (method) {
    return (arg, doc = {}) => {
      return new Promise((resolve, reject) => {
        request({
          method: 'post',
          url: `${HOST}/${this.dbName}/${method}`,
          form: {
            arg,
            doc,
          },
        }, (err, res, body) => {
          if (err) {
            reject(err);
          } else {
            body = typeof body === 'string' ? JSON.parse(body) : body;
            if (method === 'find') {
              body.data = [].concat(body.data);
            }
            resolve(body);
          }
        });
      });
    };
  }
  async insert (arg, doc) {
    return this.base('insert')(arg);
  }
  async insertIfNotExists (q, arg) {
    let r = await this.find(q);
    if (r.data.length > 0) {
      return false;
    } else {
      let r2 = await this.insert(arg);
      return r2.data.result.ok > 0;
    }
  }
  async remove (arg, doc) {
    return this.base('remove')(arg);
  }
  async update (arg, doc) {
    return this.base('update')(arg, doc);
  }
  async find (arg, doc) {
    return this.base('find')(arg);
  }
}


module.exports = DB;
