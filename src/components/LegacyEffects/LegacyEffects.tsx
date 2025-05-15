import React, { useEffect } from 'react';
import './LegacyEffects.css';

export const LegacyEffects: React.FC = () => {
	useEffect(() => {
		// Legacy desktop effect for large screens
		if (window.innerWidth > 1023) {
			const btn = document.querySelector('.btn') as HTMLElement;
			const box = document.querySelector('.box') as HTMLElement;
			const blurLayer = document.querySelector('.blur-layer') as HTMLElement;

			if (!btn || !box || !blurLayer) return;

			const duration = 600;
			const btnBottom = btn.offsetTop + btn.offsetHeight;
			const boxBottom = box.offsetTop + box.offsetHeight;

			const debounce = (func: Function, delay: number) => {
				let timeoutId: ReturnType<typeof setTimeout>;
				return (...args: any[]) => {
					clearTimeout(timeoutId);
					timeoutId = setTimeout(() => func.apply(null, args), delay);
				};
			};

			const handleMouseMove = debounce((e: MouseEvent) => {
				const greenIntensity = ((e.pageY / boxBottom) * 100) / 3;
				const blueIntensity = 100 - e.pageY;

				if (e.pageY > boxBottom - 300 && e.pageX > 200 && window.innerWidth - e.pageX > 200) {
					if (e.pageY > 100) {
						box.animate(
							{
								background: `linear-gradient(202deg, rgba(0, 255, ${greenIntensity}, 0.2) 14.43%, rgba(${
									greenIntensity * 1.5
								}, 0, ${greenIntensity * 3}, 0.45) 92.13%), #262725`,
							},
							{ duration, easing: 'linear', fill: 'forwards' },
						);

						blurLayer.animate(
							{
								backdropFilter: `blur(${Math.min(greenIntensity, 60)}px)`,
							},
							{ duration, easing: 'linear', fill: 'forwards' },
						);

						blurLayer.animate(
							{
								webkitBackdropFilter: `blur(${Math.min(greenIntensity, 60)}px)`,
							},
							{ duration, easing: 'linear', fill: 'forwards' },
						);
					}
				} else {
					const fallbackBlur = Math.max((greenIntensity / 10) * 2, 0);
					blurLayer.animate(
						{
							backdropFilter: `blur(${fallbackBlur}px)`,
						},
						{ duration, easing: 'linear', fill: 'forwards' },
					);

					blurLayer.animate(
						{
							webkitBackdropFilter: `blur(${fallbackBlur}px)`,
						},
						{ duration, easing: 'linear', fill: 'forwards' },
					);
				}

				if (btn.offsetLeft - e.clientX < 50 && e.pageY - btnBottom < 150 && e.pageY < 100) {
					const btnBlur = Math.min(blueIntensity / 2, 60);
					blurLayer.animate(
						{
							backdropFilter: `blur(${btnBlur}px)`,
						},
						{ duration, easing: 'linear', fill: 'forwards' },
					);

					blurLayer.animate(
						{
							webkitBackdropFilter: `blur(${btnBlur}px)`,
						},
						{ duration, easing: 'linear', fill: 'forwards' },
					);

					box.animate(
						{
							background: `linear-gradient(202deg, rgba(0, 255, ${blueIntensity}, 0.2) 14.43%, rgba(${
								blueIntensity / 1.2
							}, 0, ${blueIntensity / 1.2}, 0.45) 92.13%), #262725`,
						},
						{ duration, easing: 'linear', fill: 'forwards' },
					);
				}
			}, 5);

			document.addEventListener('mousemove', handleMouseMove);

			return () => {
				document.removeEventListener('mousemove', handleMouseMove);
			};
		}
	}, []);

	return (
		<>
			<div className="blur-layer"></div>
			<div className="box-layer">
				<div className="box"></div>
				<div className="line line-1"></div>
				<div className="line line-2"></div>
				<div className="line line-3"></div>
			</div>
		</>
	);
};
