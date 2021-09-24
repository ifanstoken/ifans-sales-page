
import ifansLogo from '../assets/logo-icon.svg';

export const defaultChainId = 97;

export const rpcUrls = {
  56: 'https://bsc-dataseed.binance.org/',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
}

export const addresses = {
  crowdsale: {
    97: '0xE9e0F07072a60e6f7fCceB2C2d87d146Fc441fA7'
  },
}

export const tokenInfos = {

  bnb: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 8
  },

  iFans: {
    name: 'iFans',
    symbol: '$iFans',
    address: {
      97: '0x98378DEA486ca01C53091fC6F7FE7bf63763a526',
    },
    decimals: 18,
    logo: ifansLogo
  },
}