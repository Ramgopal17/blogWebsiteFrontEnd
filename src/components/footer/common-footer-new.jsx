import React from "react";
import { Link } from "react-router-dom";
import MainSiteUrl from "../../api/MainSiteUrl";
import blogSiteUrl from "../../api/blogSiteUrl.js";
const footer_links = [
  {
    title: "Quick Links",
    col: "col-xl-2",
    id: "company",
    links: [
      { title: "About us", link: `${MainSiteUrl.url}/aboutus` },

      { title: "Services", link: `${MainSiteUrl.url}/services` },

      { title: "Solutions", link: `${MainSiteUrl.url}/solutions` },
      { title: "Contact Us", link: `${MainSiteUrl.url}/contact` },
    ],
    otherLinks: [
      { title: "Blogs", link:`${blogSiteUrl.url}` },
      { title: "Events", link:`${blogSiteUrl.url}/blog/category/events` },
      { title: "News", link:`${blogSiteUrl.url}/blog/category/news` },
      { title: "Glossary", link: `${MainSiteUrl.url}/aboutus/terminologies` },
    ],
  },
];

const CommonFooter = () => {
  const excludedTitles = ['News', 'Events', 'Blogs'];

  const generateLink = (link) => {
    if (link.link.startsWith("https")) {
      return (
        <Link
          to={link.link}
          target={excludedTitles.includes(link.title) ? null : '_blank'}
          rel={excludedTitles.includes(link.title) ? null : 'noopener noreferrer'}
          className="font-12"
       
        >
          {link.title}
        </Link>
      );
    } else {
      return (
        <Link
        to={link.link}
        className="font-12"
        target={excludedTitles.includes(link.title) ? null : '_blank'}
        rel={excludedTitles.includes(link.title) ? null : 'noopener noreferrer'}
      >
        {link.title}
      </Link>
      );
    }
  };
  return (
    <div className="d-flex footerQuickDiv">
      {footer_links.map((item, i) => (
        <div className="tp-footer__widget mb-20 quickLinksDiv"  
        key={i}>
          <h3 className="tp-footer__widget-title mb-10">{item.title}</h3>
          <ul>
            {item.links?.map((link, id) => (
              <li key={id}>{generateLink(link)}</li>
            ))}
          </ul>
        </div>
      ))}
      {footer_links.map((item, i) => (
        <div key={i} className="tp-footer__widget mb-20">
          <h3 className="tp-footer__widget-title mb-10 invisible otherLinksHideDiv">
            Links
          </h3>
          <ul>
            {item.otherLinks?.map((link, id) => (
              <li key={id}>{generateLink(link)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CommonFooter;

const footer_content = {
  copy_right_info: (
    <>
      {" "}
      Copyright © {new Date().getFullYear()}{" "}
      <Link to={MainSiteUrl.url}>Metapercept Technology Services LLP</Link> All
      Rights Reserved{" "}
    </>
  ),
};

const { copy_right_info } = footer_content;

export const FooterCopyRight = ({ style_3, style_7, style_9 }) => {
  return (
    <>
      <div
        style={{ "--tp-theme-redical": "#324da0" }}
        className={`tp-footer__bottom pt-25 pb-25 ${
          style_3 ? "da-ft-copyright-bg" : ""
        } ${style_7 ? "law-footer__bottom red-bg" : ""} ${
          style_9 ? "ha-footer-copyright" : ""
        }`}
      >
        <div className="row align-items-center ">
          <div className="col-md-8 col-12">
            <div
              className={`tp-copyrigh-text ${
                style_3 ? "" : "text-center text-md-start"
              }`}
            >
              <span className="font-12">{copy_right_info}</span>
            </div>
          </div>
          <div className="col-md-4 d-md-block pt-4 pt-sm-0 ">
            <div className="tp-footer-menu text-center">
            <ul className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-end gap-sm-4 gap-2 font-12">
                <li className="me-0">
                  <Link to={`${MainSiteUrl.url}/privacy-policy`}>Privacy Policy</Link>
                </li>
                <li className="me-0">
                  <Link to={`${MainSiteUrl.url}/gdpr/termsandconditions`}>Terms of Service</Link>
                </li>
                <li className="me-0">
                  <Link to={`${MainSiteUrl.url}/sitemap`}>View Sitemap</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
