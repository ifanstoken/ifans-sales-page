import Web3 from 'web3';
import { addresses, tokenInfos } from './constants';
import Crowdsale from './contracts/CrowdSale';
import ERC20 from './contracts/ERC20';
import { BNtoNum, NumToBN } from './utils';

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

  async getAccountData() {
    console.log(this.account);
    const ifansBalance = await this.crowdsale.call("balanceOf", this.account);
    const bnbBalacne = await this.web3.eth.getBalance(this.account);
    const avail : any = await this.crowdsale.call("getAvailableToken", this.account);
    const claimed : any = await this.crowdsale.call("tokensClaimed", this.account);
    return {
      ifansBalance: BNtoNum(ifansBalance, tokenInfos.iFans.decimals),
      bnbBalance: BNtoNum(bnbBalacne, tokenInfos.bnb.decimals),
      nextMilestone: Number(avail.nextMilestone),
      tokensAvailable: BNtoNum(avail.tokensAvailable, tokenInfos.iFans.decimals),
      claimed: BNtoNum(claimed, tokenInfos.iFans.decimals)
    }
  }

  async buy(bnbValue) {
    try {
      const tx = await this.crowdsale.send("invest", {value: NumToBN(bnbValue, tokenInfos.bnb.decimals)});
      return tx;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async claim() {
    try {
      const tx = await this.crowdsale.send("claim", null);
      return tx;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
