import React from 'react';
import "./Hero.css"

import Ski3 from "../../assets/Ski3.png";

const Hero = () => {
  return (
    <div className="hero-container">
      <img src={Ski3} className="hero-image" />
    </div>
  );
};

export default Hero;