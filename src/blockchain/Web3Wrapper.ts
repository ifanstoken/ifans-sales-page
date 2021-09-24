import Web3 from 'web3';
import { addresses, tokenInfos } from './constants';
import Crowdsale from './contracts/CrowdSale';
import ERC20 from './contracts/ERC20';

export default class Web3Wrapper {

  web3: Web3;
  chainId: number;
  account: string;
  wrapperOptions: any;

  // Contracts
  ifansToken: ERC20;
  crowdsale: Crowdsale;

  constructor(web3, chainId, account, options = {}) {

    this.web3 = web3;
    this.chainId = chainId;
    this.account = account;

    this.wrapperOptions = {
      web3, chainId, account,
      ...options
    }

    this.ifansToken = new ERC20(this.wrapperOptions, tokenInfos.iFans.address[this.chainId]);
    this.crowdsale = new Crowdsale(this.wrapperOptions, addresses.crowdsale[this.chainId]);
  }

  getCurrentStage() {
    
  }

}
