import { useContext, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../components/header";
import Footer from "../components/footer";
import LoaderSpinner from "react-loader-spinner";
import MainSection from "../components/mainSection";
import useSalesData from "hooks/useSalesData";
import { Web3ModalContext } from "contexts/Web3ModalProvider";
import { defaultChainId, networkNames } from "blockchain/constants";
import { NotificationManager } from 'react-notifications';

const Landing = () => {

  const salesData = useSalesData();
  const { chainId } = useContext(Web3ModalContext);

  useEffect(() => {
    if (chainId !== null && Number(chainId) !== Number(defaultChainId)) {
      NotificationManager.error(`Try on ${networkNames[defaultChainId]}`, "Wrong Network");
    }
  }, [chainId])

  return (
    <Container
      fluid
      className="px-0 m-0 mainBG d-flex flex-column"
      style={{ minHeight: "100vh" }}
    >
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
