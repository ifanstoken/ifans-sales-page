
import busdLogo from '../assets/images/busd.svg';
import usdtLogo from '../assets/images/usdt.png';
import usdcLogo from '../assets/images/usdc.png';
import lpshareLogo from '../assets/images/logo.png';

require('dotenv').config()

export const chainId = 97;

export const rpcUrl = {
  42: "https://kovan.infura.io/v3/2377373e9cc84228a6cea33645b511ea",
  1: "https://mainnet.infura.io/v3/2377373e9cc84228a6cea33645b511ea",
  97: process.env.local?
      "https://sleepy-easley:slip-gooey-entity-denote-clash-guise@nd-123-778-555.p2pify.com/11b5d759e65d7e3168c33e0b716f8acd":
      "https://data-seed-prebsc-1-s1.binance.org:8545/",
  56: "https://bsc-dataseed.binance.org/"
}

export const supportedChains = {
  56: "BSC Mainnet",
  97: "BSC Testnet"
}

export const addresses = {

  weth: {
    42: '0xa050886815cfc52a24b9c4ad044ca199990b6690',
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },

  busd: {
    56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    97: '0x8301f2213c0eed49a7e28ae4c3e91722919b8b47'
  },

  usdt: {
    56: '0x55d398326f99059fF775485246999027B3197955',
    97: '0xa11c8d9dc9b66e209ef60f0c8d969d3cd988782c'
  },

  usdc: {
    97: '0x16227D60f7a0e586C66B005219dfc887D13C9531'
  },

  pool: {
    97: '0xAa569a403d3a7e51DF25E9DF9Af798697452e313'
  },

  lpShare: {
    97: '0x93cD936d5016576a305FD65A7b6Ad8676890cdB0'
  },

  nrt: {
    97: '0x255aa1A2FD7085bb71743fbAc4eC3Fc503F57F5D'
  },

  ido: {
    97: '0x8bE1B7c690afC83E10e5D85aE22fB879aDAB62dB'
  },


}

export const tokens = {

  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    address: {
      97: '0x16227D60f7a0e586C66B005219dfc887D13C9531'
    },
    decimals: 6,
    logo: usdcLogo
  },

  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    address: {
      56: '0x55d398326f99059fF775485246999027B3197955',
      97: '0xa11c8d9dc9b66e209ef60f0c8d969d3cd988782c'
    },
    decimals: 6,
    logo: usdtLogo
  },

  BUSD: {
    name: 'Biance USD',
    symbol: 'BUSD',
    address: {
      56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      97: '0x8301f2213c0eed49a7e28ae4c3e91722919b8b47'
    },
    decimals: 18,
    logo: busdLogo
  },


  LPSHARE: {
    name: 'Liqudity Pool Share',
    symbol: 'LPSHARE',
    address: {
      97: '0x72F315ACa1787883F4D1168eB17A58D8Ca872b22'
    },
    decimals: 18,
    logo: lpshareLogo
  },
}