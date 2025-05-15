import type { ApiResponse, SubscriptionData } from '../types';
import { API_ENDPOINTS } from './constants';

export const subscribeToNewsletter = async (data: SubscriptionData): Promise<ApiResponse<any>> => {
	try {
		const formData = new FormData();
		formData.append('EMAIL', data.email);

		const response = await fetch(API_ENDPOINTS.SUBSCRIBE, {
			method: 'POST',
			body: formData,
		});

		if (response.ok) {
			return { success: true };
		} else {
			return {
				success: false,
				error: 'Failed to subscribe',
			};
		}
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error',
		};
	}
};
