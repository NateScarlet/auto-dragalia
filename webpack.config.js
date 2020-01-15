const path = require('path');
const { name, version } = require('./package.json');
const webpack = require('webpack');

const TARGET_ASSET = process.env.TARGET_ASSET || '1080x2160';
const FALLBACK_ASSET = process.env.FALLBACK_ASSET || '1080x2160';
const TARGET_LOCALE = process.env.TARGET_LOCALE || 'zh';

module.exports = {
  entry: ['./src/main.ts'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{ loader: 'url-loader' }]
      },
      {
        test: /\.xml$/i,
        use: [{ loader: 'raw-loader' }]
      }
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'package.json': path.resolve(__dirname, 'package.json')
    }
  },
  output: {
    filename: `${name}-${TARGET_LOCALE}-${version}-${TARGET_ASSET}.auto.js`,
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.DefinePlugin({
      TARGET_ASSET: JSON.stringify(TARGET_ASSET),
      FALLBACK_ASSET: JSON.stringify(FALLBACK_ASSET),
      TARGET_LOCALE: JSON.stringify(TARGET_LOCALE)
    })
  ],
  mode: 'development',
  performance: {
    hints: false
  }
};
