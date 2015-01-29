'use strict';

const koa = require('koa');
const session = require('koa-session');
const port = process.argv[2] || 8008;
const app = koa();

app.keys = ['some secret hurr'];
app.use(session(app));

app.use(function* (){
  let count = this.session.views || 0;
  this.session.views = ++count;
  this.body = count + ' views';
});

app.listen(port);
