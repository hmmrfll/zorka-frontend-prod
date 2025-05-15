import React, { useRef } from 'react';
import { useCanvasAnimation } from '../../hooks/useCanvasAnimation';
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
            Quantitative strategies<br />
            for crypto options
          </h1>
          <a href="#" className="banner__download-btn">
            Download our App
          </a>
          <a href="#" className="banner__coming-soon">
            Coming soon...
          </a>
        </div>
        <canvas ref={canvasRef} className="banner__canvas" />
      </div>
    </section>
  );
};
