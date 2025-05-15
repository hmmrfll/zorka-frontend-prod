import React from 'react';
import { CONTACT_INFO, NAVIGATION_ITEMS } from '../../utils/constants';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__left">
            <div className="footer__logo">
              <img src="/img/logo.svg" alt="NoFrame" width="180" height="50" />
            </div>
            <ul className="footer__menu">
              {NAVIGATION_ITEMS.map(item => (
                <li key={item.id} className="footer__menu-item">
                  <a
                    href={item.href}
                    className="footer__menu-link"
                    {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__right">
            <div className="footer__contact">
              <a href={`mailto:${CONTACT_INFO.email}`} className="footer__contact-btn">
                Contact us
              </a>
            </div>
            <div className="footer__social">
              {CONTACT_INFO.twitter && (
                <a href={CONTACT_INFO.twitter} className="footer__social-link" target="_blank" rel="noopener noreferrer">
                  <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                    <rect width="42" height="42" fill="var(--color-dark-gray)" />
                    <g clipPath="url(#clip0_9_3594)">
                      <path
                        d="M22.6638 20.4102L27.8351 15H26.6096L22.1195 19.6975L18.533 15H14.3965L19.8198 22.1036L14.3965 27.777H15.6221L20.3639 22.8162L24.1513 27.777H28.2879L22.6635 20.4102H22.6638ZM20.9853 22.1661L20.4357 21.4588L16.0636 15.8303H17.946L21.4742 20.3727L22.0236 21.08L26.6101 26.9844H24.728L20.9853 22.1664V22.1661Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_9_3594">
                        <rect width="14.1966" height="12.777" fill="white" transform="translate(14.2441 15)" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="footer__line" />
        <div className="footer__bottom">
          <p className="footer__copyright">© 2024 NoFrame.io | All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};
