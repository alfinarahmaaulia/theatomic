// Impor React dan CSS
import React from 'react';
import './DescriptionAtom.css'; // Pastikan jalur ini benar

// Ekspor deskripsi di luar komponen
export const descriptions = {
  header: "This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com",
  contact: "This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com. This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com.",
  skills: "This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com.",
  testimonial: "This is a template Figma file, turned into code using Anima. Learn more at AnimaApp.com."
};

const DescriptionAtom = ({ variant, size }) => {
  // Tentukan kelas deskripsi berdasarkan varian
  let descriptionClass;
  switch (variant) {
    case 'contact':
      descriptionClass = 'contact-description';
      break;
    case 'skills':
      descriptionClass = 'skills-description';
      break;
    case 'testimonial':
      descriptionClass = 'testimonial-description';
      break;
    default:
      descriptionClass = 'header-description';
  }

  // Tentukan kelas ukuran berdasarkan ukuran
  let sizeClass;
  switch (size) {
    case 'long':
      sizeClass = 'long-description';
      break;
    case 'short':
      sizeClass = 'short-description';
      break;
    default:
      sizeClass = 'center-description'; // Ukuran default
  }

  // Ambil teks berdasarkan varian
  const text = descriptions[variant];

  return (
    <p className={`${descriptionClass} ${sizeClass} description`}>
      {text}
    </p>
  ); // Tambahkan kelas description
};

export default DescriptionAtom;
