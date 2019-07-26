/**
 * Router 类, 就是整个路由系统
 */

const Route = require('./route.js')
const Layer = require('./layer.js')
const url = require('url')

class Router {
  constructor() {
    this.stack = []
  }

  // 创造一个一个 layer, 每个 layer 需要有一个 route 属性
  // 还要将 get 方法中的 handler 处理函数传入到 route 中存起来
  get(path, handlers) {
    const route = this.route(path)
    // 把 handler 传递给 route 自身去处理
    route.get(handlers)
  }

  handle(req, res, out) {
    // 请求到来的时候执行此方法
    const { pathname } = url.parse(req.url)
    let index = 0
    const next = () => {
      if (index >= this.stack.length) {
        return out()
      }

      const layer = this.stack[index++]
      if (layer.match(pathname)) {
        // 判断当前的 layer 是否匹配到当前的请求路径
        // 若匹配, 调用 layer 的 handle 方法
        // route.dispatch
        layer.handleRequest(req, res, next)
      } else {
        next()
      }
    }
    next()
  }

  // 创建 route 和 layer 的关系
  route(path) {
    const route = new Route()
    // 如果 layer 的路径匹配到了, dispatch 方法可以将之转交给 route 里面的 handler 处理
    const layer = new Layer(path, route.dispatch.bind(route))
    // 把 route 放到 layer 上
    layer.route = route
    // 把 layer 放到 stack 数组中
    this.stack.push(layer)
    return route
  }
}

 module.exports = Router