import React from 'react';
import { Banner } from '../../components/Banner/Banner';
import { Cards } from '../../components/Cards/Cards';
import { Newsletter } from '../../components/Newsletter/Newsletter';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="home">
      <Banner />
      <section className="home__content">
        <div className="home__container">
          <p className="home__description">
            We utilize advanced analytics and real-time market data to build
            optimized crypto options strategies. Our data-driven approach enhances
            risk management and maximizes returns in volatile markets.
          </p>
          <Cards />
        </div>
      </section>
      <Newsletter />
    </div>
  );
};
