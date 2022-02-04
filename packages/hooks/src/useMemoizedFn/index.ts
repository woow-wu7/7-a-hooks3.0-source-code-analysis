import { useMemo, useRef } from 'react';

type noop = (...args: any[]) => any;


// useMemoizedFn
// - 作用：持久化 function


function useMemoizedFn<T extends noop>(fn: T) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') { // 必须是函数
      console.error(`useMemoizedFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useRef<T>(fn);

  // why not write `fnRef.current = fn`?
  // - https://github.com/alibaba/hooks/issues/728
  // - usePersistFn不能兼容react devtool，所以这里重写了 usePersistFn，并改名 useMemoizedFn

  fnRef.current = useMemo(() => fn, [fn]);
  // 缓存fn，仅仅在fn改变时重新缓存，但这里fn时时都是新的引用，Object.is()比对是false，所以基本上就相当于 fnRef.current = fn

  const memoizedFn = useRef<T>();
  if (!memoizedFn.current) {
    memoizedFn.current = function (...args) { // 包装一层，用来传参
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      return fnRef.current.apply(this, args);
    } as T;
  }

  return memoizedFn.current;
}

export default useMemoizedFn;
