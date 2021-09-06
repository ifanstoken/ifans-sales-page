import { useCallback, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import * as utils from '../../blockchain/utils';
import * as config from '../../config';
import useIFans from '../useIFans';

const useAccountInfo = () => {
  const [accountLoading, setAccountLoading] = useState(false);
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [nrtBalance, setNrtBalance] = useState(0);
  const { account } = useWallet();
  const ifans = useIFans();

  const fetchAccountInfo = useCallback(async () => {
    try {
      if (ifans === null || ifans === undefined)
        return;

      const _nrtBalance = await ifans.nrt.call("balanceOf", account);
      const _usdtBalance = await ifans.usdt.call("balanceOf", account);
      const accountInfo = {nrtBalance: _nrtBalance, usdtBalance: _usdtBalance}
      console.log("Account Info:", accountInfo);
      setUsdtBalance(utils.toFixed(_usdtBalance, 4));
      setNrtBalance(utils.toFixed(_nrtBalance, 4));
      setAccountLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [ifans]);

  useEffect(() => {
    if (account && ifans) {
      setAccountLoading(true);
      fetchAccountInfo();
      let refreshInterval = setInterval(fetchAccountInfo, config.refetchInterval);
      return () => clearInterval(refreshInterval);
    }
    return () => {}
  }, [account, ifans, fetchAccountInfo]);

  return {accountLoading, usdtBalance, nrtBalance};
}

export default useAccountInfo;
