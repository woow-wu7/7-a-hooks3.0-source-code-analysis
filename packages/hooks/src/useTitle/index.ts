import { useEffect, useRef } from 'react';
import useUnmount from '../useUnmount';
import isBrowser from '../utils/isBrowser';

export interface Options {
  restoreOnUnmount?: boolean;
}

const DEFAULT_OPTIONS: Options = {
  restoreOnUnmount: false,
};


// useTitle
// - 用来设置页面的标题

// 1
// isBrowser
// const isBrowser = !!(
//   typeof window !== 'undefined' &&
//   window.document &&
//   window.document.createElement
// );

function useTitle(title: string, options: Options = DEFAULT_OPTIONS) {

  const titleRef = useRef(isBrowser ? document.title : '');
  // document.title --> 可读写，返回 ( 当前文档的标题 )，一旦被修改就 ( 返回修改后的值 )

  useEffect(() => {
    document.title = title; // 最新值
  }, [title]);

  useUnmount(() => {
    if (options.restoreOnUnmount) {
      document.title = titleRef.current; // 卸载时重置，组件卸载时，是否恢复上一个页面标题
    }
  });
}

export default useTitle;
