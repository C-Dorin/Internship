import { createSupabaseClientServiceRole } from '@/lib/supabase/server';
import { User } from '@/types/user.type';

// Get the user data by email
export const getUserFromSupabaseByEmail = async (email: string): Promise<User | undefined> => {
	const supabaseServiceRole = createSupabaseClientServiceRole();
	const { data: users, error } = await supabaseServiceRole.auth.admin.listUsers();

	if (error || !users) {
		console.error('Failed to fetch user:', error?.message);
		throw new Error(error?.message || 'Error fetching users from the database.');
	}

	const user = users?.users.find((u) => u.email === email);
	return user;
};

// Check if user exist in Supabase database
export const checkUserExists = async (email: string): Promise<boolean> => {
	const supabaseServiceRole = createSupabaseClientServiceRole();
	const { data: users, error } = await supabaseServiceRole.auth.admin.listUsers();

	if (error || !users) {
		console.error('Failed to fetch user:', error?.message);
		throw new Error(error?.message || 'Error fetching users from the database.');
	}

	return users?.users.some((u) => u.email === email) ?? false;
};
