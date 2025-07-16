import React, { useState } from 'react';
import './App.css';
import './styles/globals.css';

// Cambiar las extensiones en los imports
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="app">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'projects' && <ProjectsPage />}
      
      <Footer />
    </div>
  );
};

export default App;