import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <nav className="header__nav">
        <div className="header__content">
          <div className="header__logo">
            Portafolio Virtual
          </div>
          <div className="header__menu">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`header__link ${currentPage === 'home' ? 'header__link--active' : ''}`}
            >
              Inicio
            </button>
            <button 
              onClick={() => setCurrentPage('projects')}
              className={`header__link ${currentPage === 'projects' ? 'header__link--active' : ''}`}
            >
              Proyectos
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;