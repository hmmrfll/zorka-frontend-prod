import React from 'react';
import { CONTACT_INFO } from '../../utils/constants';
import './Contact.css';

export const Contact: React.FC = () => {
  return (
    <div className="contact">
      <div className="contact__container">
        <h1 className="contact__title">Contact Us</h1>
        <div className="contact__content">
          <div className="contact__info">
            <h2 className="contact__subtitle">Get in touch</h2>
            <p className="contact__text">
              Have questions about our quantitative strategies? We'd love to hear from you.
            </p>
            <div className="contact__details">
              <div className="contact__item">
                <span className="contact__label">Email:</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="contact__link">
                  {CONTACT_INFO.email}
                </a>
              </div>
              {CONTACT_INFO.twitter && (
                <div className="contact__item">
                  <span className="contact__label">Twitter:</span>
                  <a
                    href={CONTACT_INFO.twitter}
                    className="contact__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @noframe_io
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
