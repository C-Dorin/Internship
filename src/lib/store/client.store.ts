import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
	OrarDestinatie,
	OrarDecolareAvion,
	LocuriDisponibilePerCursa,
	AvioaneAeroport
} from '@/types/client.type';

interface OrarDestinatieState {
	orarDestinatie: OrarDestinatie[];
	setOrarDestinatie: (items: OrarDestinatie[]) => void;
	refreshOrarDestinatie: () => Promise<void>;
	orarDestinatieCount: number;
	setOrarDestinatieCount: (count: number) => void;
}

interface OrarDecolareAvionState {
	orarDecolareAvion: OrarDecolareAvion[];
	setOrarDecolareAvion: (items: OrarDecolareAvion[]) => void;
	refreshOrarDecolareAvion: () => Promise<void>;
	orarDecolareAvionCount: number;
	setOrarDecolareAvionCount: (count: number) => void;
}

interface LocuriDisponibilePerCursaState {
	locuriDisponibilePerCursa: LocuriDisponibilePerCursa[];
	setLocuriDisponibilePerCursa: (items: LocuriDisponibilePerCursa[]) => void;
	refreshLocuriDisponibilePerCursa: () => Promise<void>;
	locuriDisponibilePerCursaCount: number;
	setLocuriDisponibilePerCursaCount: (count: number) => void;
}

interface AvioaneAeroportState {
	avioaneAeroport: AvioaneAeroport[];
	setAvioaneAeroport: (items: AvioaneAeroport[]) => void;
	refreshAvioaneAeroport: () => Promise<void>;
	avioaneAeroportCount: number;
	setAvioaneAeroportCount: (count: number) => void;
}

export const useOrarDestinatieStore = create<OrarDestinatieState>()(
	persist(
		(set) => ({
			orarDestinatie: [],
			orarDestinatieCount: 0,
			setOrarDestinatie: (items: OrarDestinatie[]) =>
				set(() => ({ orarDestinatie: items, orarDestinatieCount: items.length })),
			setOrarDestinatieCount: (count: number) => set(() => ({ orarDestinatieCount: count })),
			refreshOrarDestinatie: async () => {}
		}),
		{
			name: 'orarDestinatie-storage'
		}
	)
);

export const useOrarDecolareAvionStore = create<OrarDecolareAvionState>()(
	persist(
		(set) => ({
			orarDecolareAvion: [],
			orarDecolareAvionCount: 0,
			setOrarDecolareAvion: (items: OrarDecolareAvion[]) =>
				set(() => ({ orarDecolareAvion: items, orarDecolareAvionCount: items.length })),
			setOrarDecolareAvionCount: (count: number) => set(() => ({ orarDecolareAvionCount: count })),
			refreshOrarDecolareAvion: async () => {}
		}),
		{
			name: 'orarDecolareAvion-storage'
		}
	)
);

export const useLocuriDisponibilePerCursaStore = create<LocuriDisponibilePerCursaState>()(
	persist(
		(set) => ({
			locuriDisponibilePerCursa: [],
			locuriDisponibilePerCursaCount: 0,
			setLocuriDisponibilePerCursa: (items: LocuriDisponibilePerCursa[]) =>
				set(() => ({
					locuriDisponibilePerCursa: items,
					locuriDisponibilePerCursaCount: items.length
				})),
			setLocuriDisponibilePerCursaCount: (count: number) =>
				set(() => ({ locuriDisponibilePerCursaCount: count })),
			refreshLocuriDisponibilePerCursa: async () => {}
		}),
		{
			name: 'locuriDisponibilePerCursa-storage'
		}
	)
);

export const useAvioaneAeroportStore = create<AvioaneAeroportState>()(
	persist(
		(set) => ({
			avioaneAeroport: [],
			avioaneAeroportCount: 0,
			setAvioaneAeroport: (items: AvioaneAeroport[]) =>
				set(() => ({ avioaneAeroport: items, avioaneAeroportCount: items.length })),
			setAvioaneAeroportCount: (count: number) => set(() => ({ avioaneAeroportCount: count })),
			refreshAvioaneAeroport: async () => {}
		}),
		{
			name: 'avioaneAeroport-storage'
		}
	)
);
