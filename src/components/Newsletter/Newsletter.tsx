import React, { useState } from 'react';
import { subscribeToNewsletter } from '../../utils/api';
import type { SubscriptionData } from '../../types';
import './Newsletter.css';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    setStatus('loading');
    setErrorMessage('');

    const subscriptionData: SubscriptionData = { email: email.trim() };
    const result = await subscribeToNewsletter(subscriptionData);

    if (result.success) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Something went wrong');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  if (status === 'success') {
    return (
      <div className="newsletter newsletter--success">
        <p className="newsletter__success-text">Thank you!</p>
      </div>
    );
  }

  return (
    <div className="newsletter">
      <div className="newsletter__animation">
        <div className="newsletter__text-scroll">
          <div className="newsletter__text-content">
            <h2>Waitlist.</h2>
            <h2>Be tuned,</h2>
            <h2>homies</h2>
            <h2>Waitlist.</h2>
            <h2>Be tuned,</h2>
            <h2>homies</h2>
          </div>
        </div>
      </div>
      <form className="newsletter__form" onSubmit={handleSubmit}>
        <div className="newsletter__input-wrapper">
          <input
            type="email"
            name="EMAIL"
            value={email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
            disabled={status === 'loading'}
            className={`newsletter__input ${status === 'error' ? 'newsletter__input--error' : ''}`}
          />
          <button
            type="submit"
            disabled={status === 'loading' || !email.trim()}
            className="newsletter__button"
          >
            {status === 'loading' ? 'Sending...' : 'Send'}
          </button>
        </div>
        {status === 'error' && (
          <p className="newsletter__error">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};
