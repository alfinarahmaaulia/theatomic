import React from 'react';
import SkillsCard from '../molecules/SkillsCard';
import DescriptionAtom from '../atoms/DescriptionAtom'; // Import DescriptionAtom
import './SkillsSection.css';

function SkillsSection() {
  const skills = [
    { 
      iconSrc: 'path-to-icon-1.png', 
      title: 'Skill 1', 
      description: <DescriptionAtom variant="skills" size="short" /> // Use DescriptionAtom here
    },
    { 
      iconSrc: 'path-to-icon-2.png', 
      title: 'Skill 2', 
      description: <DescriptionAtom variant="skills" size="short" /> 
    },
    { 
      iconSrc: 'path-to-icon-3.png', 
      title: 'Skill 3', 
      description: <DescriptionAtom variant="skills" size="short" /> 
    },
  ];

  return (
    <section className="Skills-section">
      <div className="Cards-section">
        {skills.map((skill, index) => (
          <SkillsCard key={index} {...skill} />
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
