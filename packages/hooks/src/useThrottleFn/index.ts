import throttle from 'lodash/throttle';
import { useMemo } from 'react';
import useLatest from '../useLatest';
import type { ThrottleOptions } from '../useThrottle/throttleOptions';
import useUnmount from '../useUnmount';

type noop = (...args: any) => any;


// 1
// ThrottleOptions
// export interface ThrottleOptions {
//   wait?: number; // 等待时间，单位为毫秒
//   leading?: boolean; // 是否在延迟开始前调用函数，前调用
//   trailing?: boolean; // 是否在延迟开始后调用函数，后调用
// }

// 2
// import type 是最新的导入专门用来导入类型的语法
// import type 解决以下问题：
// - import { MyThing } from './some-module.js';
// - 这个到底是导入的值，还是类型；!!! 如果是类型在编译成js的时候是会被删除的

function useThrottleFn<T extends noop>(fn: T, options?: ThrottleOptions) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error(`useThrottleFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useLatest(fn);
  // useLatest
  // 问题：这里为什么要在赋一次fn给fnRef.current呢 ？
  // 回答：为了解决闭包问题
  // issue：https://github.com/alibaba/hooks/issues/1121

  const wait = options?.wait ?? 1000; // 默认延时 1s

  const throttled = useMemo(
    () =>
      throttle<T>( // 使用了 lodash 的能力
        ((...args: any[]) => {
          return fnRef.current(...args);
        }) as T,
        wait,
        options,
      ),
    [], // 缓存 throttle 函数
  );

  // 组件卸载时，取消未执行的 throttle 函数
  useUnmount(() => {
    throttled.cancel();
  });

  return {
    run: throttled as unknown as T, // 触发 fn 的执行，可传参，run的参数将传递给lodash的throttle，最终传递给fn
    cancel: throttled.cancel, // 取消当前节流
    flush: throttled.flush, // 立即调用
  };
}

export default useThrottleFn;
