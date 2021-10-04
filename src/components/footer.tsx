import { Row, Col } from "react-bootstrap";
import Logo from "../assets/logo-icon.svg";
import Web from "../assets/web.svg";
import Twitter from "../assets/twitter.svg";
import Telegram from "../assets/telegram.svg";
import Discord from "../assets/discord.svg";
import Book from "../assets/book.svg";


const Footer = () => {
  return (
      <Row className="px-0 mx-0 mt-auto footer_bg">
        <Col xl="12" className="text-white py-2 text-center">
          <div className="d-flex align-items-center justify-content-center">
            <a href="https://ifanstoken.com/" target="_blank" rel="noreferrer">
              <img src={Logo} alt="" height="60px" width="auto" className="pr-3" style={{borderRight:"2px solid white"}} />
            </a>
            <div className="px-3">
              <a href="https://ifanstoken.com/" target="_blank" rel="noreferrer"><img src={Web} alt="" className="footer_icon mr-2" /></a>
              <a href="https://twitter.com/ifanstoken" target="_blank" rel="noreferrer"><img src={Twitter} alt="" className="footer_icon mr-2" /></a>
              <a href="https://t.me/ifansOfficialCommunity" target="_blank" rel="noreferrer"><img src={Telegram} alt="" className="footer_icon mr-2" /></a>
              <a href="https://discord.gg/BheS4qQD" target="_blank" rel="noreferrer"><img src={Discord} alt="" className="footer_icon mr-2" /></a>
              <a href="https://ifanstoken.medium.com/" target="_blank" rel="noreferrer"><img src={Book} alt="" className="footer_icon mr-2" /></a>
            </div>
          </div>
        </Col>
      </Row>
  );
};

export default Footer;
