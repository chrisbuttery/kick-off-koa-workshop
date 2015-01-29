'use strict';

const koa = require('koa');
const port = process.argv[2] || 8008;
const app = koa();

app.use(function *(){
  this.body = 'hello koa';
});

app.listen(port);
