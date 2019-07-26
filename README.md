# express-mini
学习仿写的一个 express 框架

## 思路

根据`express`示例, 进行仿写

第一版:
- 需要创建一个`app`示例, 该实例是一个由一个函数返回. app 实例里面可以有相应的方法, 例如`get`, `listen`
- 使用一个数组维护路由, 每一个路由元素是一个对象, 包含路径, 方法, 处理函数, 该数组有一个默认的路由元素对象用于处理不存在的情况
- 当调用`app.get()`的时候, 将一个对象加入到这个路由数组中
- 调用`app.listen()`方法的时候, 监听请求的路径和方法, 对路由数组进行遍历, 如果路径和方法都匹配成功, 执行处理函数, 并停止匹配, 知道最后没有匹配执行默认路由对象的处理函数

第二版:
将路由(router)从`Application`里面拆分出来, 路由里面主要还是维护一个数组(stack), 数组里面每一个元素叫作`layer`, `layer`里面存放了路径, 和一个`route`对象, 该对象也维护一个数组, 数组里面同样维护一系列的 layer, 每一个 layer 存放里路径和处理函数

```javascript
Router
  stack = [] // 存放 layer
  Layer
    path handler // handler 传递给 route 里面
  Route
    stack = [] // 存放 layer
    Layer
      method handler
```