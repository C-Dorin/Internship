import { createSupabaseClientAnonymous } from '@/lib/supabase/client';
import { Aterizari, Decolari } from '@/types/product.type';

export const getDecolari = async (): Promise<Decolari[]> => {
	const { data, error } = await createSupabaseClientAnonymous.rpc('show_decolari');

	if (error) {
		console.error('Error showing decolari:', error.message);
		return [];
	}
	return data;
};

export const getAterizari = async (): Promise<Aterizari[]> => {
	const { data, error } = await createSupabaseClientAnonymous.rpc('show_aterizari');

	if (error) {
		console.error('Error showing aterizari:', error.message);
		return [];
	}
	return data;
};
