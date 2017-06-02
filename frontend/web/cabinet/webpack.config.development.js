'use strict';

var webpack = require('webpack');
var config = require('./webpack.config.base.js');

if (process.env.NODE_ENV !== 'test') {
  config.entry.main = [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server'
  ].concat(config.entry.main);
  config.entry.admin = [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server'
  ].concat(config.entry.admin);
}

config.devtool = '#cheap-module-eval-source-map';

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin()
]);

config.module.loaders = config.module.loaders.concat([
  {test: /\.jsx?$/, loader: 'react-hot', exclude: /node_modules/},
  {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/, query: {plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy', 'transform-object-rest-spread']}}
]);

module.exports = config;
