
import Contract from './Contract';
import abi from '../abis/NRT.json';

class NRT extends Contract {
  constructor(options, address) {
    super(options, "nrt-" + address, abi, address);
  }
}

export default NRT;