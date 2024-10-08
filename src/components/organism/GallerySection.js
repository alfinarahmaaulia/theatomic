//gallery section
import React from 'react';
import './GallerySection.css';
import GalleryCard from '../atoms/GalleryCard';

const GallerySection = () => {
  const galleryItems = [
    { image: 'image.png', title: 'Project Title 1', description: 'UI, Art Direction' },
    { image: 'Image1.png', title: 'Project Title 2', description: 'UI, Art Direction' },
    { image: 'Image2.png', title: 'Project Title 3', description: 'UI, Art Direction' },
    { image: 'Image3.png', title: 'Project Title 4', description: 'UI, Art Direction' },
    { image: 'Image4.png', title: 'Project Title 5', description: 'UI, Art Direction' },
    { image: 'Image5.png', title: 'Project Title 6', description: 'UI, Art Direction' },
  ];

  return (
    <section className="gallery-section">
      <h2 className="gallery-title">Latest Work</h2>
      <div className="gallery-row">
        {galleryItems.slice(0, 3).map((item, index) => (
          <div className="gallery-column" key={index}>
            <GalleryCard 
              image={item.image} 
              title={item.title} 
              description={item.description} 
            />
          </div>
        ))}
      </div>
      <div className="gallery-row">
        {galleryItems.slice(3).map((item, index) => (
          <div className="gallery-column" key={index + 3}>
            <GalleryCard 
              image={item.image} 
              title={item.title} 
              description={item.description} 
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
