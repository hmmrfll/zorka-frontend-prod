import React from 'react';
import { Banner } from '../../components/Banner/Banner';
import { Cards } from '../../components/Cards/Cards';
import { InfoBox } from '../../components/InfoBox/InfoBox';
import './Home.css';

export const Home: React.FC = () => {
	const cardsData = [
		{
			number: '01',
			title: 'Capital Protection',
			content: 'Using options to mitigate significant market downturns, preserving asset value.',
		},
		{
			number: '02',
			title: 'Volatility Monetization',
			content: 'Consistently capturing premiums from selling options priced above actual market volatility.',
		},
		{
			number: '03',
			title: 'Active Management',
			content: 'Continuous monitoring and adaptive strategy execution to optimize performance and risk.',
		},
	];

	return (
		<div className="home">
			<Banner />
			<div className="home__content">
				<div className="home__section-first">
					<div className="home__section-first-title-wrapper">
						<div className="home__section-first-title">HOW WE INVEST</div>
						<div className="home__section-first-subtitle">
							Our approach leverages advanced options strategies designed specifically for crypto markets. We focus on:
						</div>
					</div>
					<Cards cards={cardsData} />
				</div>
				<InfoBox text="All client assets remain fully under their own custody, ensuring maximum security and transparency." />
			</div>

			<div className="home__section-second">
				<div className="home__content">
					<div className="home__section-second-title">STRATEGIES</div>
					<div className="home__section-second-subtitle">
						Our approach leverages advanced options strategies designed specifically for crypto markets. We focus on:
					</div>
				</div>
			</div>

			{/* <Newsletter /> */}
		</div>
	);
};
