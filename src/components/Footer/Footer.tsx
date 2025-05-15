import React from 'react';
import { CONTACT_INFO, NAVIGATION_ITEMS } from '../../utils/constants';
import './Footer.css';

export const Footer: React.FC = () => {
	return (
		<footer className="footer">
			<div className="footer__container">
				<div className="footer__content">
					<div className="footer__left">
						<div className="footer__by">
							<span>by</span>
							<a href="#">
								<img
									src="/img/logo.svg"
									alt="NoFrame"
									width="21"
									height="21"
								/>
							</a>
						</div>
					</div>
					<div className="footer__right">
						<ul className="footer__menu">
							<li>
								<a
									href={`mailto:${CONTACT_INFO.email}`}
									className="footer__link footer__contacts"
								>
									<span>contacts:</span>
									<span>{CONTACT_INFO.email}</span>
								</a>
							</li>
						</ul>
						<ul className="footer__social">
							{CONTACT_INFO.twitter && (
								<li>
									<a
										href={CONTACT_INFO.twitter}
										className="footer__social-link"
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											width="28"
											height="28"
											src="/img/social-twitter.png"
											alt="Twitter"
										/>
									</a>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};
