'use client';

import { AvioaneAeroportTable } from './components/avioaneAeroport';
import { LocuriDisponibileTable } from './components/locuriDisponibile';
import { OrarAvioaneTable } from './components/orarulAvioanelor';
import { OrarDestinatieTable } from './components/orarulDestinatiei';
export default function Admin() {
	return (
		<div>
			<OrarAvioaneTable />
			<OrarDestinatieTable />
			<LocuriDisponibileTable />
			<AvioaneAeroportTable />
		</div>
	);
}
