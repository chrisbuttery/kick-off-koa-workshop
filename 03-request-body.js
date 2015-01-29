'use strict';

const koa = require('koa');
const port = process.argv[2] || 8008;
const parse = require('co-body');
const app = koa();

app.use(function* (next){
  // only accept POST request
  if (this.method !== 'POST') return yield next;

  // max body size limit to `1kb`
  let data = yield parse(this, {limit: '1kb'});

  // if body.name not exist, respond `400`
  if (!data.name) this.throw(400, '.name required');

  this.body = data.name.toUpperCase();
});

app.listen(port);
