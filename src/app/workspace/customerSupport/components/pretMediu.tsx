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
import { PretMediu } from '@/types/customerSupport.type';
import { usePretMediuStore } from '@/lib/store/customerSupport.store';
import { useMemo, useState } from 'react';
import { customerSupportService } from '@/lib/services/api/customerSupport.api';
import { Separator } from '@/components/ui/separator';
import { BorderTrail } from '@/components/motion-primitives/border-trail';
import { TextShimmer } from '@/components/motion-primitives/text-shimmer';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function PretMediuTable() {
	const data = usePretMediuStore((state) => state.pretMediu);
	const setPretMediu = usePretMediuStore((state) => state.setPretMediu);

	const [oras, setOras] = useState('');

	const pretMediuService = useMemo(() => customerSupportService, []);
	const handleSubmit = async () => {
		try {
			const data = await pretMediuService.showPretMediu(oras);
			setPretMediu(data);
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
					colors={['#FF5F1F', '#FF8C00', '#FFD700']}
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
								Vezi Prețul Mediu a Unei Curse
							</TextShimmer>
						) : (
							<span>Vezi Prețul Mediu a Unei Curse</span>
						)}
					</MorphingDialogTitle>
				</Button>
			</MorphingDialogTrigger>
			<MorphingDialogContainer>
				<MorphingDialogContent className="relative h-auto w-[50rem]">
					<BorderTrail
						style={{
							boxShadow:
								'0px 0px 60px 30px #FF00FF80, 0px 0px 100px 60px #00FFFF80, 0px 0px 140px 90px #39FF1480, 0px 0px 180px 120px #FF6EC780'
						}}
						size={900}
					/>
					<ScrollArea className="h-[70vh]" type="scroll">
						<div className="w-full">
							<div className="w-full flex flex-col">
								<MorphingDialogTitle className="text-4xl mt-1 ml-2">
									Vezi Prețul Mediu a Unei Curse
								</MorphingDialogTitle>
								<div className="flex justify-center py-6">
									<div className="flex flex-col space-y-4 max-w-sm">
										<div className="flex flex-col space-y-2 max-w-sm">
											<Label>Oraș</Label>
											<Input
												placeholder="Sofia"
												value={oras}
												onChange={(e) => setOras(e.target.value)}
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

export const columns: ColumnDef<PretMediu>[] = [
	{
		accessorKey: 'oras_destinatie',
		header: 'Oras Destinatie',
		cell: ({ row }) => <div>{row.getValue('oras_destinatie')}</div>
	},
	{
		accessorKey: 'pret_mediu',
		header: 'Pret Mediu',
		cell: ({ row }) => <div>{row.getValue('pret_mediu')}</div>
	}
];
