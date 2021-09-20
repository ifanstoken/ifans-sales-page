import React from "react";
import { Row, Col } from "react-bootstrap";
import Logo from "../assets/logo-footer.svg";
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
            <img src={Logo} alt="" height="60px" width="auto" className="pr-3" style={{borderRight:"2px solid white"}} />
            <div className="px-3">
              <a href="#"><img src={Web} alt="" className="footer_icon mr-2" /></a>
              <a href="#"><img src={Twitter} alt="" className="footer_icon mr-2" /></a>
              <a href="#"><img src={Telegram} alt="" className="footer_icon mr-2" /></a>
              <a href="#"><img src={Discord} alt="" className="footer_icon mr-2" /></a>
              <a href="#"><img src={Book} alt="" className="footer_icon mr-2" /></a>
            </div>
          </div>
        </Col>
      </Row>
  );
};

export default Footer;
