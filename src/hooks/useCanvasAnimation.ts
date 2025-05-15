import { useEffect, RefObject } from 'react';
import type { Mouse, CanvasPoint } from '../types';

interface LineConfig {
	x: number;
	y: number;
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

		let animationId: number;

		// Canvas setup
		const resizeCanvas = () => {
			const rect = container.getBoundingClientRect();
			canvas.width = rect.width;
			canvas.height = rect.height - 50;
		};

		resizeCanvas();
		const canvasPos = canvas.getBoundingClientRect();

		// Mouse object
		const mouse: Mouse = {
			startX: canvas.width / 1.6,
			startY: canvas.height / 2,
			dragging: false,
		};

		// Dot class
		class Dot {
			x: number;
			y: number;
			baseX: number;
			baseY: number;
			dx: number | null = null;
			dy: number | null = null;

			constructor() {
				this.x = mouse.startX;
				this.y = mouse.startY;
				this.baseX = this.x;
				this.baseY = this.y;
			}

			update() {
				this.dx = mouse.startX - this.x;
				this.dy = mouse.startY - this.y;
				if (this.x !== mouse.startX) {
					this.x += this.dx / 30;
				}
				if (this.y !== mouse.startY) {
					this.y += this.dy / 30;
				}
			}

			draw() {
				// Optional: draw dot for debugging
			}
		}

		// DragDrop class
		class DragDrop {
			x: number;
			y: number;
			r: number;
			r2: number;
			r3: number;
			r4: number;
			gradient1: CanvasGradient;
			angle: number = 0;
			cosX: number = 0;
			sinY: number = 0;

			constructor(x: number, y: number, r: number, r2: number, r3: number) {
				this.x = x;
				this.y = y;
				this.r = r;
				this.r2 = r2;
				this.r3 = r3;
				this.r4 = this.r3 * 0.9;
				this.gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
				this.gradient1.addColorStop(0.2, '#26D6A5');
				this.gradient1.addColorStop(0.8, '#6000F3');
				this.cosX = x;
				this.sinY = y;
			}

			update() {
				const dx = dot.x - this.x;
				const dy = dot.y - this.y;
				this.angle = Math.atan2(dy, dx);
				const distance = Math.hypot(dx, dy);

				if (distance < this.r3) {
					this.r4 = distance * 0.9;
				} else {
					this.r4 = this.r3 * 0.9;
				}

				this.cosX = this.x + Math.cos(this.angle) * this.r4;
				this.sinY = this.y + Math.sin(this.angle) * this.r4;
			}

			draw() {
				// Optional: draw center point
			}
		}

		// Line class
		class Line {
			x0: number;
			y0: number;
			x_0: number;
			y_0: number;
			x1: number = 0;
			y1: number = 0;
			x2: number;
			y2: number;
			lineW: number;
			gradient1: CanvasGradient;

			constructor(x0: number, y0: number, x2: number, y2: number) {
				this.x0 = x0;
				this.y0 = y0;
				this.x_0 = this.x0;
				this.y_0 = this.y0;
				this.x2 = x2;
				this.y2 = y2;
				this.lineW = window.innerWidth < 521 ? 25 : 40;

				this.gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
				this.gradient1.addColorStop(0.2, '#26D6A5');
				this.gradient1.addColorStop(0.8, '#6000F3');
			}

			update() {
				this.x1 = this.x2 - this.x0;
				this.y1 = this.y2 - this.y0;
			}

			draw() {
				ctx.beginPath();
				ctx.strokeStyle = this.gradient1;
				ctx.lineWidth = this.lineW;
				ctx.moveTo(this.x2 - this.x1 / 1.7, this.y2 - this.y1 / 1.7);
				ctx.lineTo(this.x2, this.y2);
				ctx.stroke();
				ctx.closePath();

				ctx.beginPath();
				ctx.fillStyle = this.gradient1;
				ctx.arc(this.x2, this.y2, this.lineW / 2, 0, Math.PI * 2);
				ctx.fill();
				ctx.closePath();
			}
		}

