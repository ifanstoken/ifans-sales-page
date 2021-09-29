
import { useState, useEffect, useContext, useCallback } from 'react';
import { NotificationManager } from 'react-notifications';
import { Web3WrapperContext } from '../contexts/Web3WrapperProvider';
import { Button, Form } from "react-bootstrap";
import BNB from "../assets/bnb.svg";
import Pig from "../assets/pig.svg";
import useAccountData from 'hooks/useAccountData';
import { toFixed, getDateStr } from 'blockchain/utils';
import LoaderSpinner from "react-loader-spinner";
import { tokenInfos } from 'blockchain/constants';

const ActionBox = (props) => {

  const { salesData } = props;
  const [bnbAmount, setBnbAmount] = useState<string>("0");
  const { web3Wrapper: wrapper } = useContext(Web3WrapperContext);
  const accountData = useAccountData();
  const [buyRequested, setBuyReqeusted] = useState<boolean>(false);
  const [buyEnabled, setBuyEnabled] = useState<boolean>(true);
  const [claimRequested, setClaimReqeusted] = useState<boolean>(false);
  const [claimEnabled, setClaimEnabled] = useState<boolean>(true);

  useEffect(() => {
    setBuyEnabled(salesData.isLive && !buyRequested);
  }, [salesData, buyRequested])

  useEffect(() => {
    setClaimEnabled(salesData.isEnded && !claimRequested && accountData && accountData.tokensAvailable);
  }, [salesData, claimRequested, accountData])

  const handleChange = (e) => {
    setBnbAmount(e.target.value);
  }

  const handleMaxClick = useCallback(() => {
    if (buyEnabled && accountData)
      setBnbAmount(accountData.bnbBalance)
  }, [buyEnabled, accountData])

  const calcNextUnlock = useCallback(() => {
    if (!accountData || Number(accountData.nextMilestone) === 0) 
      return "-";
    return getDateStr(new Date(accountData.nextMilestone * 1000));
  }, [accountData])

  const calcTokenAmount = useCallback(() => {
    if (isNaN(Number(bnbAmount))) return 0;
    return salesData.tokenPrice * Number(bnbAmount);
  }, [bnbAmount, salesData])

  const getClaimText = useCallback(() => {
    if (!accountData || !accountData.tokensAvailable) return "";
    return ` ${toFixed(accountData.tokensAvailable, 2)} ${tokenInfos.iFans.symbol}`;
  }, [accountData])

  const handleBuy = useCallback(async () => {
    if (!accountData || !salesData) return;
    if (bnbAmount === "" || isNaN(Number(bnbAmount)) || Number(bnbAmount) <= 0) {
      NotificationManager.error("Invalid BNB amount.");
      return;
    }
    if (Number(bnbAmount) < Number(salesData.minInvestFund)) {
      NotificationManager.error(`Minimum investment fund is ${salesData.minInvestFund} BNB`);
      return;
    }
    if (Number(bnbAmount) > Number(salesData.maxInvestFund)) {
      NotificationManager.error(`Maximum investment fund is ${salesData.maxInvestFund} BNB`);
      return;
    }
    if (Number(bnbAmount) > Number(accountData.bnbBalance)) {
      NotificationManager.error("Insufficient BNB balance.");
      return;
    }
    setBuyReqeusted(true);
    const txHash = await wrapper?.buy(bnbAmount);
    setBuyReqeusted(false);
    if (!txHash) {
      NotificationManager.error('Buy Transaction Error');
      return;
    }
    
    NotificationManager.success(`${calcTokenAmount()} ${tokenInfos.iFans.symbol} purchased`, 'Purchase Success');
    setBnbAmount("0");

  }, [bnbAmount, wrapper, accountData, salesData, calcTokenAmount])

  const handleClaim = useCallback(async () => {
    if (!wrapper) return;
    if (isNaN(Number(accountData?.tokensAvailable)) || Number(accountData?.tokensAvailable) <= 0) {
      NotificationManager.error("If you still have remaining tokens to claim, please wait until the next unlock.", "Nothing to claim!");
      return;
    }
    setClaimReqeusted(true);
    const txHash = await wrapper.claim();
    setClaimReqeusted(false);
    if (!txHash) {
      NotificationManager.error('Claim Transaction Error');
      return;
    }
    
    NotificationManager.success(`${accountData.tokensAvailable} ${tokenInfos.iFans.symbol} claimed`, 'Claim Success');

  }, [accountData, wrapper])

  return (
    <>
      <div className="glass_bg_res position-relative h-100">
        <div
          className={`glass_bg_dark w-100 h-100 p-3 ${
            wrapper && "d-none"
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

        {!salesData.isEnded ? (
          
          (!wrapper || accountData) ? (
            <div className="p-lg-4 p-3">
              <div className="d-flex justify-content-between mb-2">
                <h3 className="font-weight-bold mb-3">Balance:</h3>
                <h3 className="font-weight-bold mb-3">{toFixed(accountData?.ifansBalance, 2)}</h3>
              </div>
              <div className=" d-flex justify-content-end">
                <div className="input_sec d-flex align-items-center px-3 py-2">
                  <img src={BNB} alt="" height="30px" className="pr-2" />
                  <h2 className="font-weight-bold mb-0">BNB</h2>
                </div>
              </div>
              <div className="input_sec my-3 text-right">
                {/* <h2 className="font-weight-bold px-3 py-2 mb-0">{value}</h2> */}
                <Form.Control 
                  type="text" 
                  placeholder="Enter Amount" 
                  className="custom_input" 
                  onChange={handleChange} 
                  value={bnbAmount} 
                  disabled={!buyEnabled}
                />
              </div>
              <div className="d-flex justify-content-space-between">
                <div><h5>= {calcTokenAmount()} $iFANS</h5></div>
                <div>
                  {
                    buyEnabled &&
                    <h5
                      className="font_avertastd_regular font-weight-normal"
                      onClick={handleMaxClick}
                      style={{ cursor: "pointer" }}
                    >
                      Max: {toFixed(accountData?.bnbBalance, 4)}
                    </h5>
                  }
                </div>
              </div>
              <div className="text-center pt-4">
                <Button
                  className="btn_light py-3 px-md-5 px-3 contribution-btn font_rifficfree"
                  onClick={handleBuy}
                  disabled={!buyEnabled}
                >
                  {salesData.isLive?(buyRequested?"Purchasing...":"Purchase"):"Not live"} 
                </Button>
              </div>
            </div>
          )
          :
            <div className="account-loading">
              <LoaderSpinner
                type="ThreeDots"
                color="white"
                height={30}
                width={50}
              />
            </div>
          
        ) : (
          accountData?
            <div className="px-3 px-md-5 py-4 text-center claim-box">
              <img src={Pig} alt="" height="150px" />
              {
                accountData.ifansBalance ? 
                  <>
                    <div className="d-flex justify-content-space-between">
                      <span className="text-left">Purchased: </span>
                      <span className="font-weight-bold text-right"> {toFixed(accountData?.ifansBalance, 2)} {tokenInfos.iFans.symbol}</span>
                    </div>
                    <div className="d-flex justify-content-space-between">
                      <span className="text-left">Claimed: </span>
                      <span className="font-weight-bold text-right"> {toFixed(accountData?.claimed, 2)} {tokenInfos.iFans.symbol}</span>
                    </div>
                    <div className="d-flex justify-content-space-between lock-text">
                      <span className="text-left">Next Unlock: </span>
                      <span className="font-weight-bold text-right"> {calcNextUnlock()}</span>
                    </div>
                    <div className="text-center">
                      <Button
                        className="btn_light py-3 px-5 font_rifficfree mt-2 contribution-btn"
                        onClick={handleClaim}
                        disabled={!claimEnabled}
                      >
                        {claimRequested?"Claiming...":`CLAIM${getClaimText()}`}
                      </Button>
                    </div>
                  </>
                :
                  <h1>No $iFans you bought!</h1>
              }
            </div>
          :
            <div className="account-loading">
              <LoaderSpinner
                type="ThreeDots"
                color="white"
                height={30}
                width={50}
              />
            </div>
        )}
      </div>
    </>
  )
}

export default ActionBox;