import React from 'react';

const LogoListMolecule = ({ logos }) => {
  return (
    <div className="logo-list">
      {logos.map((logo, index) => (
        <img key={index} src={logo.src} alt={logo.alt} className="logo-item" />
      ))}
    </div>
  );
};

export default LogoListMolecule;
