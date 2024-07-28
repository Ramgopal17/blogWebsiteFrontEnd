import React from "react";

import "./hero.css";
import HeroHeader from "./HeroHeader.js";
import headerBg from "../../images/heroHeaderBg.png";

const PrivacyHeader = () => {
  return (
    <>
      <HeroHeader backImage={headerBg} backColor="#d7dbea" title="Privacy Policy" />
    </>
  );
};
export default PrivacyHeader;
