const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

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

class LeoooPlugin {
  apply(compiler) {
    console.log(compiler)
  }
}

// module.exports = {
//   mode: 'production',
//   entry: {
//     app: './src-2/app.js'
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist')
//     // libraryTarget: 'commonjs'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.md$/,
//         use: [
//           {
//             loader: path.resolve(__dirname, './loader/md.js'),
//             options: {
//               name: 'leooo',
//               age: 18
//             }
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//       title: 'webpack-test',
//       filename: 'index.html',
//       template: './index.html'
//     }),
//     new LeoooPlugin()
//   ]
// }

/**
 * @param {vue-loader探究}
 */

module.exports = {
  entry: {
    index: './src-3/index.vue'
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: require.resolve('vue-loader')
      },
      // {
      //   test: /\.css$/,
      //   loader: require.resolve('css-loader')
      // }
    ]
  },
  plugins: [new VueLoaderPlugin()]
}
