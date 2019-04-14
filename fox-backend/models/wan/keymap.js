const DB = require('./DB');

class Keymap extends DB {
  constructor () {
    super('keymap');
  }
};

module.exports = new Keymap();
