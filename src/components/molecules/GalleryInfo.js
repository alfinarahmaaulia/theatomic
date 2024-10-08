//gallerysection
import React from 'react';
import './GalleryInfo.css';

const GalleryInfo = ({ title, description }) => {
  return (
    <div className="gallery-info">
      <h3 className="gallery-title-text">{title}</h3>
      <p className="gallery-description">{description}</p>
    </div>
  );
};

export default GalleryInfo;
