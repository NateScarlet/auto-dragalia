const path = require('path');
const { name, version } = require('./package.json');
const webpack = require('webpack');

const versionStr = process.env.NODE_ENV === 'production' ? version : 'dev';

const TARGET_ASSET = process.env.TARGET_ASSET || '1080x2160';
const FALLBACK_ASSET = process.env.FALLBACK_ASSET || '1080x2160';

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
    filename: `${name}-${versionStr}-${TARGET_ASSET}.auto.js`,
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.DefinePlugin({
      TARGET_ASSET: JSON.stringify(TARGET_ASSET),
      FALLBACK_ASSET: JSON.stringify(FALLBACK_ASSET)
    })
  ],
  mode: 'development',
  performance: {
    hints: false
  }
};
