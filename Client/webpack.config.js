const path = require('path');
const webpack = require('webpack');
//const fs = require("fs");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: './compiledJS/ipynb.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "jQuery"
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    new CopyPlugin([
      { from: 'source/Affichage.html', to: 'index.html' },
    ]),
    new MonacoWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery'
    })
    //new fs()
  ]
};
