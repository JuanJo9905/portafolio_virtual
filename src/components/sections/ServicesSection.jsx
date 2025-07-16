import React from 'react';
import './ServicesSection.css';
const ServicesSection = () => {
  const services = [
    { id: 1, title: "Servicio 1", description: "Description 1" },
    { id: 2, title: "Servicio 2", description: "Description 2" },
    { id: 3, title: "Servicio 3", description: "Description 3" },
  ];

  return (
    <section className="services">
      <div className="services__container">
        <div className="services__header">
          <h2 className="services__title">
            Servicios
          </h2>
          <p className="services__description">
            Descripción de servicios
          </p>
        </div>
        <div className="services__grid">
          {services.map((service) => (
            <Card key={service.id} className="services__card">
              <h3 className="services__card-title">
                {service.title}
              </h3>
              <p className="services__card-description">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};