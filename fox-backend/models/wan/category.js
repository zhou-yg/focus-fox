const DB = require('./DB');

class Category extends DB {
  constructor () {
    super('category');
  }
};

module.exports = new Category();
