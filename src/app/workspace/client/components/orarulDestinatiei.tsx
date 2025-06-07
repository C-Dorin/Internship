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
import { ArrowUpDown, ChevronDown } from 'lucide-react';
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
import { OrarDestinatie } from '@/types/client.type';
import { useOrarDestinatieStore } from '@/lib/store/client.store';
import { useMemo, useState } from 'react';
import { clientService } from '@/lib/services/api/client.api';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export function OrarDestinatieTable() {
	const data = useOrarDestinatieStore((state) => state.orarDestinatie);
	const setOrarDestinatie = useOrarDestinatieStore((state) => state.setOrarDestinatie);

	const [oras, setOras] = useState('');

	const orarDestinatieService = useMemo(() => clientService, []);
	const handleSubmit = async () => {
		try {
			const data = await orarDestinatieService.showOrarDestinatie(oras);
			setOrarDestinatie(data);
		} catch (err: any) {
			console.error('Error fetching pages: ', err);
		}
	};

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
		<div className="w-full">
			<div className="w-full flex flex-col pb-4">
				<div className="text-4xl text-bold py-12">Vezi orarul avioanelor</div>
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
			<Separator className="my-4" />
			<div className="flex items-center py-4">
				<Input
					placeholder="Filtrează orașe..."
					value={(table.getColumn('oras_destinatie')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('oras_destinatie')?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
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
	);
}

export const columns: ColumnDef<OrarDestinatie>[] = [
	{
		accessorKey: 'cod_cursa',
		header: 'Cod cursă',
		cell: ({ row }) => <div className="capitalize">{row.getValue('cod_cursa')}</div>
	},
	{
		accessorKey: 'oras_destinatie',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="space-x-2 capitalize"
			>
				<p>Oraș destinație</p>
				<ArrowUpDown />
			</Button>
		),
		cell: ({ row }) => <div className="pl-4.5">{row.getValue('oras_destinatie')}</div>
	},
	{
		accessorKey: 'ziua_saptamanii',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="space-x-2 capitalize"
			>
				<p>Ziua săptămânii</p>
				<ArrowUpDown />
			</Button>
		),
		cell: ({ row }) => <div className="capitalize">{row.getValue('ziua_saptamanii')}</div>
	},
	{
		accessorKey: 'ora_decolare',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="space-x-2 capitalize"
			>
				<p>Ora decolare</p>
				<ArrowUpDown />
			</Button>
		),
		cell: ({ row }) => {
			const ora = row.getValue('ora_decolare') as string;
			return <div className="font-medium">{ora}</div>;
		}
	},
	{
		accessorKey: 'id_avion',
		header: 'ID Avion',
		cell: ({ row }) => <div className="text-center">{row.getValue('id_avion')}</div>
	}
];
