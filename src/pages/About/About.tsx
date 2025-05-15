import React from 'react';
import './About.css';

export const About: React.FC = () => {
  return (
    <div className="about">
      <div className="about__container">
        <h1 className="about__title">About NoFrame</h1>
        <div className="about__content">
          <p className="about__text">
            NoFrame is at the forefront of quantitative crypto options strategies,
            leveraging cutting-edge technology and data-driven methodologies.
          </p>
          <p className="about__text">
            Our team combines deep expertise in traditional finance with innovative
            blockchain technologies to create sophisticated trading solutions.
          </p>
        </div>
      </div>
    </div>
  );
};
