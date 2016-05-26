var webpack = require('webpack');
var path    = require('path');
var config  = require('./webpack.config');

config.output = {
  filename: '[name].bundle.js',
  publicPath: '',
  path: path.resolve(__dirname, 'dist')
};
//生产环境代码去除alert和console
config.module.loaders[0]= {test: /\.js$/, exclude: [/app\/lib/,/library/, /node_modules/,/bower_components/], loader: 'strip-debug!ng-annotate!babel'};

config.plugins = config.plugins.concat([

  // Reduces bundles total size
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    mangle: {

      // You can specify all variables that should not be mangled.
      // For example if your vendor dependency doesn't use modules
      // and relies on global variables. Most of angular modules relies on
      // angular global variable, so we should keep it unchanged
      except: ['$super', '$', 'exports', 'require', 'angular']
    }
  })
]);

module.exports = config;
