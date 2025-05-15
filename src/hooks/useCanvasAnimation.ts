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
		if (this.x !== this.mouse.startX) this.x += this.dx / 30;
		if (this.y !== this.mouse.startY) this.y += this.dy / 30;
	}
	draw(ctx: CanvasRenderingContext2D) {
		// Optional visual debug
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

		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		if (!ctx) return;

		const rect = container.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height - 50;
		const canvasPos = canvas.getBoundingClientRect();

		const mouse: Mouse = {
			startX: canvas.width / 1.6,
			startY: canvas.height / 2,
			dragging: false,
		};

		const dot = new Dot(mouse);
		let scrollY = window.scrollY;
		let dragDrop = new DragDrop(canvas.width / 1.6, canvas.height / 2, 70, 20, 600, dot, ctx, canvas);

		const lineConfig = (): LineConfig[] => {
			if (window.innerWidth <= 520)
				return [
					{ x: 250, y: 180 },
					{ x: canvas.width / 1.12, y: 0 },
					{ x: 250, y: 200 },
					{ x: 20, y: 150 },
					{ x: 25, y: 170 },
					{ x: 170, y: 130 },
					{ x: 170, y: 50 },
				];
			if (window.innerWidth < 769)
				return [
					{ x: 600, y: 250 },
					{ x: canvas.width / 1.12, y: 0 },
					{ x: 600, y: 400 },
					{ x: 25, y: 200 },
					{ x: 25, y: 300 },
					{ x: 250, y: 150 },
					{ x: 300, y: 25 },
				];
			return [
				{ x: 800, y: 450 },
				{ x: canvas.width / 1.2, y: 0 },
				{ x: 800, y: 600 },
				{ x: 100, y: 400 },
				{ x: 50, y: 500 },
				{ x: 450, y: 350 },
				{ x: 500, y: 150 },
			];
		};

		const lines = lineConfig().map(
			(pos) => new Line(dragDrop.x - pos.x, dragDrop.y + pos.y, dragDrop.x, dragDrop.y, ctx, canvas),
		);

		const mouseDown = (eventX: number, eventY: number, scrollY: number) => {
			const cursorX = eventX - canvasPos.left;
			const cursorY = eventY - canvasPos.top + scrollY;
			mouse.dragging = true;
			mouse.startX = cursorX;
			mouse.startY = cursorY;
			dragDrop.update();
			const cosX = dragDrop.x + Math.cos(dragDrop.angle) * dragDrop.r4;
			const sinY = dragDrop.y + Math.sin(dragDrop.angle) * dragDrop.r4;
			lines.forEach((line) => {
				line.x2 = cosX;
				line.y2 = sinY;
			});
		};

		const mouseMove = (eventX: number, eventY: number, scrollY: number) => {
			const cursorX = eventX - canvasPos.left;
			const cursorY = eventY - canvasPos.top + scrollY;
			mouse.startX = cursorX;
			mouse.startY = cursorY;
		};

		const loop = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			lines.forEach((line) => {
				line.x2 = dragDrop.cosX;
				line.y2 = dragDrop.sinY;
				line.update();
				line.draw();
			});
			dragDrop.update();
			dragDrop.draw();
			dot.update();
			dot.draw(ctx);
			requestAnimationFrame(loop);
		};
		loop();

		const scrollHandler = () => {
			scrollY = window.innerWidth < 921 ? window.screenTop : window.scrollY;
		};

		const mouseHandler = (e: MouseEvent) => {
			if ((e.target as HTMLElement).tagName.toLowerCase() !== 'input') {
				mouseDown(e.clientX, e.clientY, scrollY);
			}
		};

		const moveHandler = (e: MouseEvent) => mouseMove(e.clientX, e.clientY, scrollY);

		if (window.innerWidth < 921) {
			canvas.addEventListener(
				'touchstart',
				(e) => {
					const touch = e.touches[0];
					mouseDown(touch.pageX, touch.pageY, scrollY);
				},
				{ passive: false },
			);
			canvas.addEventListener(
				'touchmove',
				(e) => {
					const touch = e.touches[0];
					mouseMove(touch.pageX, touch.pageY, scrollY);
				},
				{ passive: false },
			);
		} else {
			window.addEventListener('mousedown', mouseHandler);
			window.addEventListener('mousemove', moveHandler);
		}
		window.addEventListener('scroll', scrollHandler);

		return () => {
			window.removeEventListener('mousedown', mouseHandler);
			window.removeEventListener('mousemove', moveHandler);
			window.removeEventListener('scroll', scrollHandler);
		};
	}, [canvasRef, containerRef]);
};
