import { useMemo, useState } from 'react';

export interface Actions<T> {
  setLeft: () => void; // 设置为左边的参数值
  setRight: () => void; // 设置为右边参数的值
  set: (value: T) => void; // set
  toggle: () => void; // 切换
}

// useToggle
// 1. 没有参数时 -----> boolean之间切换，初始默认值 false
// 2. 只有一个参数 --> 并且是boolean值时 ----> boolean之间切换
// 3. 只有一个参数 --> 并且不是boolean值时 --> 参数值 和 false 之间切换
// 4. 两个参数 -----> 两个参数值之间切换 -----> 初始值是左边的参数

function useToggle<T = boolean>(): [boolean, Actions<T>]; // 没有参数

function useToggle<T>(defaultValue: T): [T, Actions<T>]; // 一个参数

function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Actions<T | U>]; // 两个参数

function useToggle<D, R>(defaultValue: D = false as unknown as D, reverseValue?: R) { // 最宽泛
  const [state, setState] = useState<D | R>(defaultValue); // 这里不做参数的处理，而是在actions中去处理

  // useMemo 缓存了一个 Actions 类型的对象
  const actions = useMemo(() => {
    // reverseValueOrigin
    // 1. 第二个参数不存在，把第一个参数取反(第一个参数不存在时即为undefined取反)
    // 2. 第二个参数存在，使用第二个参数
    const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R;

    const toggle = () => setState((s) => (s === defaultValue ? reverseValueOrigin : defaultValue));
    const set = (value: D | R) => setState(value);
    const setLeft = () => setState(defaultValue);
    const setRight = () => setState(reverseValueOrigin);

    return {
      toggle,
      set,
      setLeft,
      setRight,
    };
    // useToggle ignore value change
    // }, [defaultValue, reverseValue]);
  }, []);

  return [state, actions];
}

export default useToggle;
