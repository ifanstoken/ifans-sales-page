import Web3 from 'web3';
import { addresses, defaultChainId, rpcUrls, tokenInfos } from './constants';
import Crowdsale from './contracts/CrowdSale';
import { BigNumber } from "bignumber.js";

export const createWeb3 = (provider) => {

  var realProvider;

  if (typeof provider === 'string') {
    if (provider.includes('wss')) {
      realProvider = new Web3.providers.WebsocketProvider(
        provider
      );
    } else {
      realProvider = new Web3.providers.HttpProvider(
        provider
      );
    }
  } else {
    realProvider = provider;
  }

  return new Web3(realProvider);
}

export const getDefaultWeb3 = () => {
  return createWeb3(rpcUrls[defaultChainId]);
}

export const getDefaultContractOptions = () => {
  const web3 = getDefaultWeb3();
  return { 
    web3, 
    chainId: defaultChainId, 
    account: null 
  };
}

export const BNtoNum = (value, decimal = 18) => {
  return new BigNumber(value).shiftedBy(-decimal).toNumber();
}

export const NumToBN = (value, decimal = 18) => {
  return new BigNumber(value).shiftedBy(decimal);
}

export const toFixed = (num, digit) => {
  var fixed_num = Number(num).toFixed(digit)
  return Number(fixed_num.toString());
}

export const getStageText = (salesData) => {
  if (!salesData || salesData.isEnded)
    return "";

  return `STAGE ${salesData.curStageIndex + 1}`;
}

export const getTargetTime = (salesData) => {
  if (salesData.isEnded)
    return { targetTime: null, timerTitle: "" };

  if (salesData.isLive)
    return { 
      targetTime: salesData.closeTime,
      timerTitle: "ENDS IN"
    }

  return { 
    targetTime: salesData.openTime,
    timerTitle: "STARTS IN"
  }
}

export const getPercent = (salesData) => {
  if (salesData.isEnded) 
    return 0;

  return toFixed(salesData.amountRaised / salesData.totalAmount * 100, 1);
}

export const parseStageData = (_stage) => {
  const stage = {
    amountRaised: BNtoNum(_stage.amountRaised, tokenInfos.bnb.decimals),
    openTime: Number(_stage.openTime),
    closeTime: Number(_stage.closeTime),
    tokenPrice: Number(_stage.tokenPrice),
    totalAmount: BNtoNum(_stage.totalAmount, tokenInfos.bnb.decimals)
  }

  return stage;
}

export const getCrowdsaleData = async () => {
  const crowdsale = new Crowdsale(getDefaultContractOptions(), addresses.crowdsale[defaultChainId]);
  
  const minInvestFund = await crowdsale.call("minInvestFund");
  const maxInvestFund = await crowdsale.call("maxInvestFund");

  const _currentStage: any = await crowdsale.call("getCurrentStage");
  const curStageIndex = Number(_currentStage.stageIndex);
  const isLive = _currentStage.isLive;

  const stageCnt = Number(await crowdsale.call("stageCount"));

  var curStage: any = {};
  if (curStageIndex < stageCnt) {
    curStage = await crowdsale.call("stages", curStageIndex);
    curStage = parseStageData(curStage);
  }

  console.log("Current Stage:", curStage);

  return {
    minInvestFund,
    maxInvestFund,
    curStageIndex,
    isLive,
    isEnded: curStageIndex >= stageCnt,
    ...curStage
  };
}
