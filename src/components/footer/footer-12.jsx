import SocialLinks from "./social-links-new";
import React from "react";
import { Link } from "react-router-dom";
import CommonFooter, {
  FooterCopyRight,
} from "./common-footer-new";
import Meta_Logo from "../../images/Metapercept_footer_logo2-black.svg";
import Iso1 from "../../images/iso1.png";
import Iso2 from "../../images/iso2.png";
import Nascom from "../../images/NASSCOM_Badge_footer.png";
import "./footer.css";
import MainSiteUrl from "../../api/MainSiteUrl";


// footer_links data
const SubscribeEmailValidation = (e) => {
  let value = e.target.value;
  const errorMessage = document.getElementById("errorSubscribeEmail");
  const emailRegex = "^[A-Za-z0-9_.]{3,}@[A-za-z0-9]{3,}[.]{1}[A-Za-z.]{2,6}$";

  errorMessage.style.display = "block";
  if (value < 1) {
    errorMessage.innerHTML = "Please provide a email id";
    errorMessage.style.display = "none";
  } else if (!value.match(emailRegex)) {
    errorMessage.innerHTML = "Please provide a valid email id";
  } else {
    errorMessage.style.display = "none";
  }
};
const clearError = (e) => {

  const removeError = document.getElementById(e);
  removeError.style.display = "none";
};
const footer_content = {
  footer_logo: "/assets/img/footer/Metapercept_footer_logo2-black.svg",
  about: "About Us",
  about_des: <>Subscribe with us</>,
  phone_icon: "/assets/img/footer/call-icon.png",
  address: (
    <>
      Office Number 4080, <br /> Marvel Fuego, <br /> Magarpatta Road, <br />{" "}
      Pune Maharashtra, India
    </>
  ),
  phone: <>+91-(839)-090-5726</>,
  tel: "8390905726",
};

const { about_des, } =footer_content;

