import React, { useState, useEffect } from 'react';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoading, setImageLoading] = useState({});

  // Configuración de GitHub
  const GITHUB_USERNAME = 'JuanJo9905'; // ✅ Tu username

  // Función para obtener repositorios de GitHub
  const fetchGitHubRepos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Obteniendo repositorios de GitHub...');
      
      // Obtener repositorios del usuario ordenados por relevancia
      const reposResponse = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          }
        }
      );

      if (!reposResponse.ok) {
        throw new Error(`Error ${reposResponse.status}: ${reposResponse.statusText}`);
      }

      const reposData = await reposResponse.json();
      console.log('Repositorios obtenidos:', reposData.length);

      // Filtrar y procesar repositorios
      const processedProjects = await Promise.all(
        reposData
          .filter(repo => {
            // Excluir forks
            if (repo.fork) return false;
            
            // Excluir repos sin descripción
            if (!repo.description) return false;
            
            // Excluir repositorios que son solo configuraciones o muy básicos
            const excludeNames = ['config', 'dotfiles', '.github', 'profile', 'readme'];
            if (excludeNames.some(name => repo.name.toLowerCase().includes(name))) return false;
            
            return true;
          })
          .map(async (repo, index) => {
            console.log(`Procesando: ${repo.name}`);
            
            // Obtener lenguajes del repositorio
            let languages = [];
            try {
              const languagesResponse = await fetch(repo.languages_url);
              if (languagesResponse.ok) {
                const languagesData = await languagesResponse.json();
                languages = Object.keys(languagesData).slice(0, 5);
              }
            } catch (err) {
              console.log(`Error obteniendo lenguajes para ${repo.name}:`, err);
            }

            // Configurar URLs de imágenes - Intentar con URL directa a imagen personalizada
            let socialPreviewUrl;
            
              // Usar OpenGraph para generar previsualizacion
            socialPreviewUrl = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}?t=${Date.now()}`;
            console.log(`URL OpenGraph para ${repo.name}: ${socialPreviewUrl}`);
            

            // Determinar categoría basada en lenguajes
            const hasBackend = languages.some(lang => 
              ['JavaScript', 'Python', 'Java', 'C#', 'Go', 'Ruby', 'PHP', 'TypeScript'].includes(lang)
            );
            const hasFrontend = languages.some(lang => 
              ['HTML', 'CSS', 'Vue', 'React', 'Angular'].includes(lang)
            );
            
            let category = 'Backend';
            if (hasBackend && hasFrontend) {
              category = 'Full-Stack';
            } else if (hasFrontend && !hasBackend) {
              category = 'Frontend';
            }

            // Determinar estado del proyecto
            const lastUpdate = new Date(repo.updated_at);
            const isRecent = (Date.now() - lastUpdate.getTime()) < 60 * 24 * 60 * 60 * 1000; // 60 días
            const status = isRecent ? 'En desarrollo' : 'Completado';

            // Generar características del proyecto
            const features = [
              `⭐ ${repo.stargazers_count} estrellas en GitHub`,
              `🍴 ${repo.forks_count} forks`,
              `👁️ ${repo.watchers_count} watchers`,
              `📅 Actualizado: ${lastUpdate.toLocaleDateString('es-ES')}`,
              repo.license ? `📜 Licencia: ${repo.license.name}` : '📜 Sin licencia específica'
            ];

            // Gradientes para diferentes proyectos (expandido para más proyectos)
            const gradients = [
              'bg-gradient-to-br from-green-400 to-blue-600',
              'bg-gradient-to-br from-purple-400 to-pink-600',
              'bg-gradient-to-br from-yellow-400 to-orange-600',
              'bg-gradient-to-br from-indigo-400 to-purple-600',
              'bg-gradient-to-br from-teal-400 to-blue-600',
              'bg-gradient-to-br from-red-400 to-pink-600',
              'bg-gradient-to-br from-emerald-400 to-cyan-600',
              'bg-gradient-to-br from-violet-400 to-purple-600',
              'bg-gradient-to-br from-amber-400 to-orange-600',
              'bg-gradient-to-br from-lime-400 to-green-600',
              'bg-gradient-to-br from-rose-400 to-red-600',
              'bg-gradient-to-br from-sky-400 to-blue-600',
              'bg-gradient-to-br from-fuchsia-400 to-pink-600',
              'bg-gradient-to-br from-cyan-400 to-teal-600',
              'bg-gradient-to-br from-orange-400 to-red-600'
            ];

            return {
              id: repo.id,
              title: repo.name
                .replace(/-/g, ' ')
                .replace(/_/g, ' ')
                .replace(/\b\w/g, letter => letter.toUpperCase()),
              category,
              description: repo.description || 'Proyecto desarrollado con tecnologías modernas.',
              technologies: languages.length > 0 ? languages : ['JavaScript'],
              features,
              image: gradients[index % gradients.length],
              socialPreviewUrl,
              status,
              year: new Date(repo.created_at).getFullYear().toString(),
              githubUrl: repo.html_url,
              demoUrl: repo.homepage || null,
              stars: repo.stargazers_count,
              lastUpdate: repo.updated_at
            };
          })
      );

      console.log('Proyectos procesados:', processedProjects.length);
      
      // Ordenar proyectos por relevancia (estrellas, forks, actualización reciente)
      const sortedProjects = processedProjects.sort((a, b) => {
        // Priorizar proyectos con más estrellas
        if (a.stars !== b.stars) return b.stars - a.stars;
        
        // Luego por fecha de actualización (más recientes primero)
        return new Date(b.lastUpdate) - new Date(a.lastUpdate);
      });
      
      setProjects(sortedProjects);
      setLoading(false);

    } catch (err) {
      console.error('Error al obtener repositorios:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Función para manejar errores de carga de imagen
  const handleImageError = (e) => {
    const img = e.target;
    const container = img.parentElement;
    const projectId = img.getAttribute('data-project-id');
    const currentSrc = img.src;
    
    console.log(`Error cargando imagen: ${currentSrc}`);
    
    // Actualizar estado de loading
    setImageLoading(prev => ({ ...prev, [projectId]: false }));
    
    // Si falló la imagen personalizada, intentar con OpenGraph
    if (currentSrc.includes('repository-images.githubusercontent.com')) {
      console.log(`Imagen personalizada falló, intentando con OpenGraph...`);
      const project = projects.find(p => p.id.toString() === projectId);
      if (project) {
        const fallbackUrl = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${project.githubUrl.split('/').pop()}?t=${Date.now()}`;
        img.src = fallbackUrl;
        return;
      }
    }
    
    // Si ya falló OpenGraph también, mostrar fallback final
    console.log(`Todas las URLs fallaron, mostrando emoji laptop`);
    showFallbackOverlay(img, container);
  };

  // Función para mostrar el overlay de fallback
  const showFallbackOverlay = (img, container) => {
    console.log('Mostrando fondo por defecto');
    
    // Ocultar la imagen
    img.style.display = 'none';
    
    // Remover overlay existente si hay uno
    const existingOverlay = container.querySelector('.project__overlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }
    
    // Crear y mostrar el fallback con emoji laptop
    const overlay = document.createElement('div');
    overlay.className = 'project__overlay project__overlay--laptop';
    overlay.innerHTML = '<span class="project__icon">💻</span>';
    
    // Aplicar clase de fallback al contenedor
    container.classList.add('project__image--fallback');
    container.classList.remove('project__image--with-github-preview');
    
    // Agregar el overlay
    container.appendChild(overlay);
  };

  // Función para manejar cuando la imagen se carga correctamente
  const handleImageLoad = (e) => {
    const projectId = e.target.getAttribute('data-project-id');
    setImageLoading(prev => ({ ...prev, [projectId]: false }));
    console.log(`✅ Imagen Social Preview cargada correctamente para proyecto ${projectId}`);
    
    // Limpiar cualquier timeout pendiente
    const img = e.target;
    if (img.loadTimeout) {
      clearTimeout(img.loadTimeout);
    }
  };

  // Función para configurar timeout de carga de imagen
  const setupImageTimeout = (img, projectId) => {
    // Timeout de 5 segundos para cargar la imagen
    img.loadTimeout = setTimeout(() => {
      console.log(`Timeout para imagen del proyecto ${projectId}`);
      handleImageError({ target: img });
    }, 5000);
  };

  // Cargar datos de GitHub al montar el componente
  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  // Componente de error
  if (error) {
    return (
      <div className="projects-page">
        <div className="projects__container">
          <div className="projects__error">
            <h3>❌ Error al cargar proyectos</h3>
            <p>{error}</p>
            <button onClick={fetchGitHubRepos} className="retry-btn">
              🔄 Reintentar
            </button>
            <p style={{marginTop: '1rem', fontSize: '0.9rem', opacity: 0.7}}>
              Verificando repositorios públicos de: <strong>JuanJo9905</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Componente de carga
  if (loading) {
    return (
      <div className="projects-page">
        <div className="projects__container">
          <div className="projects__loading">
            <div className="loading-spinner"></div>
            <p>Cargando proyectos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <div className="projects__container">
        <div className="projects__header">
          <h1 className="projects__title">
            Explora mis proyectos 🚀👩‍🚀
          </h1>
        </div>

        {projects.length === 0 ? (
          <div className="projects__empty">
            <p>No se encontraron proyectos públicos con descripción</p>
            <button onClick={fetchGitHubRepos} className="retry-btn">
              🔄 Recargar
            </button>
          </div>
        ) : (
          <div className="projects__archiver">
          {/* Pestañas del archivador */}
          <div className="archiver__tabs">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`archiver__tab ${selectedProject === index ? 'archiver__tab--active' : ''}`}
                onClick={() => setSelectedProject(index)}
              >
                <div className="tab__header">
                  <span className="tab__number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="tab__category">{project.category}</span>
                </div>
                <h3 className="tab__title">{project.title}</h3>
                <div className="tab__year">{project.year}</div>
                {project.stars > 0 && (
                  <div className="tab__stars">⭐ {project.stars}</div>
                )}
              </div>
            ))}
          </div>

          {/* Contenido del proyecto seleccionado */}
          <div className="archiver__content">
            <div className="project__preview">
              <div className="project__visual">
                <div className={`project__image ${projects[selectedProject]?.socialPreviewUrl ? 'project__image--with-github-preview' : projects[selectedProject]?.image}`}>
                  {/*Mostrar imagen de Social Preview de GitHub */}
                  {projects[selectedProject]?.socialPreviewUrl ? (
                    <>
                      {imageLoading[projects[selectedProject].id] && (
                        <div className="project__image--loading">
                          <div className="loading-spinner"></div>
                        </div>
                      )}
                      <img
                        src={projects[selectedProject].socialPreviewUrl}
                        alt={`Social Preview de ${projects[selectedProject].title}`}
                        data-project-id={projects[selectedProject].id}
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                        onLoadStart={(e) => {
                          const projectId = projects[selectedProject].id;
                          setImageLoading(prev => ({ ...prev, [projectId]: true }));
                          setupImageTimeout(e.target, projectId);
                        }}
                        style={{
                          display: imageLoading[projects[selectedProject].id] ? 'none' : 'block'
                        }}
                      />
                    </>
                  ) : (
                    /* Fallback con emoji laptop */
                    <div className="project__overlay project__overlay--laptop">
                      <span className="project__icon">💻</span>
                    </div>
                  )}
                </div>
                <div className="project__status">
                  <span className={`status-badge ${projects[selectedProject]?.status === 'Completado' ? 'status-badge--completed' : 'status-badge--progress'}`}>
                    {projects[selectedProject]?.status}
                  </span>
                </div>
              </div>
              
              <div className="project__details">
                <div className="project__meta">
                  <h2 className="project__title">{projects[selectedProject]?.title}</h2>
                  <div className="project__info">
                    <span className="project__category">{projects[selectedProject]?.category}</span>
                    <span className="project__year">{projects[selectedProject]?.year}</span>
                  </div>
                </div>
                
                <p className="project__description">
                  {projects[selectedProject]?.description}
                </p>
                
                <div className="project__technologies">
                  <h4 className="technologies__title">Tecnologías utilizadas:</h4>
                  <div className="technologies__list">
                    {projects[selectedProject]?.technologies.map((tech, index) => (
                      <span key={index} className="technology__tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="project__features">
                  <h4 className="features__title">Estadísticas del repositorio:</h4>
                  <ul className="features__list">
                    {projects[selectedProject]?.features.map((feature, index) => (
                      <li key={index} className="feature__item">
                        <span className="feature__bullet">📊</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="project__actions">
                  {projects[selectedProject]?.demoUrl && (
                    <a 
                      href={projects[selectedProject].demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project__btn project__btn--primary"
                    >
                      Ver Demo
                    </a>
                  )}
                  <a 
                    href={projects[selectedProject]?.githubUrl || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project__btn project__btn--secondary"
                  >
                    Ver en GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Información de GitHub */}
        <div className="github__info">
          <p>
            📡 Datos obtenidos en tiempo real desde GitHub API
            <button onClick={fetchGitHubRepos} className="refresh-btn">
              🔄 Actualizar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;