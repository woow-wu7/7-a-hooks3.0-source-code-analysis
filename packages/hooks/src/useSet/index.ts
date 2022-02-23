import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

// useSet

// Set
// 1 概念
// - Set 类似数组，但是成员的值是唯一的，没有重复的值
// - Set 本身是一个构造函数，用来生成set数据结构
// 2 参数
// - 参数可以接受一个数组，或者具有 iterable 接口的数据结构
// 3 属性
// - 操作方法
//  - add
//  - delete
//  - has
//  - clear
// - 遍历方法
//  - keys
//  - values
//  - entries
//  - forEach

// 4 转换
// - Set 很容器通过 Array.from(Set) 和 [...Set] 来转换

function useSet<K>(initialValue?: Iterable<K>) {
  const getInitValue = () => {
    return initialValue === undefined ? new Set<K>() : new Set(initialValue);
  };

  const [set, setSet] = useState<Set<K>>(() => getInitValue());

  const add = (key: K) => {
    if (set.has(key)) {
      return;
    }
    setSet((prevSet) => {
      const temp = new Set(prevSet);
      // 注意：当 new Set() 的参数是 set 实例的时候，返回值就是参数实例；Map同理
      // set.add 添加某个值，返回 Set 结构本身
      temp.add(key);
      return temp;
    });
  };

  const remove = (key: K) => {
    if (!set.has(key)) {
      return;
    }
    setSet((prevSet) => {
      const temp = new Set(prevSet);
      // set.delete 删除某个值，返回一个boolean值，表示是否删除成功
      temp.delete(key);
      return temp;
      // 返回删除之后的set
    });
  };

  const reset = () => setSet(getInitValue());

  return [
    set,
    {
      add: useMemoizedFn(add),
      remove: useMemoizedFn(remove),
      reset: useMemoizedFn(reset),
    },
  ] as const;

  // 复习
  // 1
  // const 断言
  // 概念：const断言是 ( 最窄或最具体 ) 的类型，如果不选择断言，则可能因为更广的范围而产生一个错误的推断
  // 应用：
  // - 对象字面量获取只读属性
  // - 数组字面量称为只读元组
  // - const obj = {a: 2}  obj.a = 3 报错，因为是只读属性
}

export default useSet;
