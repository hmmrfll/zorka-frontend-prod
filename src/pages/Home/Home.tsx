import React from 'react';
import { Banner } from '../../components/Banner/Banner';
import { Cards } from '../../components/Cards/Cards';
import { InfoBox } from '../../components/InfoBox/InfoBox';
import './Home.css';
import { GradientSphere } from '../../../public/img/GradientSphere';
import { WhiteSphere } from '../../../public/img/WhiteSphere';

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
			</div>

			<div className="home__section-check">
				<InfoBox text="All client assets remain fully under their own custody, ensuring maximum security and transparency." />
			</div>

			<div className="home__section-second">
				<div className="home__section-second-content">
					<div className="home__section-second-title">STRATEGIES</div>
					<div className="home__section-second-subtitle">
						Our approach leverages advanced options strategies designed specifically for crypto markets.
						<br /> We focus on:
					</div>

					<div className="home__section-second-cards">
						<div className="home__section-second-card">
							<div className="home__section-second-card-title">HEDGE BTC</div>
							<div className="home__section-second-card-subtitle">Zenith</div>
							<div className="home__section-second-card-description">
								Accumulate BTC with downside protectionGrow your Bitcoin holdings by effectively hedging market
								downturns through strategic options trading
							</div>
							<div className="home__section-second-card-img">
								<GradientSphere />
							</div>
						</div>
						<div className="home__section-second-card">
							<div className="home__section-second-card-title">YIELD ON BTC</div>
							<div className="home__section-second-card-subtitle">Aurora</div>
							<div className="home__section-second-card-description">
								Consistent returns from volatility premium Generate steady income by capitalizing on BTC options premium
								exceeding realized volatility.
							</div>
							<div className="home__section-second-card-img">
								<WhiteSphere />
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
};
