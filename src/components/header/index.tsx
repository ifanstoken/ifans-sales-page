import { useState } from "react";
import { Container, Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
//import logo from '../../assets/images/logo.png';
import logo from '../../assets/images/logo_black.jpeg';
import walleticon from '../../assets/images/walleticon.png';
import { useWallet } from 'use-wallet';
import ConnectModal from '../modals/ConnectModal';
import * as utils from '../../blockchain/utils';
import useIFans from '../../hooks/useIFans';
import { supportedChains, chainId } from "blockchain/constants";
function Header() {

  const [modalShow, setModalShow] = useState(false);
  const { account } = useWallet();
  const iFans = useIFans();

  const handleDisconnect = () => {
    iFans?.disconnect();
  };

  return (
    <Container fluid className="header">
      <Navbar>
        <Navbar.Brand className="app-logo-box" href="/"><img src={logo} alt="" height={70} /><span className="app-title">iFans</span></Navbar.Brand>
        <Navbar.Collapse>
          <Nav className="mr-auto">
          </Nav>
        </Navbar.Collapse>
        <Navbar.Text>
          <div className="header-right">
          {
            !account ?
              <Button className="connect-button" onClick={() => setModalShow(true)}>
                Connect Wallet
              </Button>
              :
              <>
                <div className="network-button">{supportedChains[chainId]?supportedChains[chainId]:"Unsupported Network"}</div>
                <Dropdown className="connect-button">
                  <Dropdown.Toggle variant="success" id="dropdown-basic" className="connect-button">
                    <img src={walleticon} alt="" />
                    &nbsp;{utils.formatAddress(account)}&nbsp;
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href={'/'} onClick={handleDisconnect}>Disconnect</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
              </>
          }
          </div>
        </Navbar.Text>
      </Navbar>
      <ConnectModal show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
}

export default Header;