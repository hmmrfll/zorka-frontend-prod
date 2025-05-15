import React, { useEffect, useRef, useState } from 'react';
import './LegacyEffects.css';

export const LegacyEffects: React.FC = () => {
	const [isActive, setIsActive] = useState(true);
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>(); // Исправлено здесь

	useEffect(() => {
		// Деактивируем эффект через 10 секунд
		const deactivateTimeout = setTimeout(() => {
			setIsActive(false);
		}, 10000);

		// Legacy desktop effect для больших экранов
		if (window.innerWidth > 1023 && isActive) {
			const btn = document.querySelector('.btn') as HTMLElement;
			const box = document.querySelector('.box') as HTMLElement;
			const blurLayer = document.querySelector('.blur-layer') as HTMLElement;

			if (!btn || !box || !blurLayer) {
				clearTimeout(deactivateTimeout);
				return;
			}

			const duration = 600;
			const btnBottom = btn.offsetTop + btn.offsetHeight;
			const boxBottom = box.offsetTop + box.offsetHeight;

			const debounce = (func: Function, delay: number) => {
				return (...args: any[]) => {
					if (timeoutRef.current) clearTimeout(timeoutRef.current);
					timeoutRef.current = setTimeout(() => func.apply(null, args), delay);
				};
			};

			const handleMouseMove = debounce((e: MouseEvent) => {
				if (!isActive) return;

				const greenIntensity = ((e.pageY / boxBottom) * 100) / 3;
				const blueIntensity = 100 - e.pageY;

				// Проверяем, находится ли мышь в активной зоне
				const isInActiveZone = e.pageY > boxBottom - 300 &&
					e.pageX > 200 &&
					window.innerWidth - e.pageX > 200;

				if (isInActiveZone && e.pageY > 100) {
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
							webkitBackdropFilter: `blur(${Math.min(greenIntensity, 60)}px)`,
						},
						{ duration, easing: 'linear', fill: 'forwards' },
					);
				} else {
					// Убираем эффект, если мышь вне активной зоны
					blurLayer.animate(
						{
							backdropFilter: 'blur(0px)',
							webkitBackdropFilter: 'blur(0px)',
						},
						{ duration: duration / 2, easing: 'linear', fill: 'forwards' },
					);
				}

				// Эффект для кнопки
				const isBtnHovered = btn.offsetLeft - e.clientX < 50 &&
					e.pageY - btnBottom < 150 &&
					e.pageY < 100;

				if (isBtnHovered) {
					const btnBlur = Math.min(blueIntensity / 2, 60);
					blurLayer.animate(
						{
							backdropFilter: `blur(${btnBlur}px)`,
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
				clearTimeout(deactivateTimeout);
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
			};
		}

		return () => {
			clearTimeout(deactivateTimeout);
		};
	}, [isActive]);

	// Не рендерим компонент, если он неактивен
	if (!isActive) return null;

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
