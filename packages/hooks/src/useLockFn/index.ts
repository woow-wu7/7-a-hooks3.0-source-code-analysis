import { useRef, useCallback } from 'react';

// 1
// useLockFn
// - 作用：用于给一个异步函数增加竞态锁，防止并发执行
// - 原理：类似 throttle 函数的原理，只不过处理异步的情况
// - 参数：需要增加竞态锁的函数
// - 返回值：增加了竞态锁的函数

// 2
// useCallback
// - 函数签名：useCallback(() => fn, [])
// - 参数
//    - 第一个参数：() => fn 是内联回调函数
//    - 第二个参数：[] 是依赖数组
// - 返回值
//    - 返回该 ( 内联回调函数 ) 的 memoized 版本
//    - 该 ( 回调函数 ) 仅在 ( 某个依赖项 ) 改变时才会更新
// - 注意点
//    - useCallback(fn, deps) === useMemo(() => fn, deps)

// 3
// 泛型函数的两种写法
// 1. function a<T>(params: T) {...}
// 2. const a = <T>(params: T) => {....}

// 4
// 泛型约束
// p extends any[] ---> 将p的any类型约束成 any[] ---> 这样就可以用p来指代any[]

// 5
// extends
// - 1.在 class 和 interface 中表示继承
// - 2.在泛型中表示 泛型约束，用来缩小类型变量的范围

// 6
// 例子：支持传参
// const getData = (e: any, value: any) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('1 :>> ', 1);
//     }, 4000);
//   });
// };
// const lockGetData = useLockFn(getData);
// <Button onClick={(e) => lockGetData(e, '3333')}>请求</Button> // lockGetData()执行返回的函数的参数将传递给 useLockFn 的参数函数 getData

function useLockFn<P extends any[] = any[], V extends any = any>(fn: (...args: P) => Promise<V>) { // 参数函数：参数是any[]，返回值是any类型的promise
  const lockRef = useRef(false); // 未锁

  return useCallback(
    async (...args: P) => {
      if (lockRef.current) return; // true则中断执行 - 锁
      lockRef.current = true;

      try {
        const ret = await fn(...args);
        lockRef.current = false;
        return ret;
      } catch (e) {
        lockRef.current = false;
        throw e;
      }
    },
    [fn], // 这里直接将 fn 作为依赖传入 useCallback，则每次都会更新
  );
}

export default useLockFn;
