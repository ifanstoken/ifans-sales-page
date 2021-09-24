import { Container, Row } from "react-bootstrap";
import Header from "../components/header";
import Footer from "../components/footer";
import LoaderSpinner from "react-loader-spinner";
import MainSection from "../components/mainSection";
import useSalesData from "hooks/useSalesData";

const Landing = () => {

  const salesData = useSalesData();

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
