const express = require('./lib/express.js')

const app = express()


// 路由也是一种中间件
// 结构为 路径 /  对应是 get 方法和一系列的处理函数
app.get('/', (req, res, next) => {
  console.log('start 1')
  next()
}, (req, res, next) => {
  console.log('start 11')
  next()
}, (req, res, next) => {
  console.log('start 111')
  next()
})

app.get('/', (req, res) => {
  console.log('start 2')
  res.end('<h1>Main</h1>')
})

app.get('/hello', (req, res) => {
  res.end('hello')
})

app.listen(3000, () => {
  console.log('server starts at 3000')
})