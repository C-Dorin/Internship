export type OrarDestinatie = {
	id_orar: number;
	cod_cursa: string;
	ziua_saptamanii: string;
	ora_decolare: string;
	ora_aterizare: string;
	directia: string;
	id_avion: number;
};

export type LocuriDisponibilePerCursa = {
	id_orar: number;
	cod_cursa: string;
	locuri_ocupate: number;
	locuri_libere: number;
	locuri_totale: number;
};

export type OrarDecolareAvion = {
	id_orar: number;
	cod_cursa: string;
	ziua_saptamanii: string;
	ora_decolare: string;
	id_avion: number;
	oras_destinatie: string;
};
export type AvioaneAeroport = {
	id_avion: number;
};
