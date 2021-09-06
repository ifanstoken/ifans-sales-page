import { useCallback, useEffect, useState } from 'react';
import useIFans from '../useIFans';
import * as config from '../../config';
import * as utils from '../../blockchain/utils'
import { tokens } from 'blockchain/constants';

const useNrtBalances = () => {
  const ifans = useIFans();
  const [balances, setBalances] = useState<any>(null);

  const fetchNrtBalances = useCallback(async () => {
    try {
      if (ifans === null || ifans === undefined)
        return;

      const account = window.ethereum?.selectedAddress;
      if (account === null || account === undefined)
        return;

      const nrtBalance = await ifans.nrt.call("balanceOf", account);
      const nrtIssued = await ifans.nrt.call("issuedSupply");
      const isWhitelisted = await ifans.ido.call("inWhitelist", account);
  
      const _balances = {
        nrt: utils.BNtoNum(nrtBalance, tokens.USDT.decimals),
        nrtIssued: utils.BNtoNum(nrtIssued, tokens.USDT.decimals),
        isWhitelisted
      }
      setBalances(_balances);
      console.log("NRT Balances: ", _balances);
    } catch (e) {
      console.log("NRT Balances Fetching Error: ", e);
    }
  }, [ifans])

  useEffect(() => {
    if (ifans) {
      fetchNrtBalances();
      let refreshInterval = setInterval(fetchNrtBalances, config.refetchInterval);
      return () => clearInterval(refreshInterval);
    }
    return () => {};
  }, [ifans, fetchNrtBalances]);

  return balances;
}

export default useNrtBalances;
