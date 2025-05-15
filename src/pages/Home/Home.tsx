import React from 'react';
import { Banner } from '../../components/Banner/Banner';
import { Cards } from '../../components/Cards/Cards';
import { Newsletter } from '../../components/Newsletter/Newsletter';
import './Home.css';

export const Home: React.FC = () => {
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
					{/* <Cards /> */}
					{/* <Newsletter /> */}
				</div>
			</div>
		</div>
	);
};
