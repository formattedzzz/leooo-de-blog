/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-extraneous-dependencies */
// const minimatch = require('minimatch')

// console.log(minimatch('bar.foo', '*.foo')) // true!
// console.log(minimatch('bar.foo', '*.bar')) // false!
// console.log(minimatch('bar.foo', '*.+(bar|foo)', { debug: true })) // true, and noisy!
const glob = require('glob')
glob('src/**/index.md', {}, (err, files) => {
  console.log(err, files)
})
const tool = require('util')
const obj = {}
console.log(tool.isPrimitive(true))
console.log(tool.isPrimitive(obj))
