'use strict';

var webpack = require('webpack');
var config = require('./webpack.config.base.js');

var SaveAssetsJson = require('assets-webpack-plugin');

config.bail = true;
config.debug = false;
config.profile = false;
config.devtool = null;//'#source-map';

config.output = {
  path: './client/dist',
  pathInfo: true,
  publicPath: '/client/dist/',
  filename: '[name].min.js'
};

config.plugins = config.plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin(true),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    compress: {
      warnings: true,
      screw_ie8: true
    }
  }),
  new SaveAssetsJson({
    path: process.cwd(),
    filename: 'assets.json'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
]);

config.module.loaders = config.module.loaders.concat([
  {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/, query: {plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy', 'transform-object-rest-spread']}},
  {test: /\.js$/, loader: 'strip-loader?strip[]=console.log'}
]);

module.exports = config;
