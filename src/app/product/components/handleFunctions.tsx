'use client';

import { Decolari } from '@/types/product.type';
import { productService } from '@/lib/services/api/product.api';

export const useDecolariHandler = () => {
	const getDecolari = async (): Promise<Decolari[]> => {
		try {
			const data = await productService.showDecolari();
			return data;
		} catch (error) {
			console.error(error);
			return [];
		}
	};

	return getDecolari;
};
