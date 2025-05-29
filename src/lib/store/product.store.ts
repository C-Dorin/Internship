import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Decolari } from '@/types/product.type';

interface DecolariState {
	decolari: Decolari[];
	setDecolari: (items: Decolari[]) => void;
	refreshDecolari: () => Promise<void>;
	decolariCount: number;
	setDecolariCount: (count: number) => void;
}

export const useDecolariStore = create<DecolariState>()(
	persist(
		(set) => ({
			decolari: [],
			decolariCount: 0,
			setDecolari: (items: Decolari[]) =>
				set(() => ({ decolari: items, decolariCount: items.length })),
			setDecolariCount: (count: number) => set(() => ({ decolariCount: count })),
			refreshDecolari: async () => {}
		}),
		{
			name: 'decolari-storage'
		}
	)
);
