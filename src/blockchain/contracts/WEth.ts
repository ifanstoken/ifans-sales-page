
import Contract from './Contract';
import abi from '../abis/weth.json';
import { addresses } from '../constants';

class WEth extends Contract {
  constructor(options) {
    super(options, "weth", abi, addresses.weth[options.chainId]);
  }
}

export default WEth;