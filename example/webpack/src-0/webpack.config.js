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
        include: resolve('./')
      },
      {
        test: /\.css$/,
        use: [require.resolve('style-loader'), 'css-loader']
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
