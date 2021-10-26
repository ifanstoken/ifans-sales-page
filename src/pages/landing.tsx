import { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../components/header";
import Footer from "../components/footer";
import LoaderSpinner from "react-loader-spinner";
import MainSection from "../components/mainSection";
import useSalesData from "hooks/useSalesData";
import { Web3ModalContext } from "contexts/Web3ModalProvider";
import { defaultChainId, networkNames } from "blockchain/constants";
import { NotificationManager } from 'react-notifications';
import { ReactComponent as Close } from 'assets/close.svg';
import { toFixed } from 'blockchain/utils';

const Landing = () => {

  const salesData = useSalesData();
  const { chainId } = useContext(Web3ModalContext);
  const [showMsg, setShowMsg] = useState(true);

  useEffect(() => {
    if (chainId !== null && Number(chainId) !== Number(defaultChainId)) {
      NotificationManager.error(`Try on ${networkNames[defaultChainId]}`, "Wrong Network");
    }
  }, [chainId])

  const handleCloseMessage = () => {
    setShowMsg(false);
  }

  return (
    <Container
      fluid
      className="px-0 m-0 mainBG d-flex flex-column"
      style={{ minHeight: "100vh" }}
    >
      {
        showMsg && salesData &&
          <div className="top-message">
            After all stages completed, $iFANS will be listed on PancakeSwap by New Year 2022 at a price of <span>1 BNB = 225 $iFANS</span>, up to <span>{toFixed(salesData.tokenPrice / 225, 2)}x</span> the current presale price.
            <div className="close-message" onClick={handleCloseMessage}>
              <Close className="close-button" fill="white"/>
            </div>
          </div>
      }
      <Row className="px-0 m-0">
        <Header salesData={salesData} />
      </Row>
      {
        salesData?
          <MainSection salesData={salesData} />
        :
          <div className="page-loading">
            <LoaderSpinner
              type="ThreeDots"
              color="#0071AB"
              height={50}
              width={70}
            />
          </div>
      }
      <Footer />
    </Container>
  );
};

export default Landing;
