const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const resolve = p => path.resolve(__dirname, p)

class LeoPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    console.log('LeoPlugin')
  }
}

const config = {
  mode: process.env.NODE_ENV,
  entry: {
    app: resolve('app.js')
  },
  output: {
    path: resolve('dist'),
    filename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: require.resolve('vue-loader')
      },
      {
        test: /\.js$/,
        loader: require.resolve('babel-loader')
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new LeoPlugin({
      path: resolve('dist')
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'webpack-app',
      template: resolve('../index.html')
    })
  ],
  infrastructureLogging: {
    level: 'warn'
  }
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new MiniCssExtractPlugin())
}

module.exports = config
