import React from 'react';
import { Banner } from '../../components/Banner/Banner';
import { Cards } from '../../components/Cards/Cards';
import { Newsletter } from '../../components/Newsletter/Newsletter';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="home">
      <Banner />
      <div className="home__sticky-banner">

        <section className="home__content">
          <div className="home__container">

            {/* <Cards /> */}
            {/* <Newsletter /> */}
          </div>
        </section>
      </div>
    </div>
  );
};
