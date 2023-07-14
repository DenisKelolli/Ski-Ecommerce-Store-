import React, { useState, useEffect } from 'react';
import Ski1 from "../../assets/Ski1.png"
import Ski2 from "../../assets/Ski2.png"
import Ski3 from "../../assets/Ski3.png"


const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [Ski1, Ski2, Ski3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <img src={images[currentImage]} alt={`Image ${currentImage + 1}`} />
    </div>
  );
};

export default Carousel;
