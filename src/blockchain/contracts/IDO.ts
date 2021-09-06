
import Contract from './Contract';
import abi from '../abis/ido.json';

class IDO extends Contract {
  constructor(options, address) {
    super(options, "ido-" + address, abi, address);
  }
}

export default IDO;