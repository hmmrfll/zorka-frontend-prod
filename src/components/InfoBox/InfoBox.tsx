import React from 'react';
import './InfoBox.css';

interface InfoBoxProps {
	text: string;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ text }) => {
	return (
		<>
			<div className="info-box-throw-left">
				<svg
					height="16"
					viewBox="0 0 703 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M702.531 8.76567C702.921 8.37515 702.921 7.74198 702.531 7.35146L696.167 0.987495C695.776 0.596971 695.143 0.596971 694.753 0.987495C694.362 1.37802 694.362 2.01118 694.753 2.40171L700.409 8.05856L694.753 13.7154C694.362 14.1059 694.362 14.7391 694.753 15.1296C695.143 15.5202 695.776 15.5202 696.167 15.1296L702.531 8.76567ZM-121.5 8.05856L-121.5 9.05856L701.824 9.05856L701.824 8.05856L701.824 7.05856L-121.5 7.05856L-121.5 8.05856Z"
						fill="#323232"
					/>
				</svg>
			</div>
			<div className="info-box-container">
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
			<div className="info-box-throw-right">
					<svg
						height="16"
						viewBox="0 0 115 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0.292893 7.29289C-0.0976311 7.68342 -0.097631 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538407 7.04738 0.538407 6.65685 0.928932L0.292893 7.29289ZM143 7.99999L143 6.99999L1 7L1 8L1 9L143 8.99999L143 7.99999Z"
							fill="#323232"
						/>
					</svg>
				</div>
		</>
	);
};
