import { addresses, tokens } from './constants';
import * as utils from './utils';
import ERC20 from './contracts/ERC20';
import StablePool from './contracts/StablePool';
import NRT from './contracts/NRT';
import Web3 from 'web3';
import { Currency } from './types/Currency';
import { ethers } from 'ethers';
import IDO from './contracts/IDO';
import { BigNumber } from 'blockchain';

export class iFans {

  web3: Web3;
  chainId: number;
  disconnect: () => void;

  busd: ERC20;
  usdt: ERC20;
  usdc: ERC20;
  lpShare: ERC20;
  pool: ERC20;
  nrt: NRT;
  ido: IDO;
  contractOptions: any;

  constructor(provider, chainId, disconnect, options = {}) {

    this.web3 = utils.createWeb3(provider, options);
    this.chainId = chainId;
    this.disconnect = disconnect;

    this.contractOptions = {
      web3: this.web3,
      chainId: chainId,
      ...options
    }
    this.busd = new ERC20(this.contractOptions, addresses.busd[chainId]);
    this.usdt = new ERC20(this.contractOptions, addresses.usdt[chainId]);
    this.usdc = new ERC20(this.contractOptions, addresses.usdc[chainId]);
    this.lpShare = new ERC20(this.contractOptions, addresses.lpShare[chainId])
    this.pool = new StablePool(this.contractOptions);
    this.nrt = new NRT(this.contractOptions, addresses.nrt[chainId]);
    this.ido = new IDO(this.contractOptions, addresses.ido[chainId]);
    //console.log(addresses.nrt[chainId]);
  }

  async getCurrencies() {
    const currencies = Object.values(tokens).map((token) => {
      return new Currency(this.chainId, token.decimals, token.symbol, token.name, token.address[this.chainId]);
    })
    return currencies;
  }

  async getBalances() {
    const account = window.ethereum?.selectedAddress;
    if (account == null)
      return {};
    const bnbBalance = await utils.getEthBalance(account);
    const busdBalance = await this.busd.call("balanceOf", account);
    const usdtBalance = await this.usdt.call("balanceOf", account);
    const usdcBalance = await this.usdc.call("balanceOf", account);
    const lpBalance = await this.lpShare.call("balanceOf", account);

    const balances = {
      bnb: bnbBalance,
      busd: utils.BNtoNum(busdBalance, tokens.BUSD.decimals),
      usdt: utils.BNtoNum(usdtBalance, tokens.USDT.decimals),
      usdc: utils.BNtoNum(usdcBalance, tokens.USDC.decimals),
      lpShare: utils.BNtoNum(lpBalance, tokens.LPSHARE.decimals),
    }
    return balances;
  }

  async getPoolInfo() {
    const busdBalance = await this.busd.call("balanceOf", addresses.pool[this.chainId]);
    const usdtBalance = await this.usdt.call("balanceOf", addresses.pool[this.chainId]);
    const usdcBalance = await this.usdc.call("balanceOf", addresses.pool[this.chainId]);
    return {
      busd: utils.BNtoNum(busdBalance, tokens.BUSD.decimals),
      usdt: utils.BNtoNum(usdtBalance, tokens.USDT.decimals),
      usdc: utils.BNtoNum(usdcBalance, tokens.USDC.decimals)
    }
  }

  async swapBase(amount: Number) {
    try {
      const _amount = utils.NumToBN(amount, tokens.USDC.decimals);
      await this.usdc.send("approve", null, addresses.pool[this.chainId], _amount);
      const tx = await this.pool.send("swapBase", null, _amount);
      return tx;
    } catch (e) {
      console.log("swapBase() Error:", e);
      return false;
    }
  }

  async swapQuote(amount: Number) {
    try {
      const _amount = utils.NumToBN(amount, tokens.USDT.decimals);
      await this.usdt.send("approve", null, addresses.pool[this.chainId], _amount);
      const tx = await this.pool.send("swapQuote", null, _amount);
      return tx;
    } catch (e) {
      console.log("swapQuote() Error:", e);
      return false;
    }
  }

  async getAllowance(currency: Currency) {
    const account = window.ethereum?.selectedAddress;
    const contract = new ERC20(this.contractOptions, currency.address);
    const _allowance = await contract.call("allowance", account, addresses.pool[this.chainId]);
    return utils.BNtoNum(_allowance, currency.decimals);
  }

  async approveUSDT() {
    try {
      const tx = await this.usdt.send("approve", null, addresses.ido[this.chainId], ethers.constants.MaxUint256);
      return tx;
    } catch (e) {
      console.log("approveUSDT() Error:", e);
      return false;
    }
  }

  async approve(currency: Currency) {
    const contract = new ERC20(this.contractOptions, currency.address);
    try {
      const tx = await contract.send("approve", null, addresses.pool[this.chainId], ethers.constants.MaxUint256);
      return tx;
    } catch (e) {
      console.log("approve() Error:", e);
      return false;
    }
  }

  async deposit(amount: Number, currency: Currency) {
    try {
      const _amount = utils.NumToBN(amount, currency.decimals);
      if (currency.symbol == "USDC") {
        const tx = await this.pool.send("depositLiquidityBase", null, _amount);
        return tx;
      }
      else if (currency.symbol == "USDT") {
        const tx = await this.pool.send("depositLiquidityQuote", null, _amount);
        return tx;
      }
      else {
        throw Error;
      }
    } catch (e) {
      console.log("deposit() Error:", e);
      return false;
    }
  }

  async withdraw(amount: Number, currency: Currency) {
    try {
      const _amount = utils.NumToBN(amount, currency.decimals);
      if (currency.symbol == "USDC") {
        const tx = await this.pool.send("withdrawLiquidityBase", null, _amount);
        return tx;
      }
      else if (currency.symbol == "USDT") {
        const tx = await this.pool.send("withdrawLiquidityQuote", null, _amount);
        return tx;
      }
      else {
        throw Error;
      }
    } catch (e) {
      console.log("withdraw() Error:", e);
      return false;
    }
  }

  async claim(amount: Number) {
    try {
      const account = window.ethereum?.selectedAddress;
      const _amount = utils.NumToBN(amount, tokens.USDT.decimals);
      const tx = await this.nrt.send("redeem", null, account, _amount);
      return tx;
    } catch (e) {
      console.log("withdraw() Error:", e);
      return false;
    }
  }
  
  async invest(amount: BigNumber) {
    try {
      const tx = await this.ido.send("invest", null, amount);
      return tx;
    } catch (e) {
      console.log("deposit() Error:", e);
      return false;
    }
  }
}
