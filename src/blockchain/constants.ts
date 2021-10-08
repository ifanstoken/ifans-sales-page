
import ifansLogo from '../assets/logo-icon.svg';

export const defaultChainId = 97;

export const rpcUrls = {
  56: 'https://bsc-dataseed.binance.org/',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
}

export const networkNames = {
  56: 'BSC Mainnet',
  97: 'BSC Testnet'
}

export const addresses = {
  crowdsale: {
    97: '0xc77a7b629586Bfb2b40BB9cd3aAaD9E36816C4d8'
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
      97: '0xbC6Be4eADBC119542aaE9402eF33686A8972F25f',
    },
    decimals: 18,
    logo: ifansLogo
  },
}