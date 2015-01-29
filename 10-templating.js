'use strict';

const koa = require('koa');
const port = process.argv[2] || 8008;
const views = require('co-views');

const app = koa();

const render = views(__dirname + '/views', {
  ext: 'ejs'
});

let user = {
  name: {
    first: 'Tobi',
    last: 'Holowaychuk'
  },
  species: 'ferret',
  age: 3
};

app.use(function* (next){
  if (this.path != '/') return yield next;
  this.body = yield render('user', {
    user: user
  });
});

app.listen(port);
