import React from "react";
import { FaPhoneSquareAlt, FaMailBulk } from "react-icons/fa";

const HeaderTopbar = () => {
  return (
    <div className="topbar">
      <div className="container" style={{ paddingLeft: "5px" }}>
        <div className="row">
          <div className="col col-lg-8 col-md-12 col-sm-12 col-12">
            <ul className="contact-intro-list">
              <li>
                <i className="fi flaticon-email">
                  <FaMailBulk />
                </i>
                info@metapercept.com
              </li>
              <li>
                <i className="fi flaticon-telephone">
                  <FaPhoneSquareAlt />
                </i>
                <b>India</b>: +91-(020)-4129-1914; <b>USA</b>:
                +91-(839)-090-5726;
              </li>
            </ul>
          </div>
          <div className="col col-lg-4 col-md-12 col-sm-12 col-12">
            <div className="contact-info">
              <ul>
                <li>
                  <a
                    href="https://twitter.com/MetaPercept"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/metapercepttechservices/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/metapercept-information-solutions-&amp;-consulting"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopbar;
