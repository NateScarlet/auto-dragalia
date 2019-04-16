const path = require('path');
const { name, version } = require('./package.json');

const versionStr = process.env.NODE_ENV === 'production' ? version : 'dev';

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
    filename: `${name}-${versionStr}.auto.js`,
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [],
  mode: 'development',
  performance: {
    hints: false
  }
};
