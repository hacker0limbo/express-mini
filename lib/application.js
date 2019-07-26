/**
 * 用于创建应用
 */

const http = require('http')
const url = require('url')
const Router = require('./router/index.js')

// Application 为 express 整个的应用系统
class Application {
  constructor() {
    // 路由系统, 放置所有的路由
    this._router = new Router()
  }

  get(path, ...handlers) {
    // 相当于在路由的 get 方法中将 path 和 handler push 进去
    this._router.get(path, handlers)
  }

  listen() {
    const server = http.createServer((req, res) => {
      // 开启服务器以后需要拿到当前的请求路径
      // 如果路由系统中处理不了这个请求, 调用 done 方法
      const done = () => {
        res.end(`cannot ${req.url} ${req.method}`)
      }
      this._router.handle(req, res, done)
    })
    server.listen(...arguments)
  }
}

module.exports = Application

