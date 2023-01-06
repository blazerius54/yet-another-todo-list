const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const dotenv = require('dotenv')


module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, './ui_build'),
    filename: 'bundle.js',
  },
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, './ui_build'),
    },
    compress: true,
    port: 9000
  },
  module: {
    rules: [{
      test: /\.(jsx|js)$/,
      include: path.resolve(__dirname, 'src'),
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                "targets": "defaults"
              }
            ],
            '@babel/preset-react'
          ]
        }
      }]
    }]
  },
  resolve: {
    fallback: {
      url: false,
    }
  },
};