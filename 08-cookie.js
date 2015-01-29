'use strict';

const koa = require('koa');
const port = process.argv[2] || 8008;
const app = koa();

app.keys = ['secret', 'keys'];

app.use(function* (){
  let count = ~~this.cookies.get('view', {signed: true}) + 1;
  this.cookies.set('view', count, { signed: true });
  this.body = count + ' views';
});

app.listen(port);
