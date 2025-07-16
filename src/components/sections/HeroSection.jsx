import React from 'react';
import './HeroSection.css';
import Button from '../common/Button';

const HeroSection = ({ onViewProjects, onDownloadCV }) => {
  console.log('🔧 HeroSection recibió props:', { onViewProjects, onDownloadCV });
  
  return (
    <section className="hero">
      <div className="hero__background">
        <div className="hero__particles"></div>
        <div className="hero__code-rain">
          <div className="code-line">{"{ backend: 'especialista' }"}</div>
          <div className="code-line">{"const desarrollador = 'fullstack'"}</div>
          <div className="code-line">{"ubicacion: 'Colombia'"}</div>
          <div className="code-line">{"pasion: 'servidor'"}</div>
        </div>
      </div>
      
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__text">
            <div className="hero__label">
              DESARROLLADOR FULL-STACK
            </div>
            
            <h1 className="hero__name">
              JUAN JOSÉ<br/>
              GONZÁLEZ QUINTERO
            </h1>
            
            <p className="hero__description">
              Especialista en desarrollo Back-end con sede en Colombia,<br/>
              creando arquitecturas robustas y APIs escalables
            </p>
            
            <div className="hero__location">
              <span className="location-icon">📍</span>
              Colombia
            </div>
            
            <div className="hero__actions">
              <button 
                className="btn btn--primary" 
                onClick={onViewProjects}
              >
                Ver Proyectos
                <span className="btn__arrow">→</span>
              </button>
              <button 
                className="btn btn--outline" 
                onClick={onDownloadCV}
              >
                Descargar CV
              </button>
            </div>
          </div>
          
          <div className="hero__visual">
            <div className="terminal">
              <div className="terminal__header">
                <div className="terminal__controls">
                  <span className="control control--red"></span>
                  <span className="control control--yellow"></span>
                  <span className="control control--green"></span>
                </div>
                <div className="terminal__title">juan@backend-server</div>
              </div>
              <div className="terminal__body">
                <div className="terminal__line">
                  <span className="prompt">$</span> author
                </div>
                <div className="terminal__output">juan-jose-gonzalez</div>
                
                <div className="terminal__line">
                  <span className="prompt">$</span> skills -- backend
                </div>
                <div className="terminal__output">
                  ✓ Node.js & React<br/>
                  ✓ Python<br/>
                  ✓ Bases de Datos<br/>
                  ✓ APIs RESTful<br/>
                  ✓ Microservicios
                </div>
                
                <div className="terminal__line">
                  <span className="prompt">$</span> status
                </div>
                <div className="terminal__output">
                  <span className="status-available">🟢 Disponible para proyectos</span>
                </div>
                
                <div className="terminal__cursor">_</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;