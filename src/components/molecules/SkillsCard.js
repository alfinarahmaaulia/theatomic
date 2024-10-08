import React from 'react';
import './SkillsCard.css';


const SkillsCard = ({ iconSrc, title, description }) => {
  return (
    <div className="Skills-card">
      <div className="Skills-card-icon">
        <img src={iconSrc} alt={`${title} icon`} />
      </div>
      <div className="Card-title-description">
        <h3 className="Card-title">{title}</h3>
        {description} {/* Render the DescriptionAtom passed from SkillsSection */}
      </div>
    </div>
  );
};

export default SkillsCard;
