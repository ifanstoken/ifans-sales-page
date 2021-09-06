import { useCallback, useEffect, useState } from 'react';
import useIFans from './useIFans';
import * as config from '../config';

const useStablePool = () => {
  const ifans = useIFans();
  const [stablePool, setStablePool] = useState<any>(null);

  const fetchStablePool = useCallback(async () => {
    try {
      const _stablePool = await ifans?.getPoolInfo();
      setStablePool(_stablePool);
      console.log("StablePool: ", _stablePool);
    } catch (e) {
      console.log("StablePool Fetching Error: ", e);
    }
  }, [ifans])

  useEffect(() => {
    if (ifans) {
      fetchStablePool();
      let refreshInterval = setInterval(fetchStablePool, config.refetchInterval);
      return () => clearInterval(refreshInterval);
    }
    return () => {}
  }, [ifans, fetchStablePool]);

  return stablePool;
}

export default useStablePool;
