
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
    56: '0xE31d754C1B57467Ce00384DC278dfBED912528C6',
    97: '0xAdb4FB37881169B24DeaE25932De57A25eDE1C7c'
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
      56: '0xfd20d6e58dd9fc19a2fed3640dd63f166fa3bd09',
      97: '0xF25DbBb996ff61414ee48b9e3f4A9E144F9BC3FF'
    },
    decimals: 18,
    logo: ifansLogo
  },
}