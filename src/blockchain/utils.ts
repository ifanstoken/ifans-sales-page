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
  if (isNaN(num)) return 0;
  var fixed_num = Number(num).toFixed(digit)
  return Number(fixed_num.toString());
}

export const getDateStr = (dateObj) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  const output = month  + ' ' + day  + ', ' + year;
  return output;
}

export const getStageText = (salesData) => {
  if (!salesData)
    return " ";
  if (salesData.isEnded)
    return "Ended";

  return `STAGE ${salesData.curStageIndex + 1}`;
}

export const getTargetTime = (salesData) => {
  if (salesData.isEnded)
    return { targetTime: null, timerTitle: "Claim your $iFANS !" };

  if (salesData.isLive)
    return { 
      targetTime: salesData.closeTime,
      timerTitle: "LIVE NOW"
    }

  return { 
    targetTime: salesData.openTime,
    timerTitle: "LIVE IN"
  }
}

export const getPercent = (salesData) => {
  if (salesData.isEnded) 
    return 0;

  return toFixed(salesData.amountRaised / salesData.fundingGoal * 100, 1);
}

export const parseStageData = (_stage) => {
  const stage = {
    amountRaised: BNtoNum(_stage.amountRaised, tokenInfos.bnb.decimals),
    openTime: Number(_stage.openTime),
    closeTime: Number(_stage.closeTime),
    tokenPrice: Number(_stage.tokenPrice),
    fundingGoal: BNtoNum(_stage.fundingGoal, tokenInfos.bnb.decimals)
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

  return {
    minInvestFund: BNtoNum(minInvestFund, tokenInfos.bnb.decimals),
    maxInvestFund: BNtoNum(maxInvestFund, tokenInfos.bnb.decimals),
    curStageIndex,
    isLive,
    isEnded: curStageIndex >= stageCnt,
    ...curStage
  };
}
