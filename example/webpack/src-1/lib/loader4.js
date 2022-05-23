module.exports = function (code) {
  console.log('loader4')
  return code
}

module.exports.pitch = function () {
  console.log('pitch4', arguments)
}
