const Layer = require('./layer.js')

class Route {
  constructor() {
    this.stack = []
  }

  get(handlers) {
    handlers.forEach(handler => {
    // 给 route 中添加层, 这个层中需要存放方法和 handler
    // 路径随便传
    const layer = new Layer('/', handler)
    // 传入方法
    layer.method = 'get'
    this.stack.push(layer)

    })
  }

  dispatch(req, res, out) {
    // 匹配 method
    let index = 0
    // 次 next 方法是用户调用的 next
    // 如果调用 next 会执行内层中的 next 方法
    // 如果没有回调用外层的 next 方法
    const next = () => {
      if (index >= this.stack.length) {
        return out()
      }

      const layer = this.stack[index++]
      // 如果当前 route 中的 layer 的方法匹配到了
      // 执行 layer 上的 handler
      if (layer.method === req.method.toLowerCase()) {
        layer.handleRequest(req, res, next)
      } else {
        next()
      }
    }
    next()
  }
}

module.exports = Route