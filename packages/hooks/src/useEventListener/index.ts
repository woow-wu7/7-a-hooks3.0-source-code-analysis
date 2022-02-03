import useLatest from '../useLatest';
import type { BasicTarget } from '../utils/domTarget';
import { getTargetElement } from '../utils/domTarget';
import useEffectWithTarget from '../utils/useEffectWithTarget';

type noop = (...p: any) => void;

export type Target = BasicTarget<HTMLElement | Element | Window | Document>;

type Options<T extends Target = Target> = {
  target?: T;
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
};

// 1
// keyof 索引类型查询操作符
// - keyof T 返回T上已知的公共属性名的联合
// - 例子
//    - interface Person { name: string; age: number; }
//    - keyof Person ----> 'name' | 'age'

// 2
// extends 是为了做反省约束，降低 K 的范围
function useEventListener<K extends keyof HTMLElementEventMap>( // 这些函数重载主要是对 eventName 做不同的约束
  eventName: K,
  handler: (ev: HTMLElementEventMap[K]) => void,
  options?: Options<HTMLElement>,
): void;
function useEventListener<K extends keyof ElementEventMap>(
  eventName: K,
  handler: (ev: ElementEventMap[K]) => void,
  options?: Options<Element>,
): void;
function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (ev: DocumentEventMap[K]) => void,
  options?: Options<Document>,
): void;
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (ev: WindowEventMap[K]) => void,
  options?: Options<Window>,
): void;
function useEventListener(eventName: string, handler: noop, options: Options): void;


// useEventListener
// - 参数
//    - eventName 事件名称 string
//    - handler 事件监听函数 (ev: Event) => void
//    - options
//      - target ----> 目标 DOM 节点或者 ref
//      - capture ---> 是否在捕获阶段触发
//      - once ------> 是否只触发一次
//      - passive
//        - 设置为 true 时，表示 listener 永远不会调用 preventDefault()
//        - 报错信息：Unable to preventDefault inside passive event listener invocation
//        - passive：是消极的意思
function useEventListener(eventName: string, handler: noop, options: Options = {}) {

  const handlerRef = useLatest(handler);
  // 1
  // useLatest
  // - const ref = useRef(value);
  // - ref.current = value; // 再次赋值，解决闭包问题

  useEffectWithTarget(
    () => {
      const targetElement = getTargetElement(options.target, window); // 获取目标节点DOM，不存在使用 window
      if (!targetElement?.addEventListener) { // 不支持 addEventListener
        return;
      }

      const eventListener = (event: Event) => {
        return handlerRef.current(event);
      };

      // 绑定事件监听
      targetElement.addEventListener(eventName, eventListener, {
        capture: options.capture,
        once: options.once,
        passive: options.passive,
      });

      // 清除事件监听
      return () => {
        targetElement.removeEventListener(eventName, eventListener, {
          capture: options.capture,
          // 注意：
          // - 如果清除事件监听函数，addEventListener 和 removeEventListener 三个参数必须一样
          // - 其中如果最后一个参数
          //    - 是一个boolean时，必须一样
          //    - 是一个对象时，则只需要 capture 属性一样即可
        });
      };
    },
    [eventName, options.capture, options.once, options.passive], // 依赖数组：事件名 和 配置对象中的属性
    options.target, // 目标节点
  );
}

export default useEventListener;
