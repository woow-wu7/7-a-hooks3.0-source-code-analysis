import { useEffect } from 'react';

const useMount = (fn: () => void) => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error(`useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`);
    }
  }

  // 空数组 Effect只执行一次，并且只在组件渲染完成后执行一次
  useEffect(() => {
    fn?.();
  }, []);
};

export default useMount;
