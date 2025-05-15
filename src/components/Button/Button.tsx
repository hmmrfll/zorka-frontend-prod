import React from 'react';
import './Button.css';

interface ButtonProps {
	children: React.ReactNode;
	variant?: 'default' | 'contact';
	href?: string;
	external?: boolean;
	disabled?: boolean;
	className?: string;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'default',
	href,
	external = false,
	disabled = false,
	className = '',
	onClick,
	type = 'button',
}) => {
	const baseClass = `btn ${variant === 'contact' ? 'btn--contact' : ''} ${className}`.trim();

	if (href) {
		return (
			<a
				href={href}
				className={baseClass}
				{...(external && { target: '_blank', rel: 'noopener noreferrer' })}
			>
				{children}
			</a>
		);
	}

	if (variant === 'contact') {
		return (
			<div className="btn-bottom">
				<button
					type={type}
					className="contact-us"
					disabled={disabled}
					onClick={onClick}
				>
					{children}
				</button>
				<div className="btn-bottom__bg"></div>
			</div>
		);
	}

	return (
		<button
			type={type}
			className={baseClass}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
