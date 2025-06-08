import { DurataZbor, LocuriDisponibileToateCursele, PretMediu } from '@/types/customerSupport.type';

class CustomerSupportService {
	async showDurataZbor(): Promise<DurataZbor[]> {
		try {
			const response = await fetch(`/api/customerSupport/durataZbor`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || `Request to DurataZbor failed`);
			}

			return data;
		} catch (error: unknown) {
			console.error(`Error in DurataZbor:`, (error as Error).message);
			throw error;
		}
	}

	async showLocuriDisponibileToateCursele(): Promise<LocuriDisponibileToateCursele[]> {
		try {
			const response = await fetch(`/api/customerSupport/locuriDisponibileToateCursele`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || `Request to LocuriDisponibileToateCursele failed`);
			}

			return data;
		} catch (error: unknown) {
			console.error(`Error in LocuriDisponibileToateCursele:`, (error as Error).message);
			throw error;
		}
	}

	async showPretMediu(oras: string): Promise<PretMediu[]> {
		try {
			const params = new URLSearchParams({ oras });
			const response = await fetch(`/api/customerSupport/pretMediu?${params.toString()}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || `Request to PretMediu failed`);
			}

			return data;
		} catch (error: unknown) {
			console.error(`Error in PretMediu:`, (error as Error).message);
			throw error;
		}
	}
}

export const customerSupportService = new CustomerSupportService();
