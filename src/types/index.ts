export interface MousePosition {
	x: number;
	y: number;
}

export interface CanvasPoint {
	x: number;
	y: number;
	baseX?: number;
	baseY?: number;
	dx?: number | null;
	dy?: number | null;
}

export interface Mouse {
	startX: number;
	startY: number;
	dragging: boolean;
}

export interface CardData {
	id: string;
	number: string;
	title?: string;
	subtitle: string;
	variant: 'default' | 'gradient' | 'offset' | 'expandable';
}

export interface NavigationItem {
	id: string;
	label: string;
	href: string;
	external?: boolean;
}

export interface ContactInfo {
	email: string;
	twitter?: string;
	github?: string;
}

export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
}

export interface SubscriptionData {
	email: string;
}
