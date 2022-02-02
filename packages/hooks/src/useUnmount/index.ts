import { useEffect } from 'react';
import useLatest from '../useLatest';

const useUnmount = (fn: () => void) => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error(`useUnmount expected parameter is a function, got ${typeof fn}`);
    }
  }

  // 1
  // useLatest
  // - 返回当前最新值，用来解决闭包问题

  // 2
  // 问题：如何解决在 setInterval 更新 state 得不到最新的 state ?
  // 回答：
  //    - 1. 通过 useState 的参数函数方式 ----> useState(newValue + 1) 改为 useState((prev) => prev + 1)
  //    - 2. 通过 useRef 来固定 state
  // 例子
  // - 2.1
  // const Roster: React.FC<RosterProps> = () => {
  //   let [count, setCount] = useState(0);
  //   useEffect(() => {
  //     setInterval(() => setCount(count + 1), 1000); // ---------------> 这里只会执行一次后，就不再执行，count的值从0变为1后不再变化
  //   }, []);
  //   console.log('count :>> ', count);
  //   return <div>{count}</div>;
  // };
  // - 2.2
  // - 通过 useState(newValue + 1) 改为 useState((prev) => prev + 1) 解决闭包问题
  // const Roster: React.FC<RosterProps> = () => {
  //   let [count, setCount] = useState(0);
  //   useEffect(() => {
  //     setInterval(() => setCount(perv => prev + 1), 1000); // ---------------> 回一直执行下去，并且count的值每次都会 + 1
  //   }, []);
  //   console.log('count :>> ', count);
  //   return <div>{count}</div>;
  // };
  // - 2.3
  // - 通过 useRef 来解决闭包问题
  // const Roster: React.FC<RosterProps> = () => {
  //   let [count, setCount] = useState(0);
  //   const refCount = useRef(count);
  //   useEffect(() => {
  //     setInterval(() => {
  //       refCount.current = refCount.current + 1; // 利用ref来更新state
  //       setCount(refCount.current);
  //     }, 1000);
  //   }, []);
  //   console.log('count :>> ', count);
  //   return <div>{count}</div>;
  // };
  const fnRef = useLatest(fn);


  // useEffect 清除函数
  useEffect(
    () => () => {
      fnRef.current();
    },
    [], // 注意这里依赖数组一定要是空数组
  );
};

export default useUnmount;
