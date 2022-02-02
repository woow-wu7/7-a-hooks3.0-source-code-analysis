import { useEffect, useState } from 'react';
import type { DependencyList, EffectCallback } from 'react';
import type { ThrottleOptions } from '../useThrottle/throttleOptions';
import useThrottleFn from '../useThrottleFn';
import useUnmount from '../useUnmount';
import useUpdateEffect from '../useUpdateEffect';


// useThrottleEffect
// 注意执行顺序 1234
// - 1. useThrottleEffect的依赖项变化，触发useEffect
// - 2. useEffect更新，触发run，run触发throttle，-------- 此过程降低了频率
// - 3. throttle函数触发setFlag，改变flag
// - 4. flag变化，触发 useUpdateEffect，执行 effect

function useThrottleEffect(
  effect: EffectCallback, // fn，副作用函数
  deps?: DependencyList, // 依赖数组
  options?: ThrottleOptions, // 配置项
) {

  const [flag, setFlag] = useState({}); // --------------- 3. 该 useState 用来触发重渲染(即强制更新)，重渲染从而触发useUpdateEffect
  const { run, cancel } = useThrottleFn(() => { // ------- 2. 该 useThrottleFn 用来降低重渲染的频率
    setFlag({});
  }, options);


  // useEffect
  // - 因为：依赖项变化，触发useThrottleFn
  // - 所以：useEffect的频率 快于 setFlag，而setFlag又会触发组件更新，组件更新又会触发useUpdateEffect
  // - 最终：useEffect
  useEffect(() => { // ----------------------------------- 1. useThrottleEffect依赖变化，触发 useEffect
    return run();
  }, deps);

  useUnmount(cancel); // 卸载取消执行

  useUpdateEffect(effect, [flag]); // -------------------- 4. flag更新，触发 useUpdateEffect
}

export default useThrottleEffect;
