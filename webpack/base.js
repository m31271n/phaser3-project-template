/* eslint-env node */
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const useFileLoader = {
  loader: 'file-loader',
  options: {
    name: '[name].[hash:8].[ext]',
  },
}

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: '0.0.0.0',
  },
  entry: './src/index.js',
  resolve: {
    alias: {
      assets: path.resolve(__dirname, '../assets'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader',
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml|mp3|mp4|ogg|fnt|ttf)$/i,
        use: useFileLoader,
      },
      {
        // fix error when loading JSON files in webpack 4
        // https://github.com/webpack-contrib/file-loader/issues/264
        test: /\.json$/,
        type: 'javascript/auto',
        use: useFileLoader,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      'typeof WEBGL_RENDERER': JSON.stringify(true),
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof UNOFFICIAL_EXTENSION': JSON.stringify(true),
      'typeof EXPERIMENTAL': JSON.stringify(false),
      'typeof PLUGIN_CAMERA3D': JSON.stringify(false),
      'typeof PLUGIN_FBINSTANT': JSON.stringify(false),
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV || ''),
    }),
  ],
}
