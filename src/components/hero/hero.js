import React from "react";

import "./hero.css";
import HeroHeader from "./HeroHeader.js";
import headerBg from "../../images/heroHeaderBg.png";

const Hero = () => {
  return (
    <>
      <HeroHeader backImage={headerBg} backColor="#d7dbea" title="Blog" />
    </>
  );
};
export default Hero;
