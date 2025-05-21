import React, { useRef } from 'react';
import { useCanvasAnimation } from '../../hooks/useCanvasAnimation';

import './Banner.css';
import { ArrowIcon } from '../../../public/img/ArrowIcon';

export const Banner: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useCanvasAnimation(canvasRef, containerRef);

	return (
		<section
			className="banner"
			ref={containerRef}
		>
			<canvas
					ref={canvasRef}
					className="banner__canvas"
					id="banner__animate"
				/>
			<div className="banner__container">
				<div className="banner__content">
					<div className="banner__title desktop-title">
						Quantitative
						<br /> strategies for crypto <br /> options
					</div>
					<div className="banner__title mobile-title">
						Quantitative
						<br /> strategies for <br />
						crypto options
					</div>
					<div className="banner__subtitle-wrapper">
						<div className="banner__subtitle">
							We utilize advanced analytics and real-time market data to build optimized crypto options strategies. Our
							data-driven approach enhances risk management and maximizes returns in volatile markets
						</div>
						<div className='banner__arrow'><ArrowIcon /></div>
					</div>
				</div>
			</div>
		</section>
	);
};