const Footer = ({ tp_border }) => {
  const isFormValid = (e) => {
    const ErrorMsg = document.getElementsByClassName("errorMessage");
    let count = 0;
    for (let ele of ErrorMsg) {
      if (ele.style.display === "block") count++;
    }
    if (count) {
      e.preventDefault();
    }

    return count ? false : true;
  };

  return (
    <>
      <style jsx="true" global="true">
        {`
          .errorMessage {
            display: none;
            margin: 10px 0 0 0;
            color: red;
          }
          .tp-footer-from form button {
            background-color: rgb(50, 77, 160);
          }
          .tp-footer-from form button:hover {
            background-color: rgb(108, 96, 254);
          }
          .subscribeEmailBtn {
          .tp-footer-from form button {
            width: auto;
            padding: 0 10px;
          }
        }
          .subscribeDiv {
            max-width: 100%;
            width: 100%;
          }
          .certificateImg {
            & img {
              margin-right: 10px;
            }
          }

          @media (max-width: 1200px) {
            .footerDivContainer > * {
              width: 20%;
            }
            .footerDivContainer .footerLogoDiv,
            .footerDivContainer .footerOfficesDiv {
              width: 40%;
            }
            .subscribeDiv {
            width: 80%;
          }
        }
          @media (max-width: 992px) {
            .subscribeDiv {
              width: 350px;
            }
          }

          @media (max-width: 768px) {
            .footerDivContainer > *,
            .footerDivContainer .footerOfficesDiv {
              width: 30%;
            }
            .footerDivContainer .footerLogoDiv,
            .footerDivContainer .footerContactDiv,
            .footerDivContainer  .footerSocialDiv {
              width: 50%;
            }
          }
          @media (max-width: 576px) {
            .footerDivContainer > *,
            .footerDivContainer .footerOfficesDiv {
              width: 40%;
            }
            .footerDivContainer .footerLogoDiv,
            .footerDivContainer .footerContactDiv,
            .footerDivContainer  .footerSocialDiv {
              width: 50%;
            }
          }

          @media (max-width:425px) {
            .footerDivContainer > *,
            .footerDivContainer .footerOfficesDiv {
              width: 100%;
            }
            .footerDivContainer .footerLogoDiv,
            .footerDivContainer .footerContactDiv,
            .footerDivContainer  .footerSocialDiv {
              width: 100%;
            }
            .footerQuickDiv {
              display:block !important;
            }
            .otherLinksHideDiv{
              display:none;
            }
            .quickLinksDiv{
              margin-bottom:0px;
            }
          }

          .tp-footer__widget .tp-footer__widget-title{
            color:#fff !important;
          }
          .tp-footer__widget ul li{
            font-size:12px !important;
            color:#c9c9c6 !important;
          }
          .tp-footer__widget ul li a:hover{
          
            color:#cd5c5c!important;
          }
          .locationList{
            font-size:12px !important;
          }
          .socialLinkParent {
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(2, 1fr);
          }
          .socialLinkParent > * {
            width: 50%;
            flex-shrink: 0;
          }
          @media (max-width: 768px) {
            .socialLinkParent {
              gap: 10px;
              grid-template-columns: repeat(4, 1fr);
            }
          }
          .tp-footer-from form button {
           padding: 5px;
       
        }
        .bs-footer__top-social {
          display: flex !important;
        }
        .bs-footer__top-social a,
        .da-footer__top-social a {
          font-size: 16px;
          display: inline-block;
          width: 35px;
          height: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
           text-align: center;
          margin-right: 5px;
          border-radius: 8px;
        }
        .bs-footer__top-social a:hover,
        .da-footer__top-social a:hover {
          border-color: transparent;
        
        }
        `}
      </style>

      <footer className="HideHeaderFooter theme-bg-black">
        <div
          className={`bs-footer ${tp_border && "tp-border-top"}`}
          style={{ backgroundColor: "rgb(30, 34, 34)" }}
        >
          <div className="container">
            <div className="bs-footer__main pb-10 pt-25 tp-border-bottom footerContent">
              <div className="d-flex flex-wrap justify-content-between footerDivContainer">
                <div className="footerLogoDiv">
                  <div className="tp-footer__widget mb-10">
                    <div className="bs-footer__top-logo mb-10">
                      <Link to={MainSiteUrl.url}>
                        <img
                          src={Meta_Logo}
                          alt="metapercept logo"
                          style={{ width: "200px" }}
                        />
                      </Link>
                    </div>
                    <p
                      className="pe-xl-0 pe-md-5 font-12 mb-0"
                      style={{ lineHeight: "18px" }}
                    >
                      {about_des}
                    </p>
                  </div>
                  <div className=" mb-3 mb-lg-0">
                    <div className="tp-footer__widget pe-xl-0 pe-md-0  subscribeDiv ">
                      <div className="tp-footer-from p-relative">
                      <form
                          method="post"
                          action="https://metapercept.us7.list-manage.com/subscribe/post?u=8b858eea4117668a03131d383&amp;id=ebad419a48&amp;f_id=0020c4e4f0"
                          id="mc-embedded-subscribe-form"
                          name="mc-embedded-subscribe-form"
                          className="validate"
                          target="_blank"
                          // action="https://cfed3d59.sibforms.com/serve/MUIFAAQuk_u9WnIQCnfRSQRDr6tsGW02CFsAaqR-YpfsGA1BPLNNRbGXRv0x9e4KlZsFmKI5FoLlPU1hHvmAdB8-T_blKEXpJ3tSaWPa-44duJsbdTcYQtXXO3jnTgLW_wn2Yd6_0vXAr9N-KCqb8mOwh53AaLspAPoA-xVKkJO3oTSXe4rS678QVt87n2qp6r-VxWNFuDHGvG2X"
                          onSubmit={isFormValid}
                        >
                          <span>
                            <i
                              className="fas fa-envelope-open"
                              style={{ color: "rgb(50, 77, 160)" }}
                            ></i>
                          </span>
                          <input
                            className="required email"
                            type="email"
                            placeholder="Enter your email"
                            id="EMAIL"
                            name="EMAIL"
                            autoComplete="off"
                            required
                            data-required="true"
                            onBlur={SubscribeEmailValidation}
                            onFocus={() => clearError("errorSubscribeEmail")}
                          />
                          <button
                            type="submit"
                            aria-label="subscribe"
                            className="subscribeEmailBtn"
                          >
                            subscribe
                          </button>
                        </form>
                      </div>
                      <p className="errorMessage" id="errorSubscribeEmail">
                        error div
                      </p>
                      <p className="tp-form-note p-0 mt-5 mb-30"></p>
                    </div>
               
                  </div>
                </div>
                <CommonFooter />
           <div className="footerContactDiv ">
                  <div className="tp-footer__widget  mb-20">
                    <h3 className="tp-footer__widget-title mb-10">
                      Contact Details
                    </h3>

                    <ul>
                      <li>
                        <a href="tel:8390905726" className="font-12">
                          Line 1:+91-839-090-5726
                        </a>
                      </li>
                      <li>
                        <a href="tel:7420965726" className="font-12">
                          Line 2:+91-742-096-5726
                        </a>
                      </li>
                    </ul>

                    <ul translate="no">
                      <li>
                        <a
                          href="mailto:sales@metapercept.com"
                          className="font-12"
                        >
                          sales@metapercept.com
                        </a>
                      </li>
                      <li>
                        <a
                          href="mailto:info@metapercept.com"
                          className="font-12"
                        >
                          info@metapercept.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="footerOfficesDiv">
                  <div className="tp-footer__widget  mb-0 locationDiv">
                    <h3 className="tp-footer__widget-title mb-10">Offices</h3>

                    <div className="tp-footer-cta d-flex align-items-center  justify-content-start mb-10">
                      <span>
                        <span
                          className="d-block mb-0 font-12"
                          style={{
                            color: "white",
                          }}
                        >
                          <div translate="no">
                            <ul translate="no" style={{ color: "#c9c9ce" }} className="locationList">
                              <li>India Office:</li>
                              <li className="mb-10">
                                Pune, Maharashtra, India
                              </li>
                              <li>USA Office:</li>
                              <li>Arlington, Texas, USA</li>
                            </ul>
                          </div>
                          <div translate="no"></div>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="footerSocialDiv bs-footer__top-social  mb-20">
                  <div className="tp-footer__widget  mb-0 locationDiv">
                    <h3 className="tp-footer__widget-title mb-10">
                      Social Links
                    </h3>
                    {/* <div className="socialLinkParent"> */}
                    <SocialLinks />
                    {/* </div> */}
                  </div>
                </div>
                <div className="footerAccreditationDiv">
                  <div className="tp-footer__widget  mb-0 locationDiv">
                    <h3 className="tp-footer__widget-title mb-10">
                      Accrediations
                    </h3>

                    <div className="tp-footer-cta d-flex flex-column   justify-content-start gap-4 mb-10">
                      {/* <div className="certificateImg"> */}
                      <div>
                        <img
                          src={Nascom}
                          width={90}
                          alt=""
                          style={{borderRadius:"0px"}}
                        />
                      </div>
                      <div>
                      <img
                          src={Iso1}
                          alt=""
                          width={35}
                          className="mr-10"
                        />
                        <img
                          src={Iso2}
                          alt=""
                          width={35}
                        />
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* footer copy right start */}
            <FooterCopyRight />
            {/* footer copy right end */}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
