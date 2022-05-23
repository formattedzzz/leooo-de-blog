module.exports = function (code) {
  console.log('loader2')
  return code
}

module.exports.pitch = function () {
  console.log('pitch2', arguments)
}
