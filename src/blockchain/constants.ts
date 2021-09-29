
import ifansLogo from '../assets/logo-icon.svg';

export const defaultChainId = 97;

export const rpcUrls = {
  56: 'https://bsc-dataseed.binance.org/',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
}

export const addresses = {
  crowdsale: {
    97: '0xce7a5ed0D72FC99E336108AE65B6Ea6b7e6bec6e'
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
      97: '0x7FB523a153489b0a46bDc6CcDc00bD3DA8BCAF01',
    },
    decimals: 18,
    logo: ifansLogo
  },
}