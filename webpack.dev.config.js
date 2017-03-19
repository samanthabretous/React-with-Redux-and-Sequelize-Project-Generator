const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './client/view/Entry.jsx',
  ],
  output: {
    path: path.join(__dirname, '/client/view/public/bundle'),
    filename: 'bundle.js',
    publicPath: '/client/view/public/bundle',
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
  },
  module: {
    loaders: [
      {
        test: [/\.scss$/, /\.css$/],
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loaders: ['babel'],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/,
        loader: 'url',
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  watch: true,
  plugins: [
    // webpack hot module reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