		// Line configurations based on screen size
		let lineConfigs: LineConfig[] = [
			{ x: 800, y: 450 },
			{ x: canvas.width / 1.2, y: 0 },
			{ x: 800, y: 600 },
			{ x: 100, y: 400 },
			{ x: 50, y: 500 },
			{ x: 450, y: 350 },
			{ x: 500, y: 150 },
		];

		if (window.innerWidth > 520 && window.innerWidth < 769) {
			lineConfigs = [
				{ x: 600, y: 250 },
				{ x: canvas.width / 1.12, y: 0 },
				{ x: 600, y: 400 },
				{ x: 25, y: 200 },
				{ x: 25, y: 300 },
				{ x: 250, y: 150 },
				{ x: 300, y: 25 },
			];
		} else if (window.innerWidth <= 520) {
			lineConfigs = [
				{ x: 250, y: 180 },
				{ x: canvas.width / 1.12, y: 0 },
				{ x: 250, y: 200 },
				{ x: 20, y: 150 },
				{ x: 25, y: 170 },
				{ x: 170, y: 130 },
				{ x: 170, y: 50 },
			];
		}

		// Initialize objects
		const dot = new Dot();
		const dragDrop = new DragDrop(
			canvas.width / 1.6,
			canvas.height / 2,
			window.innerWidth <= 520 ? 50 : 70,
			window.innerWidth <= 520 ? 13 : 20,
			window.innerWidth <= 520 ? 300 : 600,
		);

		const lineArray = lineConfigs.map(
			(config) => new Line(dragDrop.x - config.x, dragDrop.y - config.y, dragDrop.x, dragDrop.y),
		);

		// Event handlers
		const handleMouseDown = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			mouse.startX = e.clientX - rect.left;
			mouse.startY = e.clientY - rect.top + window.scrollY;
			mouse.dragging = true;
			canvas.style.cursor = 'grabbing';
		};

		const handleMouseMove = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			mouse.startX = e.clientX - rect.left;
			mouse.startY = e.clientY - rect.top + window.scrollY;

			if (!mouse.dragging) {
				canvas.style.cursor = 'grab';
			}
		};

		const handleMouseUp = () => {
			mouse.dragging = false;
			canvas.style.cursor = 'grab';
		};

		// Touch handlers for mobile
		const handleTouchStart = (e: TouchEvent) => {
			e.preventDefault();
			const touch = e.touches[0];
			const rect = canvas.getBoundingClientRect();
			mouse.startX = touch.clientX - rect.left;
			mouse.startY = touch.clientY - rect.top + window.scrollY;
			mouse.dragging = true;
		};

		const handleTouchMove = (e: TouchEvent) => {
			e.preventDefault();
			const touch = e.touches[0];
			const rect = canvas.getBoundingClientRect();
			mouse.startX = touch.clientX - rect.left;
			mouse.startY = touch.clientY - rect.top + window.scrollY;
		};

		const handleTouchEnd = () => {
			mouse.dragging = false;
		};

		// Animation loop
		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Update and draw objects
			lineArray.forEach((line) => {
				line.x2 = dragDrop.cosX;
				line.y2 = dragDrop.sinY;
				line.update();
				line.draw();
			});

			dragDrop.update();
			dragDrop.draw();

			dot.update();
			dot.draw();

			animationId = requestAnimationFrame(animate);
		};

		// Add event listeners
		canvas.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
		canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
		canvas.addEventListener('touchend', handleTouchEnd);

		window.addEventListener('resize', resizeCanvas);

		// Start animation
		animate();

		// Cleanup
		return () => {
			cancelAnimationFrame(animationId);
			canvas.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
			canvas.removeEventListener('touchstart', handleTouchStart);
			canvas.removeEventListener('touchmove', handleTouchMove);
			canvas.removeEventListener('touchend', handleTouchEnd);
			window.removeEventListener('resize', resizeCanvas);
		};
	}, []);
};
