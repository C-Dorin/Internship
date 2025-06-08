'use client';

import { CornerLeftDown, CornerRightDown } from 'lucide-react';
import { AvioaneAeroportTable } from './components/avioaneAeroport';
import { LocuriDisponibileTable } from './components/locuriDisponibile';
import { OrarAvioaneTable } from './components/orarulAvioanelor';
import { OrarDestinatieTable } from './components/orarulDestinatiei';

export default function Admin() {
	return (
		<div className="py-30">
			<div className="pb-20">
				<div className="flex items-stretch justify-center space-x-3 h-22">
					<CornerLeftDown size={60} className="self-end" />
					<p className="text-6xl self-start">Vezi Statisticile</p>
					<CornerRightDown size={60} className="self-end" />
				</div>
			</div>
			<div className="flex flex-wrap justify-center gap-5">
				<OrarAvioaneTable />
				<OrarDestinatieTable />
				<LocuriDisponibileTable />
				<AvioaneAeroportTable />
			</div>
		</div>
	);
}
