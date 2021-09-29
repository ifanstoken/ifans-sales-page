
import ifansLogo from '../assets/logo-icon.svg';

export const defaultChainId = 97;

export const rpcUrls = {
  56: 'https://bsc-dataseed.binance.org/',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
}

export const addresses = {
  crowdsale: {
    97: '0xB085cd77c8A20d28587f3Bcf5ceeba26Fe7d31bD'
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
      97: '0x5DfE73547A8A1d9468A43797b0D048cB37cB7424',
    },
    decimals: 18,
    logo: ifansLogo
  },
}