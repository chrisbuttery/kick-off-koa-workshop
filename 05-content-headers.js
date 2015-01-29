'use strict';

const koa = require('koa');
const port = process.argv[2] || 8008;
const app = koa();

app.use(function *() {
  var isJSON = this.request.is('json');
  this.body = (isJSON) ? {message: 'hi!'} : 'ok';
});

app.listen(port);
