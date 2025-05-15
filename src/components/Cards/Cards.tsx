import React from 'react';
import type { CardData } from '../../types';
import './Cards.css';

const cardsData: CardData[] = [
  {
    id: 'supply',
    number: '01 / Supply',
    subtitle: 'Assets with fixed yield as collateral',
    variant: 'gradient'
  },
  {
    id: 'mint',
    number: '02 / Mint',
    subtitle: 'Lowest and flat borrow rates',
    variant: 'offset'
  }
];

interface CardProps {
  card: CardData;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const { number, title, subtitle, variant } = card;

  return (
    <div className={`cards__item cards__item--${variant}`}>
      {variant === 'offset' && <div className="cards__bg" />}
      {variant === 'expandable' && (
        <>
          <div className="cards__top-box" />
          <div className="cards__bottom-box" />
        </>
      )}
      <div className="cards__content-wrapper">
        <h3 className="cards__number">{number}</h3>
        <div className="cards__content">
          {title && <span className="cards__title">{title}</span>}
          <p className="cards__description">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export const Cards: React.FC = () => {
  return (
    <div className="cards">
      {cardsData.map(card => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};
