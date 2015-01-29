'use strict';

const koa = require('koa');
const port = process.argv[2] || 8008;
const fs = require('fs');
const app = koa();

app.use(function *(next) {
  if (this.path !== '/json') {
    return yield next;
  }
  this.body = { foo: 'bar' };
});

app.use(function *(next) {
  if (this.path !== '/stream') {
    return yield next;
  }
  this.body = fs.createReadStream(process.argv[3]);
});

app.listen(port);
