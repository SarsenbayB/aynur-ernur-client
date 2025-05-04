import React, { useState } from "react";
import "./Akbota.css";

import Tauelsizdik from "../../../img/galery/1.jpg";
import baksha from "../../../img/galery/4.jpg";
import baksha2 from "../../../img/galery/Aynurernur.jpg";
import baksha3 from "../../../img/galery/Dalada.jpg";

interface Image {
  src: string;
  alt: string;
}

const images: Image[] = [
  { src: Tauelsizdik, alt: "Ақбота тобы" },
  { src: baksha, alt: "Ақбота тобы" },
  { src: baksha2, alt: "Ақбота тобы" },
  { src: baksha3, alt: "Ақбота тобы" },
];

const Akbota: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const setSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <img
          src={images[currentSlide].src}
          alt={images[currentSlide].alt}
          className="slider-image"
        />
        <div className="number-text">
          {currentSlide + 1} / {images.length}
        </div>

        <button className="nav-button prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="nav-button next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      <div className="caption">{images[currentSlide].alt}</div>

      <div className="thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`thumbnail ${currentSlide === index ? "active" : ""}`}
            onClick={() => setSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Akbota;
