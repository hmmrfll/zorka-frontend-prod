import React from 'react';
import './InfoBox.css';

interface InfoBoxProps {
	text: string;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ text }) => {
	return (
		<>
			<div className="info-box-container">
				<div className="info-box-throw"></div>
				<div className="info-box">
					<svg
						className="info-box-border"
						viewBox="0 0 579 152"
						preserveAspectRatio="none"
					>
						<rect
							x="0"
							y="0"
							width="100%"
							height="100%"
							fill="none"
							stroke="#323232"
							strokeWidth="3"
							strokeDasharray="20,20"
						/>
					</svg>

					<div className="info-box-text">{text}</div>
				</div>
			</div>
		</>
	);
};
