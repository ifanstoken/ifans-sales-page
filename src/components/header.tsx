import { useState, useContext, useCallback } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { ellipseAddress } from "utils/blockchain";
import ConnectWallet from "../assets/connect wallet.png";
import Logo from "../assets/Logo.png";
import Wallet from "../assets/wallet.svg";
import { Web3ModalContext } from '../contexts/Web3ModalProvider';

const Header = (props) => {
  const [btnState, setBtnState] = useState(false);

  const { connect, disconnect, account } = useContext(Web3ModalContext);

  const getStageText = useCallback(() => {
    if (!props.salesData)
      return " ";
    if (props.salesData.isEnded)
      return "Ended";
  
    return `STAGE ${props.salesData.curStageIndex + 1}`;
  }, [props.salesData]);

  const handleConnectWallet = useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnectWallet = useCallback(() => {
    setBtnState(false);
    disconnect();
  }, [disconnect]);

  return (
    <>
      <Col md={12} className="p-3 p-md-4 px-lg-5 py-lg-header d-flex justify-content-between">
        <div>
          <img src={Logo} className="mr-2 header_logo" alt="Logo" />
        </div>
        <div className="d-lg-block d-none">
          <Row className="justify-content-center">
            <Col>
              <div className="pre_font d-flex justify-content-center">
                <h1 className="upper_txt">PRESALE</h1>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm="12">
              <div className="stg_font d-flex justify-content-center">
                <h1 className="upper_txt mb-0">{getStageText()}</h1>
              </div>
            </Col>
          </Row>
        </div>
        
        <div>
          {!account ? (
            <div className="align-self-center">
              <Button
                className="connectWalletBtn p-md-3 py-1"
                onClick={handleConnectWallet}
              >
                <img
                  src={ConnectWallet}
                  style={{ height: "18px" }}
                  className="d-none d-lg-block"
                  alt="Connect Wallet"
                />
                <h5 className="d-block d-lg-none mb-0">Connect Wallet</h5>
              </Button>
            </div>
          ) : (
            <div>
              <Button
                className="notch_btn px-4 py-2 font-weight-bold d-flex align-items-center wallet-btn"
                onClick={() => {
                  setBtnState(!btnState);
                }}
                onMouseOver={() => {
                  setBtnState(true);
                }}
              >
                <img src={Wallet} alt="" height="35px" className="mr-2" />
                { ellipseAddress(account) }
              </Button>
            </div>
          )}
          {btnState &&
            <Button
              className="conect_btn w-100 py-3 font-weight-bold"
              onClick={handleDisconnectWallet}
              onMouseOver={() => {
                setBtnState(true);
              }}
              onMouseLeave={() => {
                setBtnState(false);
              }}
            >
              Disconnect
            </Button>
          }
        </div>
      </Col>

      <Col md={12} className="">
        <div className="d-block d-lg-none">
          <Row className="justify-content-center">
            <Col>
              <div className="pre_font d-flex justify-content-center">
              <h1 className="upper_txt">PRESALE</h1>
              </div>
            </Col>
          </Row>


          <Row className="justify-content-center">
            <Col sm="12">
              <div className="stg_font d-flex justify-content-center">
              <h1 className="upper_txt mb-0">STAGE 1</h1>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default Header;
