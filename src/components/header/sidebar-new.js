import React from "react";
import MobileMenus from "./mobile-menus";
import { Link } from "react-router-dom";
import MainSiteUrl from "../../api/MainSiteUrl"
import Meta_Logo from "../../images/Metapercept_footer_logo2-black.svg";
import ofpPhone from "../../images/ofp-phone.png";
import ofpLocation from "../../images/ofc-locaiton.png";
import ofpMail from "../../images/ofc-mail-icon.png";

const Sidebar = ({ isActive, setIsActive }) => {
  return (
    <>
      <div className="tp-offcanvas-wrapper">
        <div className={`tp-offcanvas dark-bg ${isActive ? "opened" : ""}`}>
          <div className="offc-top-pattern">
       
          </div>
          <div className="tp-offcanvas__top tp-border-bottom pb-30 mb-30">
            <div
              className="tp-offcanvas-close"
              onClick={() => setIsActive(false)}
            >
              <i className="fal fa-times"></i>
            </div>
            <div className="tp-offcanvas__logo mb-50">
              <Link to={MainSiteUrl.url}>
                <img src={Meta_Logo} alt="sticky-logo" />
              </Link>
            </div>
            <div className="tp-offcanvas__bottom">
              <p> We bring your ideas to better product.</p>
            </div>
            <div className="tp-offcanvas__social">
              <span>
                {" "}
                <a
                  href="https://www.facebook.com/metapercepttechservices/"
                  style={{
                    color: "whitesmoke",
                    backgroundColor: "rgb(50,77,160)",
                  }}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </span>
              <span>
                {" "}
                <a
                  href="https://twitter.com/MetaPercept"
                  style={{
                    color: "whitesmoke",
                    backgroundColor: "#656565",
                  }}
                >
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
              </span>
              <span>
                {" "}
                <a
                  href="https://www.linkedin.com/company/metapercept-technology-services-llp/mycompany/"
                  style={{
                    color: "whitesmoke",
                    backgroundColor: "rgb(244,127,32)",
                  }}
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </span>
              <span>
                {" "}
                <a
                  href="https://blog.metapercept.com/"
                  style={{
                    color: "whitesmoke",
                    backgroundColor: "rgb(252,183,19)",
                  }}
                >
                  <i className="fa-solid fa-blog"></i>
                </a>
              </span>
            </div>
          </div>
          <div className="tp-offcanvas__widget mb-40 d-none d-xl-block">
            <h3 className="tp-footer__widget-title mb-35">Get In Touch</h3>
            <div className="tp-offcanvas-cta d-flex align-items-center tp-border-bottom pb-20  mb-30">
              <span className="icon mr-20">
                <img src={ofpPhone} alt="" />
              </span>
              <span>
                <span className="d-block mb-0">Phone number</span>
                <b>
                  <a href="callto:8390905726"> Call Us: +91-(839)-090-5726 </a>
                </b>
              </span>
            </div>

            <div className="tp-offcanvas-cta d-flex align-items-center tp-border-bottom pb-20 mb-30">
              <span className="icon mr-20">
                <img src={ofpMail} alt="" />
              </span>
              <span>
                <span className="d-block mb-0">Email address</span>
                <b>
                  <a href="mailto:info@metapercept.com">
                    {" "}
                    info@metapercept.com{" "}
                  </a>
                </b>
              </span>
            </div>
            <div className="tp-offcanvas-cta d-flex align-items-center pb-20  mb-30">
              <span className="icon mr-20">
                <img src={ofpLocation} alt="" />
              </span>
              <span>
                <span className="d-block mb-0">Magarpatta Road, Pune</span>
                <b>
                  <a href="callto:02041291914">
                    {" "}
                    Call Us: +91-(020)-4129-1914{" "}
                  </a>
                </b>
              </span>
            </div>
          </div>
          <div className={`tp-mobile-menu mean-container d-xl-none`}>
            <div className="mean-bar">
              <MobileMenus />
            </div>
          </div>
          <div className="tp-offcanvas__bottom mt-80 d-none d-lg-block">
            <p>
              Our team applies its wide ranging in experience to determining.
            </p>
            <div className="tp-offcanvas-btn-wrapper">
              <Link to={`${MainSiteUrl.url}/contact`} className="tp-common-btn" id="getButton">
                get in touch
                <span>
                  <i className="fal fa-long-arrow-right"></i>
                  <i className="fal fa-long-arrow-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="offc-bottom-pattern">
          </div>
        </div>
      </div>

      <div
        className={`body-overlay ${isActive ? "opened" : ""}`}
        onClick={() => setIsActive(false)}
      ></div>
    </>
  );
};

export default Sidebar;
