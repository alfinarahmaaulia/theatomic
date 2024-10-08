import React from 'react';
import './TestimonialCard.css';

const TestimonialCard = ({ name, company, image, stars, testimonial }) => {
  return (
    <div className="testimonial-card">
      {testimonial} {/* Render the DescriptionAtom passed from TestimonialSection */}
      <div className="client-image-info">
        <img src={image} alt={`${name}'s avatar`} className="client-image" />
        <div className="client-info-stars">
        <div className="stars">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="star">
            {index < stars ? '★' : '☆'}
          </span>
        ))}
      </div>
      <div className="name-company">
        <div className="name">{name}</div>
        <div className="company">{company}</div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
