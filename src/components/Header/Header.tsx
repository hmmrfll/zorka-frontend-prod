import React from 'react';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <a href="/">
            <img
              src="./img/logo.svg"
              alt="ZORKA"
              width="204"
              height="31"
            />
          </a>
        </div>
      </div>
    </header>
  );
};
