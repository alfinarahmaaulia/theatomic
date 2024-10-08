import React from 'react';
import './ContactForm.css'; 
import ButtonAtom from '../atoms/ButtonAtom'; // Jalur relatif yang benar

const ContactForm = () => {
  return (
    <div className="contact-form">
    <div className="input-fields">
      <div className="input-field">
        <input type="email" placeholder="Your Email" className="input" />
      </div>
      <div className="input-field">
        <input type="text" placeholder="Your Name" className="input" />
      </div>
    </div>
            <ButtonAtom label="Submit" type="submit" onClick={() => alert('Form submitted')} />
    </div>
  );
};

export default ContactForm;