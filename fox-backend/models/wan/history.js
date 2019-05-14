const DB = require('./DB');

class History extends DB {
  constructor () {
    super('history');
  }
};

module.exports = new History();
