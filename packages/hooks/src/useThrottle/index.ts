import { useEffect, useState } from 'react';
import useThrottleFn from '../useThrottleFn';
import type { ThrottleOptions } from './throttleOptions';


// 1
// ThrottleOptions
// export interface ThrottleOptions {
//   wait?: number;
//   leading?: boolean;
//   trailing?: boolean;
// }

// 和 useThrottleEffect 的实现类似
function useThrottle<T>(value: T, options?: ThrottleOptions) {
  const [throttled, setThrottled] = useState(value);

  const { run } = useThrottleFn(() => { // 低频
    setThrottled(value);
  }, options);

  useEffect(() => { // - 高频
    run();
  }, [value]);

  return throttled;
}

export default useThrottle;
