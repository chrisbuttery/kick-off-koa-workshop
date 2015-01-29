'use strict';

const koa = require('koa');
const port = process.argv[2] || 8008;
const session = require('koa-session');
const parse = require('co-body');
const app = koa();

var form = '<form action="/login" method="POST">\
  <input name="username" type="text" value="username">\
  <input name="password" type="password" placeholder="The password is \'password\'">\
  <button type="submit">Submit</button>\
</form>';

// use koa-session somewhere at the top of the app
// we need to set the `.keys` for signed cookies and the cookie-session module
app.keys = ['secret1', 'secret2', 'secret3'];
app.use(session(app));


/**
 * If `this.session.authenticated` exist, user will see 'hello world'
 * otherwise, people will get a `401` error  because they aren't logged in
 */

app.use(function* home(next) {
  if (this.request.path !== '/') return yield next;
  if (this.session.authenticated) return this.body = 'hello world';

  // otherwise
  this.status = 401;
  this.body = 'unauthorized';
});


/**
 * If successful, the logged in user should be redirected to `/`.
 * hint: use `this.redirect`
 */

app.use(function* login(next) {
  if (this.request.path !== '/login') return yield next;
  if (this.request.method === 'GET') return this.body = form;
  if (this.request.method !== 'POST') return;

  // validate user
  let body = yield parse(this);
  if (body.username !== 'username' && body.password !== 'password') return this.status = 400;

  // log in
  this.session.authenticated = true;
  this.redirect('/');
});


/**
 * Let's redirect to `/login` after every response.
 * If a user hits `/logout` when they're already logged out,
 * let's not consider that an error and rather a "success".
 */

app.use(function* logout(next) {
  if (this.request.path !== '/logout') return yield next;

  // log out
  this.session.authenticated = false;
  return this.redirect('/login');
});

app.listen(port);
