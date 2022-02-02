import { useRef } from 'react';
import type { useEffect, useLayoutEffect } from 'react';

type effectHookType = typeof useEffect | typeof useLayoutEffect; // 支持两种 hook

export const createUpdateEffect: (hook: effectHookType) => effectHookType =
  (hook) => (effect, deps) => {
    const isMounted = useRef(false);

    // 1
    // useEffect 清除函数执行的时机
    // - 当useEffect的第二个参数依赖数组，是空数组时 -----> 回调函数即清除函数，只会在组件卸载的时执行
    // - 当useEffect的第二个参数不传时，----------------> 回调函数即清除函数， 1.mount时不执行； 2.update时会执行，在执行下一次副作用前，清除上一次的副作用
    // - 当useEffect的第二个参数存在，且不是空数组时 -----> useEffect在依赖变化时执行，回调函数同样在mount时不执行

    // 2
    // useEffect 执行的时机
    // - 每轮组件渲染完成后执行

    // 3
    // useEffect 依赖数组的依赖项比较的原则 -> Object.is
    // - Object.is(v1, v2)
    //    - Object.is(NaN, NaN) --------> true
    //    - Object.is(+0, -0) ----------> false
    // - ===
    //    - NaN === NaN ----------------> false
    //    - +0 === -0 ------------------> true

    // 4
    // for react-refresh
    // 注意：该 useEffect 的依赖数组是一个空数组，所以清除函数只会在 组件卸载的时候执行一次
    // 因为：这里卸载的时候恢复初始状态，但是从新加载的时 useRef 也会从新初始化，所以这里感觉仅仅是为了保险起见，添加的逻辑
    // 所以：不要这个清除的逻辑个人感觉也是可以的，2.0的时，就没有这段逻辑
    // 测试：https://codesandbox.io/s/great-northcutt-wpgg8?file=/src/App.js
    hook(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);


    hook(() => {
      if (!isMounted.current) {
        isMounted.current = true;
      } else {
        return effect();
      }
    }, deps);
  };
