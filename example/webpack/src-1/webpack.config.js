const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const resolve = p => path.resolve(__dirname, p)

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: resolve('app.js')
  },
  output: {
    path: resolve('dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: resolve('.')
      },
      {
        test: /\.md$/,
        use: [
          resolve('lib/loader1.js'),
          resolve('lib/loader2.js'),
          resolve('lib/loader3.js')
        ]
      },
      {
        test: /\.md$/,
        enforce: 'pre',
        use: [resolve('lib/loader4.js')]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack-module-analysis',
      filename: 'index.html',
      template: resolve('../index.html')
    })
  ]
}
