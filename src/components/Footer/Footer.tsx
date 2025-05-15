import React from 'react';
import { CONTACT_INFO } from '../../utils/constants';
import './Footer.css';
import { MailIcon } from '../../../public/img/MailIcon';
import { TwitterIcon } from '../../../public/img/TwitterIcon';
import { ServiceIcon } from '../../../public/img/ServiceIcon';

export const Footer: React.FC = () => {
	return (
		<footer className="footer">
			<div className="footer__container">
				<div className="footer__logo">
					<img
						src="./img/logo.svg"
						alt="ZORKA"
						width="204"
						height="31"
					/>
				</div>
				<div className="footer__right">
					<div
						className="footer__social-btn"
						onClick={() => {
							window.location.href = `mailto:${CONTACT_INFO.google}`;
						}}
					>
						APPLY
					</div>
					<div
						className="footer__social-link"
						onClick={() => {
							window.location.href = `mailto:${CONTACT_INFO.email}`;
						}}
					>
						<MailIcon />
					</div>
					<div
						className="footer__social-link"
						onClick={() => {
							window.open(CONTACT_INFO.twitter, '_blank');
						}}
					>
						<TwitterIcon />
					</div>
					<div
						className="footer__social-link"
						onClick={() => {
							window.open(CONTACT_INFO.service, '_blank');
						}}
					>
						<ServiceIcon />
					</div>
				</div>
			</div>
			<div className="footer__bottom">
				<div className="footer__line"></div>
				<p className="footer__copy">© 2025 Zorka | All rights reserved</p>
			</div>
		</footer>
	);
};
