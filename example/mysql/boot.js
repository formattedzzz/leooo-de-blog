const express = require('express')
const app = new express()
app.get('/', (req, res, next) => {
  res.json({
    code: 20000,
    message: 'success'
  })
})
app.listen(7003, () => {
  console.log('app is running at localhost:7003')
})
