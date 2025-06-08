'use client';

import * as React from 'react';
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';
import {
	MorphingDialog,
	MorphingDialogTrigger,
	MorphingDialogContent,
	MorphingDialogTitle,
	MorphingDialogClose,
	MorphingDialogContainer
} from '@/components/motion-primitives/morphing-dialog';
import { GlowEffect } from '@/components/motion-primitives/glow-effect';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LocuriDisponibilePerCursa } from '@/types/client.type';
import { useLocuriDisponibilePerCursaStore } from '@/lib/store/client.store';
import { useMemo, useState } from 'react';
import { clientService } from '@/lib/services/api/client.api';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { BorderTrail } from '@/components/motion-primitives/border-trail';
import { TextShimmer } from '@/components/motion-primitives/text-shimmer';

export function LocuriDisponibileTable() {
	const data = useLocuriDisponibilePerCursaStore((state) => state.locuriDisponibilePerCursa);
	const setLocuriDisponibilePerCursa = useLocuriDisponibilePerCursaStore(
		(state) => state.setLocuriDisponibilePerCursa
	);

	const [cod, setCod] = useState('');

	const locuriDisponibilePerCursaService = useMemo(() => clientService, []);
	const handleSubmit = async () => {
		try {
			const data = await locuriDisponibilePerCursaService.showLocuriDisponibilePerCursa(cod);
			setLocuriDisponibilePerCursa(data);
		} catch (err: any) {
			console.error('Error fetching pages: ', err);
		}
	};

	const [isHovered, setIsHovered] = useState(false);

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection
		},
		initialState: {
			pagination: {
				pageSize: 10
			}
		}
	});

	return (
		<MorphingDialog
			transition={{
				type: 'spring',
				stiffness: 200,
				damping: 24
			}}
		>
			<MorphingDialogTrigger>
				<GlowEffect
					colors={['#FFB5E8', '#B28DFF', '#85E3FF', '#AFF8DB']}
					mode="colorShift"
					blur="soft"
					duration={3}
					scale={0.98}
				/>
				<Button
					variant="outline"
					className="w-[35rem] h-25 relative outline outline-[#fff2f21f] hover:bg-background"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<MorphingDialogTitle className="text-2xl font-medium">
						{isHovered ? (
							<TextShimmer
								duration={1}
								className="[--base-color:var(--muted-foreground)] [--base-gradient-color:var(--accent-foreground)] dark:[--base-color:var(--muted-foreground)] dark:[--base-gradient-color:var(--accent-foreground)]"
							>
								Vezi Locurile Disponibile
							</TextShimmer>
						) : (
							<span>Vezi Locurile Disponibile</span>
						)}
					</MorphingDialogTitle>
				</Button>
			</MorphingDialogTrigger>
			<MorphingDialogContainer>
				<MorphingDialogContent className="relative h-auto w-[50rem]">
					<BorderTrail
						style={{
							boxShadow:
								'0px 0px 60px 30px #FFB5E880, 0px 0px 100px 60px #B28DFF80, 0px 0px 140px 90px #85E3FF80, 0px 0px 180px 120px #AFF8DB80'
						}}
						size={900}
					/>
					<ScrollArea className="h-[70vh]" type="scroll">
						<div className="w-full">
							<div className="w-full flex flex-col">
								<MorphingDialogTitle className="text-4xl mt-1 ml-2">
									Vezi Locurile Disponibile
								</MorphingDialogTitle>
								<div className="flex justify-center py-6">
									<div className="flex flex-col space-y-4 max-w-sm">
										<div className="flex flex-col space-y-2 max-w-sm">
											<Label>Cod</Label>
											<Input
												placeholder="FL028"
												value={cod}
												onChange={(e) => setCod(e.target.value)}
												className="max-w-sm min-w-3xs"
											/>
										</div>
										<Button onClick={handleSubmit}>Obține info</Button>
									</div>
								</div>
							</div>
							<Separator className="my-4" />
							<div className="flex items-center py-4">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" className="ml-auto">
											Coloane <ChevronDown />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										{table
											.getAllColumns()
											.filter((column) => column.getCanHide())
											.map((column) => {
												return (
													<DropdownMenuCheckboxItem
														key={column.id}
														className="capitalize"
														checked={column.getIsVisible()}
														onCheckedChange={(value) => column.toggleVisibility(!!value)}
													>
														{column.id}
													</DropdownMenuCheckboxItem>
												);
											})}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
							<div className="rounded-md border">
								<Table>
									<TableHeader>
										{table.getHeaderGroups().map((headerGroup) => (
											<TableRow key={headerGroup.id}>
												{headerGroup.headers.map((header) => {
													return (
														<TableHead key={header.id}>
															{header.isPlaceholder
																? null
																: flexRender(header.column.columnDef.header, header.getContext())}
														</TableHead>
													);
												})}
											</TableRow>
										))}
									</TableHeader>
									<TableBody>
										{table.getRowModel().rows?.length ? (
											table.getRowModel().rows.map((row) => (
												<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
													{row.getVisibleCells().map((cell) => (
														<TableCell key={cell.id}>
															{flexRender(cell.column.columnDef.cell, cell.getContext())}
														</TableCell>
													))}
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell colSpan={columns.length} className="h-24 text-center">
													No results.
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</div>
							<div className="flex items-center justify-end space-x-2 py-4">
								<div className="flex-1 text-sm text-muted-foreground">
									{table.getFilteredRowModel().rows.length} rows
								</div>
								<div className="space-x-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => table.previousPage()}
										disabled={!table.getCanPreviousPage()}
									>
										Previous
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={() => table.nextPage()}
										disabled={!table.getCanNextPage()}
									>
										Next
									</Button>
								</div>
							</div>
						</div>
					</ScrollArea>
					<MorphingDialogClose />
				</MorphingDialogContent>
			</MorphingDialogContainer>
		</MorphingDialog>
	);
}

export const columns: ColumnDef<LocuriDisponibilePerCursa>[] = [
	{
		accessorKey: 'cod_cursa',
		header: 'Cod cursă',
		cell: ({ row }) => <div className="capitalize">{row.getValue('cod_cursa')}</div>
	},
	{
		accessorKey: 'locuri_ocupate',
		header: 'Locuri Ocupate',
		cell: ({ row }) => <div className="capitalize">{row.getValue('locuri_ocupate')}</div>
	},
	{
		accessorKey: 'locuri_libere',
		header: 'Locuri Libere',
		cell: ({ row }) => <div className="capitalize">{row.getValue('locuri_libere')}</div>
	},
	{
		accessorKey: 'locuri_totale',
		header: 'Locuri Totale',
		cell: ({ row }) => <div className="capitalize">{row.getValue('locuri_totale')}</div>
	}
];
