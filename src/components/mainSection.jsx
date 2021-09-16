import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import BNB from "../assets/bnb.svg";
import Pig from "../assets/pig.svg";
import TimeCounter from "./timeCounter";

const MainSection = (props) => {
  const [btnState, setBtnState] = useState(true);
  const [value, setValue] = useState("15.6");

  return (
    <Row className="px-lg-5 mx-0 main_sec pb-5 justify-content-center">
      <Col lg={12} className="px-xl-5 mb-3" style={{ maxWidth: "1200px" }}>
        <div className="glass_bg p-5">
          <TimeCounter
            timeTillDate="12 15 2021, 6:00 am"
            timeFormat="MM DD YYYY, h:mm a"
          />
        </div>
      </Col>

      <Col lg={12} className="px-xl-5 mb-3" style={{ maxWidth: "1200px" }}>
        <Row>
          <Col md={6} className="px-4 text-white text-center mt-3">
            <div className="glass_bg_res p-lg-4 p-3 h-100">
              <div className="p-lg-4 p-3">
                <div className="mt-1 progress_bar">
                  <div className="bar" style={{ width: "82%" }}></div>
                </div>
                <h5 className="font-weight-bold my-3">Contribution: 82%</h5>
              </div>
              <div className="mt-4 pt-4">
                <h3 className="font-weight-bold my-2">0 BMB / 10K</h3>
                <span className="font_avertastd_regular">Current Price:</span>
                <h3 className="mt-0 font-weight-bold">1 BMB = 1iFans</h3>
              </div>
            </div>
          </Col>

          <Col md={6} className="px-4 text-white mt-3 position-relative">
            <div className="glass_bg_res position-relative">
              <div
                className={`glass_bg_dark w-100 h-100 p-3 ${
                  props.btnState && "d-none"
                } position-absolute`}
              >
                <div className="text-center">
                  <img src={Pig} alt="" height="180px" />

                  <div className="text-center px-lg-5">
                    <h1 className="mt-lg-4 mt-2 font_rifficfree">
                      Connect wallet to get presale!
                    </h1>
                  </div>
                </div>
              </div>

              {btnState ? (
                <div className="p-lg-4 p-3">
                  <div className="d-flex justify-content-between mb-2">
                    <h3 className="font-weight-bold mb-3">Balance:</h3>
                    <h3 className="font-weight-bold mb-3">51.5</h3>
                  </div>
                  <div className=" d-flex justify-content-end">
                    <div className="input_sec d-flex align-items-center px-3 py-2">
                      <img src={BNB} alt="" height="30px" className="pr-2" />
                      <h2 className="font-weight-bold mb-0">BNB</h2>
                    </div>
                  </div>
                  <div className="input_sec my-3 text-right">
                    <h2 className="font-weight-bold px-3 py-2 mb-0">{value}</h2>
                  </div>
                  <div className="px-3 d-flex justify-content-end">
                    <h5
                      className="font_avertastd_regular font-weight-normal"
                      onClick={() => {
                        setValue("20");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Max: 20
                    </h5>
                  </div>
                  <div className="text-center pt-4">
                    <Button
                      className="btn_light py-3 px-md-5 px-3 contribution-btn font_rifficfree"
                      onClick={() => setBtnState(!btnState)}
                    >
                      Contribution
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="px-3 px-md-5 py-4 text-center">
                  <img src={Pig} alt="" height="180px" />
                  <div>
                    <h3 className="font-weight-bold mb-0">You get:</h3>
                    <h1 className="font-weight-bold">5555 $iFans</h1>
                  </div>
                  <div className="text-center">
                    <Button
                      className="btn_light py-3 px-5 font_rifficfree"
                      onClick={() => setBtnState(!btnState)}
                    >
                      Claim
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MainSection;
