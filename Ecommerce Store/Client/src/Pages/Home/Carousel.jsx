import React, { useState, useEffect } from 'react';
import "./Carousel.css"
import Ski1 from "../../assets/Ski1.png";
import Ski2 from "../../assets/Ski2.png";
import Ski3 from "../../assets/Ski3.png";

const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [Ski3, Ski2, Ski1];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="carousel-container">
      <img src={images[currentImage]} alt={`Image ${currentImage + 1}`} className="carousel-image" />
    </div>
  );
};

export default Carousel;