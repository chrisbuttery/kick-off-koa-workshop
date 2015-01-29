'use strict';

const koa = require('koa');
const port = process.argv[2] || 8008;
const app = koa();

app.use(responseTime);
app.use(upperCase);

app.use(function* () {
  this.body = 'hello koa';
});

function *responseTime(next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
}

function *upperCase(next) {
  yield next;
  this.body = this.body.toUpperCase();
}

app.listen(port);
