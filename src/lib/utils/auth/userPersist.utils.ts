import { saveUserToLocalStorage } from '@/lib/store/local-storage.util';
import { Session } from '@supabase/supabase-js';
import { User } from '@/types/user.type';

// Fetch the current user's details using the Supabase client
export const persistUserFromSession = (session: Session | null) => {
	if (!session?.user) return;

	console.log('User:', session.user);
	const metadata = session.user.user_metadata;

	const user: User = {
		id: session.user.id,
		email: session.user.email ?? undefined,
		firstName: metadata?.firstName ?? metadata?.full_name?.split(' ')[0] ?? undefined,
		lastName: metadata?.lastName ?? metadata?.full_name?.split(' ')[1] ?? undefined,
		avatar: metadata?.avatar_url ?? metadata?.picture ?? 'https://ui-avatars.com/api/?name=CD'
	};

	saveUserToLocalStorage(user);
};
