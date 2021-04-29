var exec = require('child_process').exec
var command = 'npm config get prefix'

function execute(command, callback) {
  exec(command, function (error, stdout, stderr) {
    callback(error, stdout)
  })
}
execute(command, console.log)
console.log('miao')
// /usr/local/lib/node_modules/puppeteer