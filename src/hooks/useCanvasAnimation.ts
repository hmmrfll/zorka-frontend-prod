import { useEffect } from 'react';
import type { RefObject } from 'react';

interface Mouse {
	startX: number;
	startY: number;
	dragging: boolean;
}

interface LineConfig {
	x: number;
	y: number;
}

class Dot {
	x: number;
	y: number;
	baseX: number;
	baseY: number;
	dx: number | null = null;
	dy: number | null = null;

	constructor(private mouse: Mouse) {
		this.x = mouse.startX;
		this.y = mouse.startY;
		this.baseX = this.x;
		this.baseY = this.y;
	}

	update() {
		this.dx = this.mouse.startX - this.x;
		this.dy = this.mouse.startY - this.y;
		if (this.x !== this.mouse.startX) {
			this.x += this.dx / 30;
		}
		if (this.y !== this.mouse.startY) {
			this.y += this.dy / 30;
		}
	}

	draw() {
		// Optional visual debug - в старом коде закомментирован
	}
}

class DragDrop {
	angle = 0;
	r4: number;
	gradient1: CanvasGradient;
	cosX = 0;
	sinY = 0;
	x2: number;
	y2: number;

	constructor(
		public x: number,
		public y: number,
		public r: number,
		public r2: number,
		public r3: number,
		private dot: Dot,
		private ctx: CanvasRenderingContext2D,
		private canvas: HTMLCanvasElement,
	) {
		this.r4 = r3 * 0.9;
		this.gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
		this.x2 = canvas.width / 1.6;
		this.y2 = canvas.height / 2;
	}

	update() {
		const dx = this.dot.x - this.x;
		const dy = this.dot.y - this.y;
		this.angle = Math.atan2(dy, dx);
		const distance = Math.hypot(dx, dy);
		this.r4 = distance < this.r3 ? distance * 0.9 : this.r3 * 0.9;
		this.cosX = this.x + Math.cos(this.angle) * this.r4;
		this.sinY = this.y + Math.sin(this.angle) * this.r4;
	}

	draw() {
		this.gradient1.addColorStop(0.2, '#26D6A5');
		this.gradient1.addColorStop(0.8, '#6000F3');
	}
}

class Line {
	x1 = 0;
	y1 = 0;
	x_0: number;
	y_0: number;
	gradient1: CanvasGradient;
	lineW: number;

	constructor(
		public x0: number,
		public y0: number,
		public x2: number,
		public y2: number,
		private ctx: CanvasRenderingContext2D,
		private canvas: HTMLCanvasElement,
	) {
		this.x_0 = x0;
		this.y_0 = y0;
		this.lineW = window.innerWidth < 521 ? 25 : 40;
		this.gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
	}

	update() {
		this.x1 = this.x2 - this.x0;
		this.y1 = this.y2 - this.y0;
	}

	draw() {
		this.gradient1.addColorStop(0.2, '#26D6A5');
		this.gradient1.addColorStop(0.8, '#6000F3');

		this.ctx.beginPath();
		this.ctx.strokeStyle = this.gradient1;
		this.ctx.lineWidth = this.lineW;
		this.ctx.moveTo(this.x2 - this.x1 / 1.7, this.y2 - this.y1 / 1.7);
		this.ctx.lineTo(this.x2, this.y2);
		this.ctx.stroke();
		this.ctx.closePath();

		this.ctx.beginPath();
		this.ctx.fillStyle = this.gradient1;
		this.ctx.arc(this.x2, this.y2, this.lineW / 2, 0, Math.PI * 2);
		this.ctx.fill();
		this.ctx.closePath();
	}
}

