import React from 'react';
import type { CardData } from '../../types';
import './Cards.css';

const cardsData: CardData[] = [
  {
    id: 'supply',
    number: '01',
    title: 'LSDFi',
    subtitle: 'Liquid Staking\nDerivatives',
    variant: 'gradient'
  },
  {
    id: 'mint',
    number: '02',
    title: 'IRM',
    subtitle: 'Interests Rates\nMarket',
    variant: 'offset'
  },
  {
    id: 'lp',
    number: '03',
    title: 'LPDFi',
    subtitle: 'Liquidity Providing\nDerivatives',
    variant: 'expandable'
  }
];

interface CardProps {
  card: CardData;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const { number, title, subtitle, variant } = card;

  if (variant === 'expandable') {
    return (
      <div className={`cards__item cards__item--${variant}`}>
        <div className="cards__expandable-top"></div>
        <div className="cards__content-wrapper">
          <h3 className="cards__number">{number}</h3>
          <div className="cards__content">
            {title && <span className="cards__title">{title}</span>}
            <p className="cards__description">{subtitle.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < subtitle.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}</p>
          </div>
        </div>
        <div className="cards__expandable-bottom"></div>
      </div>
    );
  }

  return (
    <div className={`cards__item cards__item--${variant}`}>
      {variant === 'offset' && <div className="cards__bg" />}
      <div className="cards__content-wrapper">
        <h3 className="cards__number">{number}</h3>
        <div className="cards__content">
          {title && <span className="cards__title">{title}</span>}
          <p className="cards__description">{subtitle.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < subtitle.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}</p>
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
