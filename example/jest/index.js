exports.add = function (a, b) {
  return a + b
}

exports.throwError = function() {
  throw new Error('leooo has error, help!')
}

exports.fetchData = function (cb) {
  Promise.resolve({ name: 'pop' }).then(res => {
    console.log(res)
    cb(res)
  })
}

exports.fetchResolved = function () {
  return Promise.resolve({ name: 'leooo', age: 23 })
}

exports.fetchCatched = function () {
  return Promise.reject({ message: 'error' })
}
