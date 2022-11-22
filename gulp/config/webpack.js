/* eslint-disable-next-line */
const { resolve, join } = require('path');
const { ProvidePlugin } = require('webpack');

const { srcScript, output, outputScript } = require('./directories');

const nodeEnv = process.env.NODE_ENV;
const isDevelopment = nodeEnv === 'development';

module.exports = {
  mode: 'none',
  context: join(__dirname, '../../', output),
  output: {
    path: join(__dirname, '../../', outputScript),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': resolve(srcScript),
    },
  },
  plugins: [
    new ProvidePlugin({
      Plugin: ['@/cores/plugin', 'default'],
      $: ['jquery'],
    }),
  ],
  optimization: {
    nodeEnv,
    chunkIds: 'total-size',
    concatenateModules: true,
    flagIncludedChunks: true,
    moduleIds: 'size',
    sideEffects: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  devtool: isDevelopment && 'source-map',
};
