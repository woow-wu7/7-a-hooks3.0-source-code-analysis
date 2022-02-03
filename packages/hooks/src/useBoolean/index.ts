import { useMemo } from 'react';
import useToggle from '../useToggle';

export interface Actions {
  setTrue: () => void;
  setFalse: () => void;
  set: (value: boolean) => void;
  toggle: () => void;
}

export default function useBoolean(defaultValue = false): [boolean, Actions] {
  const [state, { toggle, set }] = useToggle(defaultValue); // 利用 useToggle 的能力

  const actions: Actions = useMemo(() => {
    const setTrue = () => set(true);
    const setFalse = () => set(false);
    return {
      toggle,
      set: (v) => set(!!v), // 相比于直接调用useToggle的set，这里相当于把值类型做了boolean的约束，
      setTrue,
      setFalse,
    };
  }, []);

  return [state, actions];
}
