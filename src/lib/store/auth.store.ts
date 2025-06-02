import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Decolari, Aterizari } from '@/types/product.type';

interface DecolariState {
	decolari: Decolari[];
	setDecolari: (items: Decolari[]) => void;
	refreshDecolari: () => Promise<void>;
	decolariCount: number;
	setDecolariCount: (count: number) => void;
}

interface AterizariState {
	aterizari: Aterizari[];
	setAterizari: (items: Aterizari[]) => void;
	refreshAterizari: () => Promise<void>;
	aterizariCount: number;
	setAterizariCount: (count: number) => void;
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

export const useAterizariStore = create<AterizariState>()(
	persist(
		(set) => ({
			aterizari: [],
			aterizariCount: 0,
			setAterizari: (items: Aterizari[]) =>
				set(() => ({ aterizari: items, aterizariCount: items.length })),
			setAterizariCount: (count: number) => set(() => ({ aterizariCount: count })),
			refreshAterizari: async () => {}
		}),
		{
			name: 'aterizari-storage'
		}
	)
);
