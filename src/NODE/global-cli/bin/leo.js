#!/usr/bin/env node

const program = require('commander')

let package = require('../package.json')
// let init = require('./init');
// let list = require('./list')
// program.version(package.version).usage('<command> [options]')
program
  .command('init (template)')
  .description('创建新项目')
  .alias('i')
  .action(function (template) {
    console.log(template)
    // init(template)
  })
program
  .command('list')
  .description('显示可使用的模板列表')
  .alias('l')
  .action(function (...args) {
    console.log(args)
    // list()
  })
program.parse(process.argv)
if (program.args.length == 0) {
  //这里是处理默认没有输入参数或者命令的时候，显示help信息
  program.help()
}
