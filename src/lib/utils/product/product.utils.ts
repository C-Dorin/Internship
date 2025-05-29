import { createSupabaseClientAnonymous } from '@/lib/supabase/client';
import { Aterizari, Decolari } from '@/types/product.type';

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

export const getDecolari = async (): Promise<Decolari[]> => {
	const { data, error } = await createSupabaseClientAnonymous.rpc('show_decolari');

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

export const getAterizari = async (): Promise<Aterizari[]> => {
	const { data, error } = await createSupabaseClientAnonymous.rpc('show_aterizari');

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
