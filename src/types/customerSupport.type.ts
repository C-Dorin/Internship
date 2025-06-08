export type DurataZbor = {
	id_orar: number;
	durata: string;
};

export type LocuriDisponibileToateCursele = {
	id_orar: number;
	cod_cursa: string;
	locuri_ocupate: number;
	locuri_libere: number;
	locuri_totale: number;
};

export type PretMediu = {
	oras_destinatie: string;
	pret_mediu: number;
};
