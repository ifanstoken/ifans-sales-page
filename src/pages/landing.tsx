import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../components/header";
import Footer from "../components/footer";
import MainSection from "../components/mainSection";

const Landing = () => {
  const [btnState, setBtnState] = useState(false);

  return (
    <Container
      fluid
      className="px-0 m-0 mainBG d-flex flex-column"
      style={{ minHeight: "100vh" }}
    >
      <Row className="px-0 m-0">
        <Header btnState={btnState} setBtnState={setBtnState} />
      </Row>
      <MainSection btnState={btnState} />
      <Footer />
    </Container>
  );
};

export default Landing;
