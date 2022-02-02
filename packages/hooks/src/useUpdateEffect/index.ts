import { useEffect } from 'react';
import { createUpdateEffect } from '../createUpdateEffect';

export default createUpdateEffect(useEffect);
// 这里直接调用 createUpdateEffect(useEffect)，返回值才是真正的 useUpdateEffect 函数
