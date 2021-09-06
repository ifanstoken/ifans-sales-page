import { useCallback, useEffect, useState } from 'react';
import useIFans from '../useIFans';
import * as config from '../../config';
import * as utils from '../../blockchain/utils';
import { tokens } from '../../blockchain/constants';
import { BigNumber } from "bignumber.js";
import { useWallet } from 'use-wallet';

const useSalesData = () => {
  const { account } = useWallet();
  const ifans = useIFans();
  const [salesData, setSalesData] = useState<any>(null);

  const fetchSalesData = useCallback(async () => {
    try {
      //const _salesData = await ifans?.getSalesData();
      if (ifans === null || ifans === undefined)
        return;
      //const account = window.ethereum?.selectedAddress;
      if (account === null || account === undefined)
        return;
      const fundingGoal = await ifans.ido.call("totalcap");
      const price = await ifans.ido.call("askpriceMultiple");
      const amountRaised = await ifans.ido.call("totalInvested");
      const capPerAccount = await ifans.ido.call("capPerAccount");
      const isWhitelisted = await ifans.ido.call("inWhitelist", account);
      const insvestedAmount = await ifans.ido.call("investedAmounts", account);
      const startTime = await ifans.ido.call("startTime");
      const endTime = await ifans.ido.call("endTime")
      let _salesData: any = {
        currentPrice: Number(price),
        amountRaised: utils.toFixed(utils.BNtoNum(amountRaised, tokens.USDT.decimals), 1),
        fundingGoal: utils.toFixed(utils.BNtoNum(fundingGoal, tokens.USDT.decimals), 0),
        capPerAccount: utils.toFixed(utils.BNtoNum(capPerAccount, tokens.USDT.decimals), 0),
        insvestedAmount: utils.toFixed(utils.BNtoNum(insvestedAmount, tokens.USDT.decimals), 0),
        availableAmountRaw: (new BigNumber(capPerAccount as string)).minus(new BigNumber(insvestedAmount as string)),
        isWhitelisted,
        startTime: Number(startTime),
        endTime: Number(endTime),
      }
      const availableAmount = utils.toFixed(utils.BNtoNum(_salesData.availableAmountRaw, tokens.USDT.decimals), 0);
      const percentage = utils.toFixed(_salesData.amountRaised / _salesData.fundingGoal * 100, 1);
      let status = 0;
      const now = Math.floor(Date.now() / 1000);
      if (now < _salesData.startTime) status = 1;
      else if (now < _salesData.endTime) status = 2;
      else status = 3;
      
      _salesData = {..._salesData, percentage, status, availableAmount}
      setSalesData(_salesData);
      console.log("SalesData: ", _salesData);
    } catch (e) {
      console.log("SalesData Fetching Error: ", e);
    }
  }, [ifans])

  useEffect(() => {
    if (ifans) {
      fetchSalesData();
      let refreshInterval = setInterval(fetchSalesData, config.refetchInterval);
      return () => clearInterval(refreshInterval);
    }
    return () => {};
  }, [ifans, fetchSalesData]);

  useEffect(() => {
    setSalesData(null);
  }, [account]);

  return salesData;
}

export default useSalesData;
