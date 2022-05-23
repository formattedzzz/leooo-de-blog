module.exports = function (code) {
  console.log('loader1', arguments)
  const [title, content] = code.split(/\n/)
  return `export default ${JSON.stringify({ title, content })}`
}

module.exports.pitch = function () {
  console.log('pitch1', arguments)
}
