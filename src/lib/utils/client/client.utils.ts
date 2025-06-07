import { createSupabaseClientAnonymous } from '@/lib/supabase/client';
import {
	OrarDecolareAvion,
	OrarDestinatie,
	LocuriDisponibilePerCursa,
	AvioaneAeroport
} from '@/types/client.type';

const formatOra = (isoString: string) => {
	const date = new Date(isoString);

	const time = date.toLocaleTimeString('ro-RO', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});

	const day = date.toLocaleDateString('ro-RO', {
		day: '2-digit'
	});

	let month = date.toLocaleDateString('ro-RO', {
		month: 'long'
	});
	month = month.charAt(0).toUpperCase() + month.slice(1, 3);

	return {
		time: time,
		date: `${day} ${month}`
	};
};

export const getOrarDecolareAvion = async (
	oras: string,
	ora_decolarii_min: string,
	ora_decolarii_max: string
): Promise<OrarDecolareAvion[]> => {
	const { data, error } = await createSupabaseClientAnonymous.rpc('get_orar_decolare_avion', {
		_oras: oras,
		_ora_decolarii_min: ora_decolarii_min,
		_ora_decolarii_max: ora_decolarii_max
	});

	if (error) {
		console.error('Error showing decolari:', error.message);
		return [];
	}

	const formattedData =
		data?.map((item) => {
			const { time, date } = formatOra(item.ora_decolare);
			return {
				...item,
				ora_decolare_time: time,
				ora_decolare_date: date
			};
		}) ?? null;

	return formattedData;
};

export const getOrarDestinatie = async (oras: string): Promise<OrarDestinatie[]> => {
	const { data, error } = await createSupabaseClientAnonymous.rpc('get_orar_destinatie', {
		_oras: oras
	});

	if (error) {
		console.error('Error showing aterizari:', error.message);
		return [];
	}

	const formattedData =
		data?.map((item) => {
			const { time, date } = formatOra(item.ora_aterizare);
			return {
				...item,
				ora_aterizare_time: time,
				ora_aterizare_date: date
			};
		}) ?? null;

	return formattedData;
};

export const getLocuriDisponibilePerCursa = async (
	cod: string
): Promise<LocuriDisponibilePerCursa[]> => {
	const { data, error } = await createSupabaseClientAnonymous.rpc(
		'show_locuri_disponibile_per_cursa',
		{ _cod: cod }
	);

	if (error) {
		console.error('Error showing aterizari:', error.message);
		return [];
	}

	return data;
};

export const getAvioaneAeroport = async (): Promise<AvioaneAeroport[]> => {
	const { data, error } = await createSupabaseClientAnonymous.rpc('show_aviane_aeroport');

	if (error) {
		console.error('Error showing aterizari:', error.message);
		return [];
	}

	return data;
};
