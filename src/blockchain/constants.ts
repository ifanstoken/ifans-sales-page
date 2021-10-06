
import ifansLogo from '../assets/logo-icon.svg';

export const defaultChainId = 97;

export const rpcUrls = {
  56: 'https://bsc-dataseed.binance.org/',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
}

export const addresses = {
  crowdsale: {
    97: '0xc83c92C7927D9Ae8956ADbb3780f491969a226aA'
  },
}

export const tokenInfos = {

  bnb: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18
  },

  iFans: {
    name: 'iFANS',
    symbol: '$iFANS',
    address: {
      97: '0x78c07F5bE71fF9E35C975E6c928c43966D3DdcBA',
    },
    decimals: 18,
    logo: ifansLogo
  },
}