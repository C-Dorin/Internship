import { Aterizari, Decolari } from '@/types/product.type';

class ProductService {
	async showDecolari(): Promise<Decolari[]> {
		try {
			const response = await fetch(`/api/product/decolari`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || `Request to decolari failed`);
			}

			return data;
		} catch (error: unknown) {
			console.error(`Error in decolari:`, (error as Error).message);
			throw error;
		}
	}

	async showAterizari(): Promise<Aterizari[]> {
		try {
			const response = await fetch(`/api/product/aterizari`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || `Request to aterizari failed`);
			}

			return data;
		} catch (error: unknown) {
			console.error(`Error in aterizari:`, (error as Error).message);
			throw error;
		}
	}
}

export const productService = new ProductService();
