import React from 'react';
import DescriptionAtom from '../atoms/DescriptionAtom'; // Jalur yang benar
import ContactForm from '../molecules/ContactForm'; // Jalur yang benar
import './ContactSection.css'; // Jika ada CSS khusus


const ContactSection = () => {
  return (
    <section className="contact-section">
      <h2 className="contact-heading">Let's work together</h2>
      <div className="contact-content">
        <div className="contact-info">
          <DescriptionAtom variant="contact" size="long" />
          <div className="social-links">
            <img src="Vector.png" alt="Discord" className="social-icon" />
            <img src="facebook.png" alt="Facebook" className="social-icon" />
            <img src="dribbble.png" alt="Dribbble" className="social-icon" />
            <img src="nstagram.png" alt="Instagram" className="social-icon" />
            <img src="behance.png" alt="Behance" className="social-icon" />
            {/* Tambahkan ikon sosial lainnya di sini */}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactSection;
