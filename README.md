# express-mini

学习仿写的一个迷你版 express 框架, 目前支持`GET`方法和中间件

## 文件目录

```
examples/
  server.js
lib/
  express.js
  application.js
  router/
    index.js
    layer.js
    route.js
index.js
```

## 使用

更多使用查看: [examples](examples/server.js)

### 基本使用

安装:
```
npm install express-mini
```

```javascript
const express = require('express-mini')
const app = express()

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
```
