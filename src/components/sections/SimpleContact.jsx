import React from 'react';
import './SimpleContact.css';

const SimpleContact = () => {
  return (
    <section className="simple-contact">
      <div className="simple-contact__container">
        <div className="simple-contact__content">
          <a 
            href="mailto:juan.jose.gonzalez@email.com" 
            className="simple-contact__link"
            aria-label="Enviar email"
          >
            <span className="simple-contact__icon">📧</span>
            juan.jo.gonza70@gmail.com
          </a>
          
          <a 
            href="https://wa.me/573152301543" 
            target="_blank" 
            rel="noopener noreferrer"
            className="simple-contact__link"
            aria-label="Contactar por WhatsApp"
          >
            <span className="simple-contact__icon">📱</span>
            +57 315 230 1543
          </a>
          
          <a 
            href="https://linkedin.com/in/juan-jose-gonzalez-quintero" 
            target="_blank" 
            rel="noopener noreferrer"
            className="simple-contact__link"
            aria-label="Perfil de LinkedIn"
          >
            <span className="simple-contact__icon">💼</span>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default SimpleContact;