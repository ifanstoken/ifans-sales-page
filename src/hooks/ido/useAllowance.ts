import { useCallback, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import * as utils from '../../blockchain/utils';
import * as config from '../../config';
import useIFans from '../useIFans';
import { addresses, tokens, chainId } from '../../blockchain/constants';

const useAllowance = () => {
  const [allowance, setAllowance] = useState<boolean>(false);
  const { account } = useWallet();
  const ifans = useIFans();

  const fetchAllowance = useCallback(async () => {
    try {
      if (ifans === null || ifans === undefined)
        return;
      const _allowance = await ifans.usdt.call("allowance", account, addresses.ido[chainId]);
      console.log("USDT Allowance:", _allowance);
      setAllowance(utils.BNtoNum(_allowance, tokens.USDT.decimals) > 0);
    } catch (e) {
      console.log(e);
    }
  }, [ifans]);

  useEffect(() => {
    if (account && ifans) {
      fetchAllowance();
      let refreshInterval = setInterval(fetchAllowance, config.refetchInterval);
      return () => clearInterval(refreshInterval);
    }
    return () => {}
  }, [account, ifans, fetchAllowance]);

  return allowance;
}

export default useAllowance;
