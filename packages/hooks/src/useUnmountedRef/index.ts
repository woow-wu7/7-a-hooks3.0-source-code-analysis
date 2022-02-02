import { useEffect, useRef } from 'react';

const useUnmountedRef = () => {
  const unmountedRef = useRef(false);
  useEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true; // 卸载
    };
  }, []);
  return unmountedRef; // 返回
};

export default useUnmountedRef;
