'use client';

import { CornerLeftDown, CornerRightDown } from 'lucide-react';
import { AvioaneAeroportTable } from '../client/components/avioaneAeroport';
import { LocuriDisponibileTable } from '../client/components/locuriDisponibile';
import { OrarAvioaneTable } from '../client/components/orarulAvioanelor';
import { OrarDestinatieTable } from '../client/components/orarulDestinatiei';
import { DurataZborTable } from './components/durataZbor';
import { LocuriDisponibileToateCurseleTable } from './components/locuriDisponibile';
import { PretMediuTable } from './components/pretMediu';

export default function CustomerSupport() {
	return (
		<div className="py-30">
			<div className="pb-20">
				<div className="flex items-stretch justify-center space-x-3 h-22">
					<CornerLeftDown size={60} className="self-end" />
					<p className="text-6xl self-start">Vezi Statisticile CS</p>
					<CornerRightDown size={60} className="self-end" />
				</div>
			</div>
			<div className="flex flex-wrap justify-center gap-5">
				<LocuriDisponibileToateCurseleTable />
				<PretMediuTable />
				<DurataZborTable />
				<OrarAvioaneTable />
				<OrarDestinatieTable />
				<LocuriDisponibileTable />
				<AvioaneAeroportTable />
			</div>
		</div>
	);
}
