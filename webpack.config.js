const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const loadPresets = require('./build-utils/loadPresets');

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
  mode = mode || 'production';
  presets = presets || [];
  return webpackMerge(
    {
      mode,
      entry: path.resolve(__dirname, 'src/js/index.js'),
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '_site')
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          },
          {
            test: /\.(jpe?g|png)$/,
            use: [
              {
                loader: 'url-loader',
                options: { limit: 5000 }
              }
            ]
          }
        ]
      },
      plugins: [
        // new CleanWebpackPlugin(),
        // new CopyWebpackPlugin([
        //   {
        //     from: './src/assets',
        //     to: path.resolve(__dirname, 'dist/assets')
        //   }
        // ]),
        new webpack.ProgressPlugin()
      ]
    },
    modeConfig(mode),
    loadPresets({ mode, presets })
  );
};
