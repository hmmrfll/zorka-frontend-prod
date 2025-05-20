import React from 'react';
import './Cards.css';

interface CardData {
  number: string;
  title: string;
  content: string;
}

interface CardsProps {
  cards: CardData[];
}

export const Cards: React.FC<CardsProps> = ({ cards }) => {
  return (
    <div className="home-section-cards">
      {cards.map((card, index) => (
        <div
          key={index}
          className="home-section-card"
        >
          <div className="home-section-card-header">
            <div className="home-section-card-title">{card.number}</div>
            <div className="home-section-card-subtitle">{card.title}</div>
          </div>
          <div className="home-section-card-content">
            {card.content}
          </div>
        </div>
      ))}
    </div>
  );
};
