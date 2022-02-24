# a-hooks3.0 源码分析

### (一) 任务清单 - 完成度

- [x] useMount 只在组件初始化时执行
- [x] useUnmount 只在组件卸载时执行
- [x] useUnmountRef 组件是否已经卸载
- [x] useUpdate 强制更新组件
- [x] useUpdateEffect 忽略首次渲染时的执行，只在依赖更新时执行，参数和返回值类型和 useEffect 一样
- [x] useClickAway 监听目标元素外的事件
- [x] useLockFn 用于给一个异步函数增加竞态锁，防止并发执行；原理同 useThrottleFn，应付异步情况
- [x] useThrottleFn 截流函数
- [x] useThrottleEffect 为 useEffect 增加节流的能力 - 很精妙
- [x] useThrottle 为 一个值 添加截流能力，和 useThrottleEffect 的实现差不多，可以叫做 useThrottleValue
- [x] useToggle 取反，支持 0，1，2 个参数的取反
- [x] useBoolean 利用 useToggle 很容易实现
- [x] useEventListener 优雅的使用 addEventListener
- [x] useTitle 设置页面标题
- [x] useMemoizedFn 持久化 function，相当于 2.0 时的 usePersistFn
- [x] useSet 和 useMap
- [x] useAsyncEffect

### (二) 其他源码分析

#### (1) redux 和 react-redux 源码分析 [redux^4.0.5]

- [redux 源码分析-仓库](https://github.com/woow-wu7/7-react-admin-ts/tree/master/src/SOURCE-CODE-ANALYSIS/REDUX)
- [redux 源码分析-我的掘金博客](https://juejin.cn/post/6844904137952329742)

#### (2) 手写 webpack Compiler 源码 [webpack^4.42.0]

- [手写 Compiler 源码-仓库](https://github.com/woow-wu7/7-compiler)
- [手写 Compiler 源码-我的掘金文章](https://juejin.cn/post/6844903973002936327)

#### (3) axios 源码分析 [axios^0.20.0]

- [axios 源码分析-仓库](https://github.com/woow-wu7/7-react-admin-ts/tree/master/src/SOURCE-CODE-ANALYSIS/AXIOS)
- [axios 源码分析-我的掘金文章](https://juejin.cn/post/6844904147532120072)
- [cancel 取消请求的原理，interceptor 拦截器的原理 - 两个重点掌握](https://github.com/woow-wu7/7-react-admin-ts/tree/master/src/pages/admin-system/interview-cancel/index.tsx)

#### (4) vue 源码分析 [vue^2.6.12]

- [vue 源码分析-仓库](https://github.com/woow-wu7/7-react-admin-ts/tree/master/src/SOURCE-CODE-ANALYSIS/VUE)
- [vue 源码分析-新建仓库](https://github.com/woow-wu7/7-vue2-source-code-analysis)
- [vue 源码分析-我的掘金文章](https://juejin.cn/post/6844904181094957069)

#### (5) vuex 源码分析 [v2.6.10]

- [vuex 源码分析-我的掘金文章](https://juejin.cn/post/6844904166293241863)

#### (6) react 源码分析 [react^17.0.3]

- [react 源码分析-仓库](https://github.com/woow-wu7/7-react-source-code-analysis)
- [react 源码分析-我的掘金文章](https://juejin.cn/post/6993980489463758855)
- [js 实现单向链表 - 源码](https://github.com/woow-wu7/7-react-source-code-analysis/blob/main/src/manual/linked-list.js)
- [手写 hook 调度-useState 实现 - 源码仓库](https://github.com/woow-wu7/7-react-source-code-analysis/blob/main/src/manual/hooks-manual.js)
- [手写 hook 调度-useState 实现 - 思维导图](https://github.com/woow-wu7/7-react-source-code-analysis/blob/main/src/images/hook-useState.png)

#### (7) a-hooks2.0 源码分析 [a-hooks^2.10.9]

- [a-hooks 源码分析 - 仓库](https://github.com/woow-wu7/7-a-hooks-source-code-analysis)

#### (8) a-hooks3.0 源码分析 [a-hooks^2.10.9]

- [a-hooks 源码分析 - 仓库](https://github.com/woow-wu7/7-a-hooks3.0-source-code-analysis)

#### (9) koa 源码分析 [koa^2.13.1]

- [koa 源码分析 - 仓库](https://github.com/woow-wu7/7-koa-source-code-analysis)
- [koa 源码调试 - 仓库](https://github.com/woow-wu7/7-koa-source-code-analysis)
- 注意分析：( axios 拦截器 + redux 中间件 + koa 中间件 ) 三者的相同点和区别

#### (10) badJs-report 源码分析

- [badJs-report 源码分析-仓库](https://github.com/woow-wu7/7-badjs-report-analysis)

#### (11) element-ui 源码分析

- [element-ui 源码分析-仓库](https://github.com/woow-wu7/8-element-source-code-analysis)
