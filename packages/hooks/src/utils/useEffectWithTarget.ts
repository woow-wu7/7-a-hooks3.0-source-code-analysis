import { useEffect } from 'react';
import createEffectWithTarget from './createEffectWithTarget';

const useEffectWithTarget = createEffectWithTarget(useEffect); // useEffectWithTarget 是执行 createEffectWithTarget(useEffect) 的返回值

export default useEffectWithTarget;
