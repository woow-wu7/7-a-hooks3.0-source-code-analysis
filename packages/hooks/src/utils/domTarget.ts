import type { MutableRefObject } from 'react';
import isBrowser from './isBrowser';

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>;

export function getTargetElement<T extends TargetType>(target: BasicTarget<T>, defaultElement?: T) {
  // 非浏览器环境
  if (!isBrowser) {
    return undefined;
  }

  // target 不存在，看是否提供了默认值defaultElement，没有提供返回undefined，提供返回该元素，HTMLElement | Element | Window | Document
  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetValue<T>;

  if (typeof target === 'function') { // 函数
    targetElement = target();
  } else if ('current' in target) { // ref，这里通过 in 缩小范围
    targetElement = target.current;
  } else {
    targetElement = target; // HTMLElement | Element | Window | Document
  }

  return targetElement;
}
