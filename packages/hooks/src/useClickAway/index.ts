import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';

// 1
// useClickAway
// - 官网说明：https://ahooks.js.org/zh-CN/hooks/use-click-away

// 2
// getTargetElement
// export function getTargetElement<T extends TargetType>(target: BasicTarget<T>, defaultElement?: T) {
//   // 非浏览器环境
//   if (!isBrowser) {
//     return undefined;
//   }
//   // target 不存在，看是否提供了默认值defaultElement，没有提供返回undefined，提供返回该元素，HTMLElement | Element | Window | Document
//   if (!target) {
//     return defaultElement;
//   }
//   let targetElement: TargetValue<T>;
//   if (typeof target === 'function') { // 函数
//     targetElement = target();
//   } else if ('current' in target) { // ref，这里通过 in 缩小范围
//     targetElement = target.current;
//   } else {
//     targetElement = target; // HTMLElement | Element | Window | Document
//   }
//   return targetElement;
// }

// 2
// Node.contains
// - node.contains( otherNode )
// - 返回的是一个布尔值，来表示 ( 传入的节点otherNode ) 是否为 ( node节点 ) 的后代节点

export default function useClickAway<T extends Event = Event>(
  onClickAway: (event: T) => void,
  target: BasicTarget | BasicTarget[],
  eventName: string | string[] = 'click',
) {
  const onClickAwayRef = useLatest(onClickAway); // 缓存 onClickAway，ref化

  useEffectWithTarget(
    () => {
      const handler = (event: any) => {
        const targets = Array.isArray(target) ? target : [target]; // ------------------------ 支持多个DOM元素，所以将单个或多个DOM都包装成数组
        // 如果1或2成立，直接返回，不继续往下执行onClickAway
        // 1. targetElement不存在
        // 2. 或者 点击的元素event.target是targetElement的后代节点
        if (
          targets.some((item) => {
            const targetElement = getTargetElement(item);
            return !targetElement || targetElement?.contains(event.target);
          })
        ) {
          return;
        }
        // 不是后代节点，往下执行
        onClickAwayRef.current(event);
      };

      const eventNames = Array.isArray(eventName) ? eventName : [eventName]; // ------------- 支持多个事件

      eventNames.forEach((event) => document.addEventListener(event, handler)); // 绑定多个事件

      return () => {
        eventNames.forEach((event) => document.removeEventListener(event, handler)); // 清除事件监听
      };
    },
    Array.isArray(eventName) ? eventName : [eventName],
    target,
  );
}
