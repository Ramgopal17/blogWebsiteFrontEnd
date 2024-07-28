import React, { useState } from "react";

import { Link } from "react-router-dom";
import "./style.css";
const MobileMenu = () => {
  const [menuActive, setMenuState] = useState(false);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <div>
      <div className={`mobileMenu ${menuActive ? "show" : ""}`}>
        <div className="menu-close">
          <div className="clox" onClick={() => setMenuState(!menuActive)}>
            <i className="ti-close"></i>
          </div>
        </div>

        <ul className="responsivemenu">
          <ul className="nav navbar-nav mb-2 mb-lg-0">
            <li className="menu-item-has-children">
              <Link onClick={ClickHandler} to="/">
                Home
              </Link>
            </li>
            <li className="menu-item-has-children">
              <Link to="https://metapercept.com/services" target="_blank">
                Services
              </Link>
            </li>
            <li>
              <Link
                onClick={ClickHandler}
                to="https://metapercept.com/solutions"
                target="_blank"
              >
                Solutions
              </Link>
            </li>
            <li>
              <Link
                onClick={ClickHandler}
                to="https://metapercept.com/aboutus"
                target="_blank"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                onClick={ClickHandler}
                to="https://metapercept.com/contact"
                target="_blank"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </ul>
      </div>

      <div className="showmenu" onClick={() => setMenuState(!menuActive)}>
        <button type="button" className="navbar-toggler open-btn">
          <span className="icon-bar first-angle"></span>
          <span className="icon-bar middle-angle"></span>
          <span className="icon-bar last-angle"></span>
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
