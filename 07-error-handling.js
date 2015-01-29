'use strict';

const koa = require('koa');
const port = process.argv[2] || 8008;
const app = koa();

app.use(errorHandler);

app.use(function* () {
  if (this.path === '/error') throw new Error('ooops');
  this.body = 'OK';
});

function *errorHandler(next) {
  try {
    yield next;
  } catch (err) {
    // set the status and body
    this.status = err.status || 500;
    this.body = 'internal server error';
    // manually emit error
    this.app.emit('error', err, this);
  }
}

app.listen(port);
