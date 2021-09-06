import { useState, useCallback } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useWallet } from 'use-wallet';
import LoaderSpinner from "react-loader-spinner";
import USDT from "../assets/images/usdt.png";
import CheckIcon from "../assets/images/check.png";
import TimeCounter from "../components/TimeCounter";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useIFans from '../hooks/useIFans';
import useAccountInfo from "../hooks/ido/useAccountInfo";
import useSalesData from "../hooks/ido/useSalesData";
import useAllowance from "hooks/ido/useAllowance";
import { NotificationManager } from 'react-notifications';
import { Helmet } from 'react-helmet';

const IDO = () => {

  const [errMsg, setErrMsg] = useState<string|null>(null);
  const [requestedApproval, setRequestedApproval] = useState<boolean>(false);
  const [requestedContribute, setRequestedContribute] = useState(false);
  const {account} = useWallet();
  const salesData = useSalesData();
  const ifans = useIFans();
  const allowance = useAllowance();
  const {accountLoading, usdtBalance, nrtBalance} = useAccountInfo();
  
  const idoStatusText = (status) => {
    switch (status) {
      case 1: return "Starts in";
      case 2: return "Ends in";
      case 3: return "Ended";
      default: return "is Coming soon";
    }
  }
  
  const idoTargetTime = (data) => {
    switch (data.status) {
      case 1: return data.startTime;
      case 2: return data.endTime;
      case 3: return 0;
      default: return 0;
    }
  }

  const handleApprove = useCallback(async () => {
    setRequestedApproval(true);
    const txHash = await ifans?.approveUSDT();
    if (!txHash) {
      NotificationManager.error('Approval Error');
      return;
    }
    setRequestedApproval(false);
    NotificationManager.success('Approval Success');
  }, [ifans, setRequestedApproval]);


  const handleContribute = useCallback(async () => {
    if (salesData.availableAmount <= 0) {
      NotificationManager.error('You already invested fully.');
      return;
    }
    if (salesData.availableAmount > usdtBalance) {
      NotificationManager.error('Insufficient balance');
      return;
    }

    setRequestedContribute(true);
    const txHash = await ifans?.invest(salesData.availableAmountRaw);
    if (!txHash) {
      NotificationManager.success(`Invest Error`);
      return;
    }
    setRequestedContribute(false);
    NotificationManager.success(`Invest success: Bought ${salesData.availableAmount} USDT`);
  }, [ifans, salesData, usdtBalance, setErrMsg, setRequestedContribute]);

  const showInvest = useCallback(() =>{
    return account && salesData.status > 1;
  }, [account, salesData]);

  return (
    <>
    <Helmet>
      <title>iFans | Presale</title>
    </Helmet>
    <Container fluid className="ido-page">
      {
        account?
        (
          <>
          {
          salesData?
            <>
            <Row>
                <span className="page-title">Presale - {idoStatusText(salesData.status)}</span>
                <Row className="my-3">
                  <TimeCounter
                    timeTillDate={idoTargetTime(salesData)}
                    status={salesData.status}
                  />
                </Row>
            </Row>
            <Row>
              <Col
                sm={12}
                md={12}
                lg={showInvest()?6:12}
                xl={showInvest()?6:12}
                className="text-center"
              >
                <Card>
                  <Card.Header>Overall Progress</Card.Header>
                  <Card.Body>
                    <div
                      style={{ width: 140, height: 140 }}
                      className="mx-auto mb-5 mb-xl-4 mt-3"
                    >
                      <CircularProgressbar
                        value={salesData.percentage}
                        text={`${salesData.percentage}%`}
                        styles={buildStyles({
                          textSize: "16px",
                          pathColor: "#141132",
                          textColor: "#141132",
                          trailColor: "#1411324A",
                        })}
                      />
                    </div>

                    <h3 className="text-center">{salesData.amountRaised} USDT / {salesData.fundingGoal}</h3>
                    <div className="w-fit-content mx-auto">
                      <h6 className="text-left mb-0 price-title">Token Price</h6>
                      <h5 className="text-left">1 USDT = {salesData.currentPrice} iFANS</h5>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              {
                showInvest() &&
                  <Col
                    sm={12}
                    md={12}
                    lg={6}
                    xl={6}
                    className="text-center"
                  >
                    <Card>
                      <Card.Header>My Tokens</Card.Header>
                      <Card.Body>
                      {
                        accountLoading ?
                          <LoaderSpinner
                            // className="account-loading"
                            type="ThreeDots"
                            color="#141132"
                            height={30}
                            width={50}
                          />
                        :       
                          (salesData.isWhitelisted ?
                          <div className="w-100">
                            <div className="d-md-flex justify-content-md-between">
                              <h4 className="text-center mt-2">Bought</h4>
                              <h4 className="text-center mt-2">{salesData.insvestedAmount} iFANS</h4>
                            </div>
                            {
                              errMsg &&
                                <div className="err-msg">
                                  {errMsg}
                                </div>
                            }
                            {
                              salesData.status === 3 ?
                                <div><br/>Claim of iFANS will become available soon.</div>
                              :
                              (salesData.status === 4 ? 
                                nrtBalance > 0 && (
                                  <span>Claim your iFANS on NRT page.</span>
                                )
                              : <>
                                {
                                  allowance?
                                    (
                                      requestedContribute?
                                        <div className="mt-3">
                                          <Button
                                            variant="light"
                                            className="btn_white w-fill-available"
                                            disabled
                                          >
                                            Investing...
                                          </Button>
                                        </div>
                                      :
                                        <div className="mt-3">
                                          <Button
                                            variant="light"
                                            className="btn_white w-fill-available"
                                            onClick={handleContribute}
                                            disabled={salesData.availableAmount <= 0}
                                          >
                                            {salesData.availableAmount > 0?
                                              <>
                                                <img src={USDT} alt="" className="me-2" width={30} height={30}/>
                                                Invest {salesData.availableAmount} USDT
                                              </>
                                            :
                                              <>
                                                <img src={CheckIcon} alt="" className="me-2" width={30} height={30}/>
                                                You've already invested
                                              </>
                                            }
                                          </Button>
                                        </div>
                                    )
                                  : (
                                    requestedApproval?
                                      <div className="mt-3">
                                        <Button
                                          variant="light"
                                          className="btn_white w-fill-available"
                                          disabled
                                        >
                                          Approving...
                                        </Button>
                                      </div>
                                    :
                                      <div className="mt-3">
                                        <Button
                                          variant="light"
                                          className="btn_white w-fill-available"
                                          onClick={handleApprove}
                                        >
                                          Approve
                                        </Button>
                                      </div>
                                  )
                                }
                              </>
                              )
                            }
                            
                            
                          </div>
                          :
                            <span>You are not whitelisted.</span>
                        )
                      }
                      </Card.Body>
                    </Card>
                  </Col>
              }
            </Row>
            <Row className="mt-4" style={{justifyContent: "center"}}>
              <Col xl={12}>
                <Card className="text-center">
                  <Card.Header>Attention!</Card.Header>
                  <Card.Body>
                    <span className="attention-desc">
                      By contributing you agree to the terms. This is not an investment and a possible
                      loss of funds can occur. iFans takes no responsibility for
                      any issues of any kind, you are responsible for your own
                      decision making when minting utility tokens for this
                      project. Any legal or jurisdictional issues are entirely
                      your own and you must make sure you do your due diligence
                      before hand.
                    </span>
                  </Card.Body>
                </Card>
              </Col>
            </Row>    
          </>
          :
            <Row className="justify-content-center pb-5 bg_ido ido-loading-bg">
              <div className="ido-loading">
                <LoaderSpinner
                  type="ThreeDots"
                  color="#25224e"
                  height={50}
                  width={70}
                />
                <p className="loading-text">Loading...</p>
              </div>
            </Row>
        }
        </>
        )
      :
        <div>You should connect your wallet first.</div>
      }
    </Container>
    </>
  );
}

export default IDO;
