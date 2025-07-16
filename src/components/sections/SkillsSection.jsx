import React from 'react';
import './SkillsSection.css';

const SkillsSection = () => {
  // Habilidades organizadas por categoría
  const skillsData = {
    backend: {
      title: "Backend Development",
      badge: "Especialidad",
      featured: true,
      skills: [
        { name: "Node.js", level: 90, expert: true },
        { name: "Python", level: 70, expert: true },
        { name: "Express.js", level: 70, expert: true },
        { name: "PL/SQL", level: 90, expert: true },
        { name: "REST APIs", level: 90, expert: true }
      ]
    },
    frontend: {
      title: "Frontend Development",
      skills: [
        { name: "React", level: 70 },
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 80 },
        { name: "CSS", level: 90 },
        { name: "HTML5", level: 90 }
      ]
    },
    devops: {
      title: "DevOps & Tools",
      skills: [
        { name: "Postman", level: 90 },
        { name: "Swagger", level: 70 },
        { name: "Git", level: 85 },
        { name: "Linux", level: 75 },
        { name: "CI/CD", level: 80 }
      ]
    }
  };

  // renderizar una habilidad individual
  const SkillItem = ({ skill }) => (
    <div className={`skill-item ${skill.expert ? 'skill-item--expert' : ''}`}>
      <div className="skill-item__header">
        <span className="skill-item__name">{skill.name}</span>
        <span className="skill-item__percentage">{skill.level}%</span>
      </div>
      <div className="skill-item__level">
        <div 
          className={`skill-bar ${skill.expert ? 'skill-bar--expert' : ''}`}
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );

  // renderizar una categoría de habilidades
  const SkillCategory = ({ category, data }) => (
    <div className={`skill-category ${data.featured ? 'skill-category--featured' : ''}`}>
      <div className="skill-category__header">
        <h3 className="skill-category__title">{data.title}</h3>
        {data.badge && (
          <span className="skill-category__badge">{data.badge}</span>
        )}
      </div>
      <div className="skill-category__skills">
        {data.skills.map((skill, index) => (
          <SkillItem key={index} skill={skill} />
        ))}
      </div>
    </div>
  );

  return (
    <section className="skills">
      <div className="skills__container">
        <div className="skills__header">
          <h2 className="skills__title">Stack Tecnológico</h2>
          <p className="skills__subtitle">
            Tecnologías y herramientas que domino para crear soluciones completas
          </p>
        </div>
        
        <div className="skills__categories">
          {Object.entries(skillsData).map(([key, data]) => (
            <SkillCategory key={key} category={key} data={data} />
          ))}
        </div>
        
        {/* Sección adicional de certificaciones o logros */}
        <div className="skills__achievements">
          <h3 className="skills__achievements-title">Experiencia Destacada</h3>
          <div className="achievements-grid">
            <div className="achievement-item">
              <div className="achievement-icon">🛠️</div>
              <h4>Oracle APEX</h4>
              <p>Desarrollo de módulos personalizados en Oracle APEX</p>
            </div>
            <div className="achievement-item">
              <div className="achievement-icon">⚡</div>
              <h4>Optimización</h4>
              <p>Mejoras de rendimiento del 40% promedio</p>
            </div>
            <div className="achievement-item">
              <div className="achievement-icon">🔒</div>
              <h4>Seguridad</h4>
              <p>Implementación de autenticación JWT y OAuth</p>
            </div>
            <div className="achievement-item">
              <div className="achievement-icon">📊</div>
              <h4>Bases de Datos</h4>
              <p>Diseño y optimización de estructuras complejas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;