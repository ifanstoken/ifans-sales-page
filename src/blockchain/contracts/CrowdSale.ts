
import Contract from './Contract';
import abi from '../abis/ifans-crowdsale.json';

class Crowdsale extends Contract {
  constructor(options, address) {
    super(options, "iFans-Crowdsale", abi, address);
  }
}

export default Crowdsale;