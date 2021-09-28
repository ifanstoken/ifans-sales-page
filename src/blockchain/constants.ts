
import ifansLogo from '../assets/logo-icon.svg';

export const defaultChainId = 97;

export const rpcUrls = {
  56: 'https://bsc-dataseed.binance.org/',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
}

export const addresses = {
  crowdsale: {
    97: '0x5ACa183d5aD4b7910AF629F49a25a155055e8cbD'
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
      97: '0x26bCe9ae8953A4665dfA48BCfF696f27237354b4',
    },
    decimals: 18,
    logo: ifansLogo
  },
}