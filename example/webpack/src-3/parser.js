const parser = require('@babel/parser')
const code = `
const a = require('./a.js');
a.log();
`
const res = parser.parse(code, {
  sourceType: 'module'
})
console.log(JSON.stringify(res, null, 2))
