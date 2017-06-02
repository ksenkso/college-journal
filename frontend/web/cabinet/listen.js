/**
 * Created by yazun on 31.01.2017.
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackDevConfig = require('./webpack.config.development');

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
