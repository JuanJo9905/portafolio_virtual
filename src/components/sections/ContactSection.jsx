import React, { useState } from 'react';
import './ContactSection.css';
import Button from '../common/Button';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
    budget: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pendiente logica para el formulario
    console.log('Formulario enviado:', formData);
    alert('¡Mensaje enviado! Te contactaré pronto.');
  };

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'juan.jose.gonzalez@email.com',
      link: 'mailto:juan.jose.gonzalez@email.com'
    },
    {
      icon: '📱',
      label: 'WhatsApp',
      value: '+57 315 230 1543',
      link: 'https://wa.me/573152301543'
    },
    {
      icon: '📍',
      label: 'Ubicación',
      value: 'Armenia, Quindío - Colombia',
      link: 'https://maps.google.com/?q=Armenia,Quindio,Colombia'
    },
    {
      icon: '🌐',
      label: 'LinkedIn',
      value: 'linkedin.com/in/juanjgonzalez',
      link: 'https://linkedin.com/in/juanjgonzalez'
    }
  ];

  const projectTypes = [
    'API REST',
    'Aplicación Web Completa',
    'Base de Datos',
    'Microservicios',
    'Integración de Sistemas',
    'Consultoría Técnica',
    'Otro'
  ];

  const budgetRanges = [
    'Menos de $1,000 USD',
    '$1,000 - $5,000 USD',
    '$5,000 - $10,000 USD',
    '$10,000 - $25,000 USD',
    'Más de $25,000 USD',
    'A discutir'
  ];

  return (
    <section className="contact">
      <div className="contact__container">
        <div className="contact__header">
          <h2 className="contact__title">¿Necesitas un Backend sólido?</h2>
          <p className="contact__subtitle">
            Especializado en crear APIs robustas, bases de datos eficientes y arquitecturas escalables. 
            Hablemos de tu proyecto y cómo puedo ayudarte a llevarlo al siguiente nivel.
          </p>
        </div>

        <div className="contact__content">
          {/* Información de Contacto */}
          <div className="contact__info">
            <h3 className="contact__info-title">Información de Contacto</h3>
            <div className="contact__info-grid">
              {contactInfo.map((info, index) => (
                <a 
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__info-item"
                >
                  <div className="contact__info-icon">{info.icon}</div>
                  <div className="contact__info-details">
                    <span className="contact__info-label">{info.label}</span>
                    <span className="contact__info-value">{info.value}</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Disponibilidad */}
            <div className="contact__availability">
              <h4 className="contact__availability-title">Disponibilidad</h4>
              <div className="availability-status">
                <div className="status-indicator status-indicator--available"></div>
                <span>Disponible para nuevos proyectos</span>
              </div>
              <p className="availability-note">
                Respuesta típica en menos de 24 horas
              </p>
            </div>

            {/* Llamado a la acción */}
            <div className="contact__quick-actions">
              <Button 
                variant="primary" 
                className="contact__whatsapp-btn"
                onClick={() => window.open('https://wa.me/573152301543', '_blank')}
              >
                <span>💬</span>
                WhatsApp Directo
              </Button>
              <Button 
                variant="outline" 
                className="contact__calendar-btn"
                onClick={() => window.open('https://calendly.com/juan-jose-gonzalez', '_blank')}
              >
                <span>📅</span>
                Agendar Reunión
              </Button>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div className="contact__form-wrapper">
            <h3 className="contact__form-title">Cuéntame sobre tu proyecto</h3>
            <div className="contact__form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Nombre *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company" className="form-label">Empresa</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Nombre de tu empresa (opcional)"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="projectType" className="form-label">Tipo de Proyecto *</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Selecciona un tipo</option>
                    {projectTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="budget" className="form-label">Presupuesto Estimado</label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Selecciona un rango (opcional)</option>
                  {budgetRanges.map((range, index) => (
                    <option key={index} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Descripción del Proyecto *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Describe tu proyecto, objetivos, timeline y cualquier detalle técnico relevante..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <Button 
                variant="primary" 
                className="contact__submit-btn"
                onClick={handleSubmit}
              >
                Enviar Propuesta
                <span className="btn__arrow">→</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Sección de FAQ */}
        <div className="contact__faq">
          <h3 className="contact__faq-title">Preguntas Frecuentes</h3>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>¿Cuál es tu tiempo de respuesta?</h4>
              <p>Respondo todos los mensajes en menos de 24 horas, usualmente el mismo día.</p>
            </div>
            <div className="faq-item">
              <h4>¿Trabajas con clientes internacionales?</h4>
              <p>Sí, trabajo con clientes de todo el mundo. Manejo inglés fluido y diferentes zonas horarias.</p>
            </div>
            <div className="faq-item">
              <h4>¿Qué incluye tu servicio?</h4>
              <p>Desarrollo completo, documentación, testing, deploy y soporte post-lanzamiento.</p>
            </div>
            <div className="faq-item">
              <h4>¿Manejas proyectos a largo plazo?</h4>
              <p>Absolutamente. Prefiero relaciones a largo plazo y estar disponible para evolucionar tu producto.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;