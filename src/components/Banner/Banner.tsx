import React, { useRef } from 'react';
import { useCanvasAnimation } from '../../hooks/useCanvasAnimation';
import { LegacyEffects } from '../LegacyEffects/LegacyEffects';
import './Banner.css';

export const Banner: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useCanvasAnimation(canvasRef, containerRef);

  return (
    <section className="banner" ref={containerRef}>
      <div className="banner__container">
        <div className="banner__content">
          <h1 className="banner__title">
            Data-Driven Strategies <br />
            based on <span>defi-native derivatives.</span>
          </h1>
          <a href="#" className="banner__download-btn">
            Download our App
          </a>
          <a href="#" className="banner__coming-soon btn">
            Coming soon...
          </a>
        </div>
        <canvas ref={canvasRef} className="banner__canvas" />

        {/* Mobile cards */}
        <div className="banner__mobile-cards">
          <div className="banner__mobile-cards-left"></div>
          <div className="banner__mobile-cards-right"></div>
        </div>

        {/* Mobile menu */}
        <ul className="banner__mobile-menu">
          <li>
            <a href="https://t.me/Yielder_bot" className="link border-bottom-line_rotated">
              Yielder Bot
            </a>
          </li>
          <li>
            <a href="https://docsend.com/view/tqkvninuxc2n37b8" className="link border-bottom-line_rotated">
              Pitch Deck
            </a>
          </li>
        </ul>
      </div>
      <LegacyEffects />
    </section>
  );
};
