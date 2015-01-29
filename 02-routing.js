'use strict';

const koa = require('koa');
const port = process.argv[2] || 8008;
const app = koa();

app.use(function* (next) {
  if (this.path !== '/') return yield next;
  this.body = 'hello koa';
})

app.use(function* (next) {
  if (this.path !== '/500') return yield next;
  this.body = 'internal server error';
})

app.use(function* (next) {
  if (this.path !== '/404') return yield next;
  this.body = 'page not found';
})

app.listen(port);
