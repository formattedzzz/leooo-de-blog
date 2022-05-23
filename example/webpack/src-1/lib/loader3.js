module.exports = function (code) {
  console.log('loader3')
  return code
}

module.exports.pitch = function () {
  console.log('pitch3', arguments)
}
