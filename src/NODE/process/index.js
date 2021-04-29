const http = require('http')
// let acorn = require('acorn')
// console.log(acorn.parse('1 + 1', { ecmaVersion: 2020 }))

const server = http
  .createServer((req, res) => {
    console.log(req.url)
    // res.setHeader('Cache-Control', 'max-age=60')
    res.setHeader('Cache-Control', 'no-store')
    res.end(`{name: 'leooo--'}`)
  })
  .listen('7003', () => {
    console.log('app is runing at 7003...')
  })

function run_cmd(cmd, args, callback) {
  const spawn = require('child_process').spawn
  const child = spawn(cmd, args)
  let resp = ''
  child.stdout.on('data', buffer => {
    // console.log(buffer)
    resp += buffer.toString()
  })
  child.stdout.on('end', () => {
    console.log('cmd ok')
    callback(resp)
  })
}
run_cmd('sh', ['./auto.sh'], console.log)

const genPromise = () => {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.1) {
      resolve(true)
    } else {
      reject(false)
    }
  })
}
genPromise()
  .catch(res => {
    console.log(res)
    return res + res
  })
  .then(console.log)
