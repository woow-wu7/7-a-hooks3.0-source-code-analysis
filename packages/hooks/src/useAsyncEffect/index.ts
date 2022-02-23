import type { DependencyList } from 'react';
import { useEffect } from 'react';

// useAsyncEffect
// - useEffect 支持异步函数
function useAsyncEffect(
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

export default useAsyncEffect;
