import type { DependencyList } from 'react';
import { useEffect } from 'react';

// useAsyncEffect
// - useEffect 支持异步函数
// - 这里为什么第二个参数必须传 ？
// - 改看这个库 https://github.com/rauldeheer/use-async-effect/blob/master/index.js

function useAsyncEffect(effect, destroy, inputs) {
  var hasDestroy = typeof destroy === 'function';
  // 1
  // 接受参数的情况
  // 1. 一个参数，和useEffect差不多
  // 2. 两个参数，有来两种情况
  //    - 第二个参数是一个函数，表示清除函数，该清除函数是手写的清除函数，和useEffect有区别
  //    - 第二个参数是一个数组，表示的是依赖数组
  // 3. 三个参数的情况
  //    - 第一个副作用函数，第二个清除函数，第三个依赖数组

  useEffect(
    function () {
      var result;

      var mounted = true;
      // mount用来表示是否处于 active 阶段
      // - 组件卸载，重新渲染 mounted 都是false

      var maybePromise = effect(function () {
        return mounted;
      });
      // maybePromise
      // - 执行：这里执行了effect，并传入实参函数，通过返回值来判断是否需要执行后面的副作用函数，具体参照 https://www.npmjs.com/package//use-async-effect
      // - 返回值：因为effect中的异步函数，是有可能有返回值的，所以收集返回值，可以传递给清除函数
      // effect是一个函数，该函数的参数也是一个函数，参数函数的返回值是一个boolean，表示是否处于active阶段，值就是mounted
      // - 组件卸载，重新渲染 mounted 都是false

      Promise.resolve(maybePromise).then(function (value) {
        result = value;
      });

      return function () {
        // 清除函数
        mounted = false;

        if (hasDestroy) {
          destroy(result);
        }
      };
    },
    hasDestroy ? inputs : destroy, // 第二个参数是函数时，依赖数组就是第三个参数，如果第二个参数不是函数，那么可能是一个数组，表示依赖数组，也有可能是undefined表示没有依赖则实时更新
  );
}

// raw function comment
/* function useAsyncEffect(
  effect: () => AsyncGenerator<void, void, void> | Promise<void>, // generator | promise 不需要返回值
  deps: DependencyList,
) {
  function isGenerator(
    val: AsyncGenerator<void, void, void> | Promise<void>,
  ): val is AsyncGenerator<void, void, void> {
    return typeof val[Symbol.asyncIterator] === 'function';
  }
  useEffect(() => {
    const e = effect();
    let cancelled = false;
    async function execute() {
      if (isGenerator(e)) {
        // generator
        while (true) {
          const result = await e.next();
          if (cancelled || result.done) {
            break;
          }
        }
      } else {
        // promise
        await e;
      }
    }
    execute();
    return () => {
      cancelled = true;
    };
  }, deps);
}
 */

export default useAsyncEffect;
