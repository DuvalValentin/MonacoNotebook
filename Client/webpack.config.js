const path = require('path');
const webpack = require('webpack');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: './compiledJS/ipynb.js',
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    jquery: "jQuery",
    vscode: "amd vscode" // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    vscode: 'empty'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      
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
  ]
};
