'use strict';

var fs = require('fs');
var path = require('path');

var express = require('express');
var app = express();
const wrap = require('express-async-wrap');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');


const salts = require('./server/helpers').salts;
const container = require('./server/helpers/DIContainer');

var compress = require('compression');
var layouts = require('express-layout');

const api = require('./server/routes/api');
const auth = require('./server/routes/auth');
const admin = require('./server/routes/admin');
app.locals.test = 'hello';
app.locals.container = container;
app.set('view engine', 'jade');
app.set('views', './server/views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(compress());
app.use(session({
  secret: 'some secret value',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use('/client', express.static(path.join(process.cwd(), '/client')));
app.use('/api/public', api.public);
app.use('/api/test', api.test);

app.use('/auth', auth);
app.use('/admin', admin);
app.use('/api/private', api.private);
app.use(wrap(async (err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.stack);
}));
app.disable('x-powered-by');

let env = {
  production: process.env.NODE_ENV === 'production'
};

if (env.production) {
  Object.assign(env, {
    assets: JSON.parse(fs.readFileSync(path.join(process.cwd(), 'assets.json')))
  });
}
app.get('/*', function(req, res) {
  if (!req.session.authorized) {
    res.redirect('/auth/login');
  } else {
    res.render('index', {
      env: env
    });
  }
});


var port = Number(process.env.PORT || 3001);
app.listen(port, function () {
  console.log('server running at localhost:3001, go refresh and see magic');
});

if (env.production === false) {
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');

  var webpackDevConfig = require('./webpack.config.development');

  new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: '/client/',
    contentBase: './client/',
    inline: true,
    hot: true,
    stats: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  }).listen(3000, 'localhost', function (err) {
    if (err) {
      console.log(err);
    }

    console.log('webpack dev server listening on localhost:3000');
  });
}

module.exports = {app};
