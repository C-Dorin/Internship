import {
	OrarDecolareAvion,
	OrarDestinatie,
	LocuriDisponibilePerCursa,
	AvioaneAeroport
} from '@/types/client.type';

class ClientService {
	async showOrarDecolareAvion(
		oras: string,
		oraMin: string,
		oraMax: string
	): Promise<OrarDecolareAvion[]> {
		try {
			const params = new URLSearchParams({
				oras,
				oraMin,
				oraMax
			});
			const response = await fetch(`/api/client/orarDecolareAvion?${params.toString()}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || `Request to OrarDecolareAvion failed`);
			}

			return data;
		} catch (error: unknown) {
			console.error(`Error in OrarDecolareAvion:`, (error as Error).message);
			throw error;
		}
	}

	async showOrarDestinatie(oras: string): Promise<OrarDestinatie[]> {
		try {
			const params = new URLSearchParams({ oras });
			const response = await fetch(`/api/client/orarDestinatie?${params.toString()}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || `Request to OrarDestinatie failed`);
			}

			return data;
		} catch (error: unknown) {
			console.error(`Error in OrarDestinatie:`, (error as Error).message);
			throw error;
		}
	}

	async showLocuriDisponibilePerCursa(cod: string): Promise<LocuriDisponibilePerCursa[]> {
		try {
			const params = new URLSearchParams({ cod });
			const response = await fetch(`/api/client/locuriDisponibilePerCursa?${params.toString()}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || `Request to LocuriDisponibilePerCursa failed`);
			}

			return data;
		} catch (error: unknown) {
			console.error(`Error in LocuriDisponibilePerCursa:`, (error as Error).message);
			throw error;
		}
	}

	async showAvioaneAeroport(): Promise<AvioaneAeroport[]> {
		try {
			const response = await fetch(`/api/client/avioaneAeroport`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || `Request to AvioaneAeroport failed`);
			}

			return data;
		} catch (error: unknown) {
			console.error(`Error in AvioaneAeroport:`, (error as Error).message);
			throw error;
		}
	}
}

export const clientService = new ClientService();
