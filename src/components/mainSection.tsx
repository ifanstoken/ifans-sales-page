
import { getTargetTime, getPercent, toFixed } from "blockchain/utils";
import { Row, Col } from "react-bootstrap";
import TimeCounter from "./timeCounter";
import ActionBox from "./ActionBox";

const MainSection = (props) => {

  const { salesData } = props;

  const { targetTime, timerTitle } = getTargetTime(salesData);
  const percent = getPercent(salesData);
  const percentFormatted = 5 + (percent / 100 * 95);
  
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
                <h3 className="font-weight-bold my-2">{toFixed(salesData.amountRaised, 2)} BNB / {toFixed(salesData.fundingGoal, 2)}</h3>
                <span className="font_avertastd_regular">Current Price:</span>
                <h3 className="mt-0 font-weight-bold">1 BNB = {toFixed(salesData.tokenPrice, 2)} $iFANS</h3>
              </div>
            </div>
          </Col>
          <Col md={6} className="px-4 text-white mt-3 position-relative">
            <ActionBox salesData={salesData} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MainSection;
