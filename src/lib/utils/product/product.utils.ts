import { createSupabaseClientAnonymous } from '@/lib/supabase/client';
import { Decolari } from '@/types/product.type';

export const getDecolari = async (): Promise<Decolari[]> => {
	const { data, error } = await createSupabaseClientAnonymous.rpc('show_decolari');

	if (error) {
		console.error('Error showing decolari:', error.message);
		return [];
	}
	return data;
};
