import { useCallback, useState } from 'react';

// useUpdate
// - 返回一个函数，调用该函数会强制组件重新渲染
const useUpdate = () => {
  const [, setState] = useState({});

  return useCallback(() => setState({}), []);
  // 1
  // useCallback
  // - 返回参数参数的 memoized 版本，参数函数只会在依赖项发生变化时更新
  // - 这里以来数组是一个空数组，表示参数函数不会更新，即缓存了参数函数

  // 2
  // useState
  // 每次参数都传入一个 新的对象，参数变化会触发重新渲染
};

export default useUpdate;