export const useCanvasAnimation = (
	canvasRef: RefObject<HTMLCanvasElement>,
	containerRef: RefObject<HTMLDivElement>,
) => {
	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Получаем размеры контейнера
		const bannerRect = container.getBoundingClientRect();
		canvas.width = bannerRect.width;
		canvas.height = bannerRect.height - 50;

		const canvasPos = canvas.getBoundingClientRect();
		let scrollY = window.scrollY;

		const mouse: Mouse = {
			startX: canvas.width / 1.6,
			startY: canvas.height / 2,
			dragging: false,
		};

		const dot = new Dot(mouse);

		// Настройка DragDrop в зависимости от размера экрана (как в старом коде)
		let dragDrop: DragDrop;
		if (window.innerWidth > 520 && window.innerWidth < 769) {
			dragDrop = new DragDrop(canvas.width / 1.4, canvas.height / 2, 70, 20, 600, dot, ctx, canvas);
		} else if (window.innerWidth <= 520) {
			dragDrop = new DragDrop(canvas.width / 1.6, canvas.height / 2, 50, 13, 300, dot, ctx, canvas);
		} else {
			dragDrop = new DragDrop(canvas.width / 1.6, canvas.height / 2, 70, 20, 600, dot, ctx, canvas);
		}

		// Настройка линий в зависимости от размера экрана (точно как в старом коде)
		const getLineNumbers = (): LineConfig[] => {
			if (window.innerWidth > 520 && window.innerWidth < 769) {
				return [
					{ x: 600, y: 250 },
					{ x: canvas.width / 1.12, y: 0 },
					{ x: 600, y: 400 },
					{ x: 25, y: 200 },
					{ x: 25, y: 300 },
					{ x: 250, y: 150 },
					{ x: 300, y: 25 },
				];
			} else if (window.innerWidth <= 520) {
				return [
					{ x: 250, y: 180 },
					{ x: canvas.width / 1.12, y: 0 },
					{ x: 250, y: 200 },
					{ x: 20, y: 150 },
					{ x: 25, y: 170 },
					{ x: 170, y: 130 },
					{ x: 170, y: 50 },
				];
			} else {
				return [
					{ x: 800, y: 450 },
					{ x: canvas.width / 1.2, y: 0 },
					{ x: 800, y: 600 },
					{ x: 100, y: 400 },
					{ x: 50, y: 500 },
					{ x: 450, y: 350 },
					{ x: 500, y: 150 },
				];
			}
		};

		const lineNumbers = getLineNumbers();

		// ВОТ ИСПРАВЛЕНИЕ! Создаем линии с правильными знаками как в оригинале
		const lines: Line[] = [
			// Line 0: dragDrop.x - x, dragDrop.y - y
			new Line(
				dragDrop.x - lineNumbers[0].x,
				dragDrop.y - lineNumbers[0].y,
				dragDrop.x,
				dragDrop.y,
				ctx,
				canvas
			),
			// Line 1: dragDrop.x - x, dragDrop.y + y (плюс для y!)
			new Line(
				dragDrop.x - lineNumbers[1].x,
				dragDrop.y + lineNumbers[1].y,
				dragDrop.x,
				dragDrop.y,
				ctx,
				canvas
			),
			// Line 2: dragDrop.x - x, dragDrop.y + y (плюс для y!)
			new Line(
				dragDrop.x - lineNumbers[2].x,
				dragDrop.y + lineNumbers[2].y,
				dragDrop.x,
				dragDrop.y,
				ctx,
				canvas
			),
			// Line 3: dragDrop.x + x, dragDrop.y + y (плюс для обоих!)
			new Line(
				dragDrop.x + lineNumbers[3].x,
				dragDrop.y + lineNumbers[3].y,
				dragDrop.x,
				dragDrop.y,
				ctx,
				canvas
			),
			// Line 4: dragDrop.x - x, dragDrop.y - y
			new Line(
				dragDrop.x - lineNumbers[4].x,
				dragDrop.y - lineNumbers[4].y,
				dragDrop.x,
				dragDrop.y,
				ctx,
				canvas
			),
			// Line 5: dragDrop.x + x, dragDrop.y - y (плюс для x, минус для y!)
			new Line(
				dragDrop.x + lineNumbers[5].x,
				dragDrop.y - lineNumbers[5].y,
				dragDrop.x,
				dragDrop.y,
				ctx,
				canvas
			),
			// Line 6: dragDrop.x + x, dragDrop.y + y (плюс для обоих!)
			new Line(
				dragDrop.x + lineNumbers[6].x,
				dragDrop.y + lineNumbers[6].y,
				dragDrop.x,
				dragDrop.y,
				ctx,
				canvas
			),
		];

		// Обработчики событий мыши/касания
		const mouseDown = (eventX: number, eventY: number, event: Event, scrollYDown: number) => {
			const cursorX = eventX - canvasPos.left;
			const cursorY = eventY - canvasPos.top + scrollYDown;

			mouse.dragging = true;
			event.preventDefault();

			mouse.startX = cursorX;
			mouse.startY = cursorY;
			dragDrop.update();

			const cosX = dragDrop.x + Math.cos(dragDrop.angle) * dragDrop.r4;
			const sinY = dragDrop.y + Math.sin(dragDrop.angle) * dragDrop.r4;

			lines.forEach(line => {
				line.x2 = cosX;
				line.y2 = sinY;
			});
		};

		const mouseMove = (eventX: number, eventY: number, scrollYDown: number) => {
			const cursorX = eventX - canvasPos.left;
			const cursorY = eventY - canvasPos.top + scrollYDown;

			mouse.startX = cursorX;
			mouse.startY = cursorY;
		};

		const mouseUp = () => {
			mouse.dragging = false;
		};

		// Обработчик скролла
		const onScroll = () => {
			if (window.innerWidth < 921) {
				scrollY = window.screenTop || 0;
			} else {
				scrollY = window.scrollY;
			}
		};

		// Обработчики для разных устройств
		const handleMouseDown = (e: MouseEvent) => {
			if ((e.target as HTMLElement).tagName.toLowerCase() === 'input') {
				return;
			}
			mouseDown(e.clientX, e.clientY, e, scrollY);
		};

		const handleMouseMove = (e: MouseEvent) => {
			mouseMove(e.clientX, e.clientY, scrollY);
		};

		const handleMouseUp = (e: MouseEvent) => {
			mouseUp();
		};

		// Touch события для мобильных устройств
		const handleTouchStart = (e: TouchEvent) => {
			const touch = e.touches[0] || e.changedTouches[0];
			mouseDown(touch.pageX, touch.pageY, e, scrollY);
		};

		const handleTouchMove = (e: TouchEvent) => {
			const touch = e.touches[0] || e.changedTouches[0];
			mouseMove(touch.pageX, touch.pageY, scrollY);
		};

		const handleTouchEnd = (e: TouchEvent) => {
			mouseUp();
		};

		// Настройка событий в зависимости от размера экрана
		if (window.innerWidth < 921) {
			canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
			canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
			canvas.addEventListener('touchend', handleTouchEnd);
		} else {
			window.addEventListener('mousedown', handleMouseDown);
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', handleMouseUp);
		}

		window.addEventListener('scroll', onScroll);

		// Основной цикл анимации
		const loop = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			lines.forEach(line => {
				line.x2 = dragDrop.cosX;
				line.y2 = dragDrop.sinY;
				line.update();
				line.draw();
			});

			dragDrop.update();
			dragDrop.draw();
			dot.update();
			dot.draw();

			requestAnimationFrame(loop);
		};

		loop();

		// Очистка при размонтировании
		return () => {
			window.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
			window.removeEventListener('scroll', onScroll);
			canvas.removeEventListener('touchstart', handleTouchStart);
			canvas.removeEventListener('touchmove', handleTouchMove);
			canvas.removeEventListener('touchend', handleTouchEnd);
		};
	}, [canvasRef, containerRef]);
};
