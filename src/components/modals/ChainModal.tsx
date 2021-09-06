
import bluesecue from '../../assets/images/bluesecue.png';
import bsclogo from '../../assets/images/bsc-logo.png';
import {Modal, Button, Form, Card} from 'react-bootstrap';
import {supportedChains} from '../../blockchain/constants';

const ChainModal = (props) => {

  const onChangeChain = async (chainId) => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x' + Number(chainId).toString(16) }], // chainId must be in hexadecimal numbers
        });
      } catch (error) {
        console.error(error);
      }
    }
    if (props.onHide) props.onHide();
  }
 
  return (
    <Modal {...props} className="connect-modal" animation={true}>
      <Modal.Header>
        <Modal.Title>Select Chain</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card >
          <div className="wallet-warning">
            <img src={bluesecue} alt="" className="warning-icon"/>
            <span>iFans supports Binance Smart Chain Mainnet and Testnet only.</span>
          </div>
        </Card>
        <Form>
          {
            Object.keys(supportedChains).map((chain) => {
              return (
                <Form.Group key={chain}>
                  <Button 
                    className="wallet-button"
                    onClick={() => onChangeChain(chain)}
                  >
                    <img className="wallet-icon" src={bsclogo}/>
                    {supportedChains[chain]}
                  </Button>
                </Form.Group>
              );
            })
          }
        </Form>
      </Modal.Body>
            
    </Modal>
  )
}

export default ChainModal;