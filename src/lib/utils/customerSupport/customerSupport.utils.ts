import { createSupabaseClientAnonymous } from '@/lib/supabase/client';
import { DurataZbor, LocuriDisponibileToateCursele, PretMediu } from '@/types/customerSupport.type';

function parseDuration(duration: string) {
	const [daysPart, timePart] = duration.split(' days ');
	const totalDays = parseInt(daysPart.trim(), 10);
	const [hoursStr, minutesStr, secondsStr] = timePart.split(':');

	const hours = parseInt(hoursStr, 10);
	const minutes = parseInt(minutesStr, 10);

	const months = Math.floor(totalDays / 30);
	const remainingDays = totalDays % 30;

	const extraDaysFromHours = Math.floor(hours / 24);
	const days = remainingDays + extraDaysFromHours;
	const remainingHours = hours % 24;

	return {
		months: months,
		days: days,
		hours: remainingHours,
		minutes: minutes
	};
}

export const getDurataZbor = async (): Promise<DurataZbor[]> => {
	const { data, error } = await createSupabaseClientAnonymous.rpc('show_durata_zbor', {});

	if (error) {
		console.error('Error showing decolari:', error.message);
		return [];
	}

	const formattedData =
		data?.map((item) => {
			const { months, days, hours, minutes } = parseDuration(item.durata as string);
			let durata = '';
			if (months > 0) durata += months + 'mo ';
			if (months > 0 && days > 0) durata += days + 'd ';
			durata += hours + 'h ';
			durata += minutes + 'm';

			return {
				...item,
				durata: durata
			};
		}) ?? null;

	return formattedData;
};

export const getLocuriDisponibileToateCursele = async (): Promise<
	LocuriDisponibileToateCursele[]
> => {
	const { data, error } = await createSupabaseClientAnonymous.rpc('show_locuri_disponibile', {});

	if (error) {
		console.error('Error showing decolari:', error.message);
		return [];
	}

	return data;
};

export const getPretMediu = async (oras: string): Promise<PretMediu[]> => {
	const { data, error } = await createSupabaseClientAnonymous.rpc('show_pret_mediu', {
		_oras: oras
	});

	if (error) {
		console.error('Error showing decolari:', error.message);
		return [];
	}

	return data;
};
