// Home.js
import React from 'react';
import NavbarComponent from './components/organism/NavbarComponent';
import HeaderSection from './components/organism/HeaderSection';
import LogoBarTemplate from './components/organism/LogoBarOrganism';
import SkillsSection from './components/organism/SkillsSection';
import GallerySection from './components/organism/GallerySection';
import TestimonialSection from './components/organism/TestimonialSection';
import ContactSection from './components/organism/ContactSection';

const Home = () => {
  return (
    <>
      <NavbarComponent />
      <HeaderSection />
      <LogoBarTemplate />
      <SkillsSection />
      <GallerySection />
      <TestimonialSection />
      <ContactSection />
    </>
  );
};

export default Home;
