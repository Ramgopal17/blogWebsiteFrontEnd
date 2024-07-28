import React from "react";

import "./hero.css";
import HeroHeader from "./HeroHeader.js";
import headerBg from "../../images/heroHeaderBg.png";

const SiteMapHeader = () => {
  return (
    <>
      <HeroHeader backImage={headerBg} backColor="#d7dbea" title="Site Map" />
    </>
  );
};
export default SiteMapHeader;
