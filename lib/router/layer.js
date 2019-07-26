class Layer {
  constructor(path, handler) {
    this.path = path
    this.handler = handler
  }

  // 做路径匹配的方法
  match(pathname) {
    return this.path === pathname
  }

  handleRequest(req, res, next) {
    // todo
    this.handler(req, res, next)
  }
}

module.exports = Layer