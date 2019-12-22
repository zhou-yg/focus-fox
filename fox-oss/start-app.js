const app = require('./app');


app.listen(process.env.PORT || 10800);

console.log(`on: ${process.env.PORT || 10800}`);
