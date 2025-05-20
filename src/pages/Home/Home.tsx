import React from 'react';
import { Banner } from '../../components/Banner/Banner';
import { Cards } from '../../components/Cards/Cards';
import { InfoBox } from '../../components/InfoBox/InfoBox';
import './Home.css';
import { GradientSphere } from '../../../public/img/GradientSphere';
import { WhiteSphere } from '../../../public/img/WhiteSphere';
import { investSection, infoBox, strategiesSection } from '../../data/homeContent';

export const Home: React.FC = () => {
	return (
		<div className="home">
			{/* Баннер */}
			<Banner />

			{/* Секция "How We Invest" */}
			<div className="home__content">
				<div className="home__invest-section">
					<div className="home__invest-title-wrapper">
						<div className="home__invest-title">{investSection.title}</div>
						<div className="home__invest-subtitle">{investSection.subtitle}</div>
					</div>
					<Cards cards={investSection.cards} />
				</div>
			</div>

			{/* Секция с информационным блоком */}
			<div className="home__info-section">
				<InfoBox text={infoBox.text} />
			</div>

			{/* Секция "Strategies" */}
			<div className="home__strategies-section">
				<div className="home__strategies-content">
					<div className="home__strategies-title">{strategiesSection.title}</div>
					<div className="home__strategies-subtitle">{strategiesSection.subtitle}</div>

					<div className="home__strategies-cards">
						{strategiesSection.cards.map((card, index) => (
							<div
								key={index}
								className="home__strategies-card"
							>
								<div className="home__strategies-card-title">{card.title}</div>
								<div className="home__strategies-card-subtitle">{card.subtitle}</div>
								<div className="home__strategies-card-description">{card.description}</div>
								<div className="home__strategies-card-img">
									{card.sphereType === 'gradient' ? <GradientSphere /> : <WhiteSphere />}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
