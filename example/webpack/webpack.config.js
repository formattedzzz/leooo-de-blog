const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

/**
 * @param {模块化原理}
 */
// module.exports = {
//   entry: {
//     app: './src-0/app.js'
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist')
//   },
//   plugins: [new CleanWebpackPlugin()]
// }

/**
 * @param {vendor包}
 * @param {chunk包}
 */
// module.exports = {
//   mode: 'production',
//   entry: {
//     app: './src-1/app.js',
//     vendor: './src-1/lib/c'
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: '[name].js'
//   },
//   plugins: [new CleanWebpackPlugin(['dist'])]
// }

/**
 * @param {umd模块结构}
 */

// module.exports = {
//   entry: {
//     app: './src-0/app.js'
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: '[name].umd.js',
//     // library: 'leo',
//     libraryTarget: 'umd',
//     globalObject: 'this',
//     umdNamedDefine: true
//   },
//   plugins: [new CleanWebpackPlugin()]
// }

/**
 * @param {自定义loader探究}
 */

/**
 * @param {自定义plugin探究}
 */

// const LeoPlugin = require('./leo-plugin.js')
function LeoPlugin() {}
module.exports = {
  entry: {
    app: './src-2/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [new CleanWebpackPlugin(), new LeoPlugin()]
}
