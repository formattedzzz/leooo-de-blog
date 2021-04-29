#!/usr/bin/env node
const program = require('commander')
const request = require('request')
var chalk = require('chalk')

// let package = require('../package.json')
// let init = require('./init');
// let list = require('./list')
// program.version(package.version).usage('<command> [options]')

program.version('0.0.1').usage('<keywords>').parse(process.argv)

if (program.args.length == 0) {
  //这里是处理默认没有输入参数或者命令的时候，显示help信息
  program.help()
} else {
  console.log('start api...')
  const keywords = program.args
  const url = `https://api.github.com/search/repositories?sort=stars&order=desc&q=${keywords}`
  request(
    {
      method: 'GET',
      headers: {
        'User-Agent': 'formattedzzz'
      },
      url
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var body = JSON.parse(body)
        body.items = body.items.slice(0, 5)
        for (var i = 0; i < body.items.length; i++) {
          console.log(chalk.cyan.bold.underline('Name: ' + body.items[i].name))
          console.log(chalk.magenta.bold('Owner: ' + body.items[i].owner.login))
          console.log(chalk.grey('Desc: ' + body.items[i].description + '\n'))
          console.log(
            chalk.grey('Clone url: ' + body.items[i].clone_url + '\n')
          )
        }
        process.exit(0)
      } else if (error) {
        console.log('Error: ' + error)
        process.exit(1)
      }
    }
  )
}
// 