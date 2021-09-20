import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import ConnectWallet from "../assets/connect wallet.png";
import Logo from "../assets/Logo.png";
import Metamask from "../assets/metamask.svg";
import WalletConnect from "../assets/walletConnect.svg";
import Wallet from "../assets/wallet.svg";

const Header = (props) => {
  const [btnState, setBtnState] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const connectWallet = () => {
    props.setBtnState(true);
    setShow(false);
    setBtnState(false);
  };

  const disconnectWallet = () => {
    props.setBtnState(false);
    setBtnState(false);
  };

  return (
    <>
      <Col md={12} className="p-3 p-md-4 p-lg-5 d-flex justify-content-between">
        <div>
          <img src={Logo} className="mr-2 header_logo" alt="Logo" />
        </div>


        <div className="d-lg-block d-none">
          <Row className="justify-content-center">
            <Col>
              <div className="pre_font d-flex justify-content-center">
              <h1 className="upper_txt">PRESALE</h1>
            <h1 className="lower_txt">PRESALE</h1>
              </div>
            </Col>
          </Row>


          <Row className="justify-content-center">
            <Col sm="12">
              <div className="stg_font d-flex justify-content-center">
              <h1 className="upper_txt mb-0">STAGE 1</h1>
            <h1 className="lower_txt mb-0">STAGE 1</h1>
              </div>
            </Col>
          </Row>
        </div>
        
        <div>
          {props.btnState === false ? (
            <div className="align-self-center">
              <Button
                className="connectWalletBtn p-md-3 py-1"
                onClick={handleShow}
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
                0x12345623456
              </Button>
            </div>
          )}
          {btnState &&
            (props.btnState === false ? (
              <Button
                className="conect_btn w-100 py-3 font-weight-bold"
                onClick={handleShow}
              >
                Connect
              </Button>
             ) : ( 
              <Button
                className="conect_btn w-100 py-3 font-weight-bold"
                onClick={disconnectWallet}
                onMouseOver={() => {
                  setBtnState(true);
                }}
                onMouseLeave={() => {
                  setBtnState(false);
                }}
              >
                Disconnect
              </Button>
            ))}
        </div>
      </Col>

      <Col md={12} className="">
        <div className="d-block d-lg-none">
          <Row className="justify-content-center">
            <Col>
              <div className="pre_font d-flex justify-content-center">
              <h1 className="upper_txt">PRESALE</h1>
            <h1 className="lower_txt">PRESALE</h1>
              </div>
            </Col>
          </Row>


          <Row className="justify-content-center">
            <Col sm="12">
              <div className="stg_font d-flex justify-content-center">
              <h1 className="upper_txt mb-0">STAGE 1</h1>
            <h1 className="lower_txt mb-0">STAGE 1</h1>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
      <Modal show={show} onHide={handleClose} centered className="bg_blur">
        <Modal.Body className="border_radius modal_bg text-center p-4 p-md-5">
          <h3 className="mb-0 font-weight-bold text-white mb-3 pb-3">
            Select Wallet
          </h3>
          <div className="px-4">
            <Button variant="link" className="p-0 mb-3" onClick={connectWallet}>
              <img src={Metamask} alt="" className="w-100" />
            </Button>
            <Button variant="link" className="p-0 mb-1" onClick={connectWallet}>
              <img src={WalletConnect} alt="" className="w-100" />
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
