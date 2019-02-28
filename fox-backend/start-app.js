const fs = require('fs');
const path = require('path');

global.PUBLIC_DIR = path.resolve(__dirname, './public/');;

global.__DEV__ = process.env.NODE_ENV !== 'production';
global.__ROOT__ = path.resolve(__dirname, '../');
global.__ROOT_CACHE__ = path.resolve(__dirname, '../.cache');
const PORT = process.env.PORT || 10666;

const app = require(path.join(__dirname,'./app.js'));

app.listen(PORT);

console.log('listen on '+ PORT);
