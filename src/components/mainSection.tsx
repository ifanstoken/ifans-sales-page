
import { getTargetTime, getPercent, toFixed } from "blockchain/utils";
import { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import BNB from "../assets/bnb.svg";
import Pig from "../assets/pig.svg";
import TimeCounter from "./timeCounter";

const MainSection = (props) => {
  const [btnState, setBtnState] = useState(true);
  const [value, setValue] = useState("15.6");

  const { salesData } = props;

  const { targetTime, timerTitle } = getTargetTime(salesData);
  const percent = getPercent(salesData);
  const percentFormatted = 5 + (percent / 100 * 95);

  const handleChange = (e) => {
    setValue(e.target.value);
  }
  
  return (
    <Row className="px-lg-5 mx-0 main_sec pb-5 justify-content-center">
      <Col lg={12} className="px-xl-5 mb-3" style={{ maxWidth: "1200px" }}>
        <div className="glass_bg px-5 py-4">
          <Row className="justify-content-center">
            <Col>
              <div className="end_font d-flex justify-content-center">
                <h2 className="upper_txt mb-0">{timerTitle}</h2>
                <h2 className="lower_txt m-0">{timerTitle}</h2>
              </div>
            </Col>
          </Row>
          <TimeCounter timeTillDate={targetTime} />
        </div>
      </Col>

      <Col lg={12} className="px-xl-5 mb-3" style={{ maxWidth: "1200px" }}>
        <Row>
          <Col md={6} className="px-4 text-white text-center mt-3">
          
            <div className="glass_bg_res p-lg-4 p-3 h-100">
              <div className="p-lg-4 p-3">
                <div className="mt-1 progress_bar">
                  <div className="bar" style={{ width: `${percentFormatted}%` }}></div>
                </div>
                <h4 className="font-weight-bold mt-3 py-3">Contribution: {percent}%</h4>
              </div>
              <div className="pt-md-4">
                <h3 className="font-weight-bold my-2">{toFixed(salesData.amountRaised, 2)} BNB / {toFixed(salesData.totalAmount, 2)}</h3>
                <span className="font_avertastd_regular">Current Price:</span>
                <h3 className="mt-0 font-weight-bold">1 BNB = {toFixed(salesData.tokenPrice, 2)} $iFans</h3>
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
                <div className="d-flex flex-column align-items-center justify-content-center cnt_sec">
                  <div className="my-2">
                    <img src={Pig} alt="" className="pig_img" />
                  </div>
                  <div className="text-center px-lg-5">
                    <h1 className="mt-lg-4 mt-2 font_rifficfree" style={{letterSpacing:'2px'}}>
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
                    {/* <h2 className="font-weight-bold px-3 py-2 mb-0">{value}</h2> */}
                    <Form.Control type="text" placeholder="Enter Amount" className="custom_input" onChange={handleChange} value={value} />
                  </div>
                  <div className=" d-flex justify-content-end">
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
