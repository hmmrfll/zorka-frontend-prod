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
			setErrorMessage(result.error || 'Oops! Something went wrong :(');
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
			<div className="newsletter">
				<div className="newsletter__container">
					<p className="newsletter__success-text">Thank you!</p>
				</div>
			</div>
		);
	}

	return (
		<div className="newsletter">
			<div className="newsletter__container">
				<div
					className="newsletter__animation"
					id="animation__scroll"
				>
					<div className="newsletter__scroll-content">
						<h2>Waitlist.</h2>
						<br />
						<h2>Be tuned,</h2>
						<br />
						<h2>homies</h2>
						<br />
						<h2>Waitlist.</h2>
						<br />
						<h2>Be tuned,</h2>
						<br />
						<h2>homies</h2>
					</div>
				</div>
				<form
					className="newsletter__form"
					onSubmit={handleSubmit}
				>
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
						className={`newsletter__button ${status === 'loading' ? 'newsletter__button--loading' : ''}`}
					>
						{status === 'loading' ? 'Sending...' : 'Send'}
					</button>
				</form>
				{status === 'error' && <p className="newsletter__error">{errorMessage}</p>}
			</div>
		</div>
	);
};
