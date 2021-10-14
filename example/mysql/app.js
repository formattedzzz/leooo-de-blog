const express = require('express')
const app = new express()
const mysql = require('mysql2')

const ECS_CHENLEI = {
  host: '47.103.49.102',
  user: 'root',
  port: 3306,
  database: 'miaov',
  password: 'lfl730811'
}
const ECS_ALIYUN = {
  host: 'rm-bp1czao71834c7luuvo.mysql.rds.aliyuncs.com',
  user: 'formattedzzz',
  port: 3306,
  database: 'leooo',
  password: '@rz730811'
}

const ECS_BENDI = {
  host: 'localhost',
  user: 'root',
  port: 3307,
  database: 'leekbox',
  password: 'lfl730811'
}

// const connection = mysql.createConnection(ECS_CHENLEI)
// const connection = mysql.createConnection(ECS_ALIYUN)
const connection = mysql.createConnection(ECS_BENDI)

connection.query('select * from `leekbox`.`table1`;', function (err, results, fields) {
  if (err) {
    console.log(err)
    return
  }
  console.log(results)
})

// constraint
// connection.query(
//   "SELECT * , u.id uid from `baoer-comment` o left join `baoer-user` u on o.uid = u.id where o.content REGEXP '福林';",
//   function (err, results, fields) {
//     if (err) {
//       console.log(err)
//       return
//     }
//     console.log(results)
//   }
// )

// connection.beginTransaction()

// app.get('/api/gender', (req, res, next) => {
//   connection.query(
//     `SELECT  c.id 
//         ,c.user_id AS user_id 
//         ,c.root_id 
//         ,c.reply_id 
//         ,u.name 
//         ,c.content 
//         ,c.create_at
//     FROM \`baoer-comment\` c
//     JOIN \`baoer-user\` u
//     WHERE c.user_id = u.id;`,
//     function (err, results, fields) {
//       if (err) {
//         console.log(err)
//         return
//       }
//       console.log(results)
//       res.json(results)
//     }
//   )
// })
app.listen(7003, () => {
  console.log('app is running at localhost:7003')
})
