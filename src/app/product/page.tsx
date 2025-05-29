'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaneLanding, PlaneTakeoff } from 'lucide-react';
import { DecolariTable } from './components/table/decolariTable';

export default function Product() {
	return (
		<div>
			<div className="flex flex-col items-center py-26">
				<div className="flex flex-col items-center text-6xl/17 font-bold">
					<p>BUN VENIT LA AEROPORTUL</p>
					<div className="flex">
						<p className="text-destructive mr-3">INTERNAȚIONAL</p>
						<p>CHIȘINĂU</p>
					</div>
				</div>
				<div className="flex text-xl font-medium pt-10 text-muted-foreground space-x-1">
					<p>Zborul tău începe</p>
					<p className="text-destructive">AICI</p>
					<p>și</p>
					<p className="text-destructive">ACUM</p>
				</div>
			</div>
			<div className="flex justify-center">
				<Tabs defaultValue="decolari" className="w-[800px] py-4">
					<TabsList className="grid w-full grid-cols-2 rounded-xl">
						<TabsTrigger value="decolari" className="flex space-x-3">
							<PlaneTakeoff size={20} />
							<p>Decolări</p>
						</TabsTrigger>
						<TabsTrigger value="aterizari" className="flex space-x-3">
							<PlaneLanding size={20} />
							<p>Aterizări</p>
						</TabsTrigger>
					</TabsList>
					<TabsContent value="decolari">
						<DecolariTable />
					</TabsContent>
					<TabsContent value="aterizari"></TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
