const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

class LeoPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    console.log(JSON.stringify(compiler.options, null, 2))
  }
}

console.log(process.env.NODE_ENV)
const config = {
  entry: {
    main: path.resolve(__dirname, './main.js')
  },
  mode: process.env.NODE_ENV || 'production',
  output: {
    path: path.resolve(__dirname, '../dist')
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
    new LeoPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'webpack-app',
      template: path.resolve(__dirname, '../index.html')
    }),
    new LeoPlugin({
      path: path.resolve(__dirname, '../dist')
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

