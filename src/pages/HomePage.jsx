import React from 'react';
import './HomePage.css';
import HeroSection from '../components/sections/HeroSection';
import SkillsSection from '../components/sections/SkillsSection';
import ContactSection from '../components/sections/ContactSection';
import SimpleContact from '../components/sections/SimpleContact';

const HomePage = ({ setCurrentPage }) => {
  // Función para navegar a la página de proyectos (exactamente igual que el header)
  const handleViewProjects = () => {
    console.log('🚀 Ejecutando setCurrentPage(projects)...');
    setCurrentPage('projects');
  };

  // Función para descargar CV desde Google Drive
  const handleDownloadCV = () => {
    console.log('📄 Descargando CV...');
    // Convertir la URL de Google Drive para descarga directa
    const driveFileId = '1w1NMKA8GgjqqBzgmtrAEfc4XtS6CIZQz';
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${driveFileId}`;
    
    // Crear un enlace temporal para forzar la descarga
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'CV_Juan_Jose_Gonzalez_Quintero.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="home-page">
      <HeroSection 
        onViewProjects={handleViewProjects}
        onDownloadCV={handleDownloadCV}
      />
      <SkillsSection/>
      {/* <ContactSection/> */}
      <SimpleContact/>
    </div>
  );
};

export default HomePage;