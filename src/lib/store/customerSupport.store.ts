import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DurataZbor, LocuriDisponibileToateCursele, PretMediu } from '@/types/customerSupport.type';

interface DurataZborState {
	durataZbor: DurataZbor[];
	setDurataZbor: (items: DurataZbor[]) => void;
	refreshDurataZbor: () => Promise<void>;
	durataZborCount: number;
	setDurataZborCount: (count: number) => void;
}

interface LocuriDisponibileToateCurseleState {
	locuriDisponibileToateCursele: LocuriDisponibileToateCursele[];
	setLocuriDisponibileToateCursele: (items: LocuriDisponibileToateCursele[]) => void;
	refreshLocuriDisponibileToateCursele: () => Promise<void>;
	locuriDisponibileToateCurseleCount: number;
	setLocuriDisponibileToateCurseleCount: (count: number) => void;
}

interface PretMediuState {
	pretMediu: PretMediu[];
	setPretMediu: (items: PretMediu[]) => void;
	refreshPretMediu: () => Promise<void>;
	pretMediuCount: number;
	setPretMediuCount: (count: number) => void;
}

export const useDurataZborStore = create<DurataZborState>()(
	persist(
		(set) => ({
			durataZbor: [],
			durataZborCount: 0,
			setDurataZbor: (items: DurataZbor[]) =>
				set(() => ({ durataZbor: items, durataZborCount: items.length })),
			setDurataZborCount: (count: number) => set(() => ({ durataZborCount: count })),
			refreshDurataZbor: async () => {}
		}),
		{
			name: 'durataZbor-storage'
		}
	)
);

export const useLocuriDisponibileToateCurseleStore = create<LocuriDisponibileToateCurseleState>()(
	persist(
		(set) => ({
			locuriDisponibileToateCursele: [],
			locuriDisponibileToateCurseleCount: 0,
			setLocuriDisponibileToateCursele: (items: LocuriDisponibileToateCursele[]) =>
				set(() => ({
					locuriDisponibileToateCursele: items,
					locuriDisponibileToateCurseleCount: items.length
				})),
			setLocuriDisponibileToateCurseleCount: (count: number) =>
				set(() => ({ locuriDisponibileToateCurseleCount: count })),
			refreshLocuriDisponibileToateCursele: async () => {}
		}),
		{
			name: 'locuriDisponibileToateCursele-storage'
		}
	)
);

export const usePretMediuStore = create<PretMediuState>()(
	persist(
		(set) => ({
			pretMediu: [],
			pretMediuCount: 0,
			setPretMediu: (items: PretMediu[]) =>
				set(() => ({
					pretMediu: items,
					pretMediuCount: items.length
				})),
			setPretMediuCount: (count: number) => set(() => ({ pretMediuCount: count })),
			refreshPretMediu: async () => {}
		}),
		{
			name: 'pretMediu-storage'
		}
	)
);
