const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  config = require('./webpack.base.conf.js');

config.mode = 'development'
config.devServer = {
  port: '8888',
  host: 'localhost',
  historyApiFallback: true,
  watchOptions: {
    ignored: /node_modules/
  },
  contentBase: path.join(__dirname, '../dist'),
  publicPath: '/',
  stats: {
    colors: true
  },
  hot: false,
  proxy: [{
    context: ['/api', '/uploads'],
    target: 'http://127.0.0.1:9901',
    changeOrigin: true,
    secure: false
  }]
}
config.plugins = (config.plugins || []).concat([
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    title: 'CMS-FE DEV',
    filename: 'index.html',
    template: 'src/template/index_base.html',
  })
]);

module.exports = config;