var path = require('path');
var webpack = require('webpack');

var NODE_ENV = process.env.NODE_ENV;

var env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined'
};

Object.assign(env, {
  build: (env.production || env.staging)
});

module.exports = {
  target: 'web',

  entry: {
    main: [
      'babel-polyfill',
      './client/main.jsx'
    ],
    admin: ['./client/admin.js']
  },

  watch: true,

  output: {
    path: path.join(process.cwd(), '/client'),
    pathInfo: true,
    publicPath: 'http://localhost:3000/client/',
    filename: '[name].bundle.js'
  },

  resolve: {
    root: path.join(__dirname, ''),
    modulesDirectories: [
      'web_modules',
      'node_modules',
      'client'
    ],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
      __CURRENT_ENV__: '\'' + (NODE_ENV) + '\''
    }),
    new webpack.ProvidePlugin({
      "$": "jquery",
      jQuery: "jquery",
      'md5': 'js-md5'
    })
  ],

  module: {
    loaders: [
      {test: /\.jsx?$/, loader: 'react-hot', exclude: /node_modules/},
      {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/, query: {plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy', 'transform-object-rest-spread']}},
      {test: /\.scss$/, loader: 'style!css!sass?outputStyle=expanded',},
      {test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file?name=client/fonts/[name].[ext]'}
    ],

    noParse: /\.min\.js/
  }
};
