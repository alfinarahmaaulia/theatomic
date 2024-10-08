//gallerysection
import React from 'react';
import './GalleryCard.css';

const GalleryCard = ({ image, title, description }) => {
  return (
    <div className="gallery-card">
      <div
        className="gallery-image"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="gallery-info">
        <h3 className="gallery-title-text">{title}</h3>
        <p className="gallery-description">{description}</p>
      </div>
    </div>
  );
};

export default GalleryCard;
