import React from 'react';
import TestimonialCard from '../molecules/TestimonialCard';
import DescriptionAtom from '../atoms/DescriptionAtom'; // Import DescriptionAtom
import './TestimonialSection.css';

const TestimonialSection = () => {
  const testimonials = [
    {
      // Remove the testimonial text from here
      image: "https://medias.auto2000.co.id/sys-master-hybrismedia/h9f/h05/8826518994974/gr_0014_1-super-white_optimized.png",
      stars: 5,
      name: 'Gemma Nolen',
      company: 'Google',
      testimonial: <DescriptionAtom variant="testimonial" size="long" />, // Use DescriptionAtom here
    },
    {
        // Remove the testimonial text from here
        image: 'Client-image.png',
        stars: 5,
        name: 'Gemma Nolen',
        company: 'Google',
        testimonial: <DescriptionAtom variant="testimonial" size="long" />, // Use DescriptionAtom here
      },
      {
        // Remove the testimonial text from here
        image: 'Client-image.png',
        stars: 5,
        name: 'Gemma Nolen',
        company: 'Google',
        testimonial: <DescriptionAtom variant="testimonial" size="long" />, // Use DescriptionAtom here
      },
      {
        // Remove the testimonial text from here
        image: 'Client-image.png',
        stars: 5,
        name: 'Gemma Nolen',
        company: 'Google',
        testimonial: <DescriptionAtom variant="testimonial" size="long" />, // Use DescriptionAtom here
      },
      {
        // Remove the testimonial text from here
        image: 'Client-image.png',
        stars: 5,
        name: 'Gemma Nolen',
        company: 'Google',
        testimonial: <DescriptionAtom variant="testimonial" size="long" />, // Use DescriptionAtom here
      },
      {
        // Remove the testimonial text from here
        image: 'Client-image.png',
        stars: 5,
        name: 'Gemma Nolen',
        company: 'Google',
        testimonial: <DescriptionAtom variant="testimonial" size="long" />, // Use DescriptionAtom here
      },
      {
        // Remove the testimonial text from here
        image: 'Client-image.png',
        stars: 5,
        name: 'Gemma Nolen',
        company: 'Google',
        testimonial: <DescriptionAtom variant="testimonial" size="long" />, // Use DescriptionAtom here
      },
      {
        // Remove the testimonial text from here
        image: 'Client-image.png',
        stars: 5,
        name: 'Gemma Nolen',
        company: 'Google',
        testimonial: <DescriptionAtom variant="testimonial" size="long" />, // Use DescriptionAtom here
      },
      {
        // Remove the testimonial text from here
        image: 'Client-image.png',
        stars: 5,
        name: 'Gemma Nolen',
        company: 'Google',
        testimonial: <DescriptionAtom variant="testimonial" size="long" />, // Use DescriptionAtom here
      },
    // Tambahkan lebih banyak testimonial jika diperlukan
  ];

  return (
    <section className="testimonial-section">
      <h2 className="testimonial-heading">Testimonial</h2>
      <div className="cards-section">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
