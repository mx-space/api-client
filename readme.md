# MApi Client

这是一个适用于 MServer v3 的 JS SDK, 封装了常用接口请求方法以及返回类型的声明, 以快速开发前端应用.

## 如何使用

此 SDK 设计之初不捆绑任何第三方网络请求库, 同时也不使用任何请求方法. 使用适配器设计模式实现, 你需要手动传入符合接口标准的适配器.

如项目中使用 axios 作为默认请求库, 你可以将 axios 实例作为适配器.

```ts
import axios from 'axios'
import {
  AggregateController,
  CategoryController,
  createClient,
  NoteController,
  PostController,
  allControllers,
  // ...
} from '@mx-space/api-client'
const $http = axios.create()

// you can do anything else on `$http`
// interceptor or re-configure
const endpoint = 'https://api.innei.dev/v2'
const client = createClient($http)(endpoint)

// inject controller first.
client.injectControllers([
  PostController,
  NoteController,
  AggregateController,
  CategoryController,
])

// or you can inject allControllers
client.injectControllers(allControllers)

// then you can request `post` `note` and `aggregate` controller

client.post.post.getList(page, 10, { year }).then((data) => {
  // do anything
})
```

**为什么要手动注入控制器**

按需加载, 可以减少打包体积 (Tree Shake)

**为什么不依赖请求库**

可以防止项目中出现两个请求库, 减少打包体积

**如果不使用 axios, 应该如何编写适配器**

