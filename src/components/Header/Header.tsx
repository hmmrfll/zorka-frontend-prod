import React from 'react';
import { NAVIGATION_ITEMS } from '../../utils/constants';
import './Header.css';

export const Header: React.FC = () => {
	return (
		<header className="header">
			<div className="header__container">
				<div className="header__logo">
					<a href="/">
						<img
							src="/img/logo.svg"
							alt="NoFrame"
							width="180"
							height="51"
						/>
					</a>
				</div>
				<nav className="header__navigation">
					<ul className="header__menu">
						{NAVIGATION_ITEMS.map((item) => (
							<li
								key={item.id}
								className="header__menu-item"
							>
								<a
									href={item.href}
									className="header__menu-link"
									{...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
								>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};
