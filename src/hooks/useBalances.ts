import { useCallback, useEffect, useState } from 'react';
import useIFans from './useIFans';
import * as config from '../config';

const useBalances = () => {
  const ifans = useIFans();
  const [balances, setBalances] = useState<any>(null);

  const fetchBalances = useCallback(async () => {
    try {
      const _balances = await ifans?.getBalances();
      setBalances(_balances);
      console.log("Balances: ", _balances);
    } catch (e) {
      console.log("Balances Fetching Error: ", e);
    }
  }, [ifans])

  useEffect(() => {
    if (ifans) {
      fetchBalances();
      let refreshInterval = setInterval(fetchBalances, config.refetchInterval);
      return () => clearInterval(refreshInterval);
    }
    return () => {};
  }, [ifans, fetchBalances]);

  return balances;
}

export default useBalances;
