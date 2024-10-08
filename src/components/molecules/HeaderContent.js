import React from 'react';
import DescriptionAtom from '../atoms/DescriptionAtom'; // Correct relative path
import ButtonAtom from '../atoms/ButtonAtom'; // Correct relative path
import './HeaderContent.css'; // Ensure the path is correct

const HeaderContent = () => {
  return (
    <div className="Header-title"> {/* Use camel case to match CSS */}
      <div className="Branding"> {/* Use camel case to match CSS */}
        <span>Branding | Image making</span>
      </div>
      <h1 className="Visual-Designer"> {/* Use camel case to match CSS */}
        Visual Designer
      </h1>
      <DescriptionAtom variant="header" size="long" />
      <ButtonAtom label="Contact" type="contact" onClick={() => alert('Contact clicked')} />
    </div>
  );
};

export default HeaderContent;
