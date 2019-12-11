const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.base.conf.js');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const _PROD_ = process.env.NODE_ENV === 'production'

config.plugins = (config.plugins || []).concat([
  new CleanWebpackPlugin(['dist/*'], {
    root: path.join(__dirname, '../'),
    verbose: true,
    dry: false
  }),
  new OptimizeCSSAssetsPlugin({}),

  new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        warnings: false,
        drop_console: !_PROD_ ? false : true,
      },
      output: {
        comments: false
      }
    },
    parallel: true
  }),

  new webpack.HashedModuleIdsPlugin(),

  new HtmlWebpackPlugin({
    title: 'CMS-管理后台',
    filename: 'index.html',
    template: 'src/template/index_base.html',
  }),

  new SWPrecacheWebpackPlugin({
    cacheId: 'ngadmin-sw',
    dontCacheBustUrlsMatching: /\.\w{8}\./,
    filename: 'serviceWorker.js',
    logger(message) {
      console.log(message);
      if (message.indexOf('Total precache size is') === 0) {
        return;
      }
      if (message.indexOf('Skipping static resource') === 0) {
        return;
      }
    },
    minify: true,
    navigateFallback: '/index.html',
    navigateFallbackWhitelist: [/^(?!\/__).*/],
    staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
  })
]);

module.exports = config;