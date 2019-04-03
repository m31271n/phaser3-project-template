/* eslint-env node */
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const base = require('./base')

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash:8].js',
  },
  devtool: 'nosources-source-map',
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          sourceMap: true,
          output: {
            comments: false,
            ecma: 5, // transpile all codes to ECMAScript 5
          },
        },
      }),
    ],
  },
})
