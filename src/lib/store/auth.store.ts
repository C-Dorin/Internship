import { create } from 'zustand';
import { User } from '@/types/user.type';

type AuthStore = {
	user: User | null;
	setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	setUser: (user) => set({ user })
}));
