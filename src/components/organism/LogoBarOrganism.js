import React from 'react';
import LogoListMolecule from '../molecules/LogoListMolecule';
import './LogoBarOrganism.css';

const LogoBarOrganism = () => {
  const logos = [
    { src: '/google.png', alt: 'Google Logo' },
    { src: '/nike.png', alt: 'Nike Logo' },
    { src: '/samsung.png', alt: 'Samsung Logo' },
    { src: '/apple.png', alt: 'Apple Logo' },
    { src: '/adidas.png', alt: 'Adidas Logo' },
  ];

  return (
    <section className="logo-bar-organism">
      <LogoListMolecule logos={logos} /> {/* Memanggil komponen molekul */}
    </section>
  );
};

export default LogoBarOrganism;
