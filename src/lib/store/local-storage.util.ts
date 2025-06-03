import type { User } from '@/types/user.type';

const USER_STORAGE_KEY = 'current_user';

export const saveUserToLocalStorage = (user: User) => {
	localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const getUserFromLocalStorage = (): User | null => {
	const data = localStorage.getItem(USER_STORAGE_KEY);
	return data ? JSON.parse(data) : null;
};

export const clearUserFromLocalStorage = () => {
	localStorage.removeItem(USER_STORAGE_KEY);
};
