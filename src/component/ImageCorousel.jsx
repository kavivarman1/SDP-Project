// src/components/ImageCarousel.js
import React, { useState } from 'react';
import './ImageCarousel.css';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="image-carousel">
      <button onClick={handlePrev} className="carousel-button prev">
        &#10094;
      </button>
      <img
        src={images[currentIndex]}
        alt={`Gallery ${currentIndex + 1}`}
        className="carousel-image"
      />
      <button onClick={handleNext} className="carousel-button next">
        &#10095;
      </button>
    </div>
  );
};

export default ImageCarousel;

/* src/components/ImageCarousel.css */

