import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../images/IMG-20221001-WA0018.jpg";
import img2 from "../images/IMG-20230407-WA0004.jpg";
import img3 from "../images/IMG-20230409-WA0026.jpg";
import img4 from "../images/IMG-20240204-WA0016.jpg";
import img5 from "../images/IMG-20240204-WA0117.jpg";
import img6 from "../images/IMG-20240317-WA0009.jpg";
import img7 from "../images/image2.png";
import img8 from "../images/Image-2024-09-03.jpg";
import img9 from "../images/images4.png";
import "../styles/PhotoGallery.css"; // Import the CSS file

const PhotoGallery = () => {
  const navigate = useNavigate();
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const modalRef = useRef(null);
  const startPan = useRef({ x: 0, y: 0 });

  const handleImageClick = (src) => {
    setSelectedImage(src);
    setZoomLevel(1); // Reset zoom level when opening the modal
    setPan({ x: 0, y: 0 }); // Reset pan position
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const zoomChange = event.deltaY < 0 ? 0.1 : -0.1;
    setZoomLevel((prevZoomLevel) =>
      Math.min(Math.max(prevZoomLevel + zoomChange, 1), 3)
    );
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    startPan.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const dx = event.clientX - startPan.current.x;
      const dy = event.clientY - startPan.current.y;
      setPan((prevPan) => ({
        x: prevPan.x + dx,
        y: prevPan.y + dy,
      }));
      startPan.current = { x: event.clientX, y: event.clientY };
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      handleCloseModal(); // Close modal if clicking outside the image
    }
  };

  return (
    <>
      <div className="gallery-container">
        <div className="quote-container">
          <h1 className="quote-heading">
            “You never know when you’re making a memory.”
          </h1>
        </div>

        <button
          className="back-button"
          onClick={() => navigate("/birthday-message")}
        >
          Back
        </button>
        <div className="icon-container">
          {images.map((src, index) => (
            <div key={index} className="icon-wrapper">
              <img
                src={src}
                alt={`Gallery Icon ${index + 1}`}
                className="icon"
                onClick={() => handleImageClick(src)}
              />
            </div>
          ))}
        </div>

        {selectedImage && (
          <div
            className="modal"
            onClick={handleModalClick}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={modalRef}
          >
            <div className="modal-content">
              <img
                src={selectedImage}
                alt="Selected"
                style={{
                  transform: `scale(${zoomLevel}) translate(${pan.x}px, ${pan.y}px)`,
                }}
                className="modal-image"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PhotoGallery;
