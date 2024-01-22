const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
      },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'My App',
          template: 'src/index.html',
        }),
        // new CopyPlugin({
        //     patterns: [
        //       { from: 'src/locale', to: "./locale" },
        //     ],
        //   }),
    ],
  }