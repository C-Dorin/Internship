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
import { Checkbox } from '@/components/ui/checkbox';
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
import { Decolari } from '@/types/product.type';
import { useDecolariStore } from '@/lib/store/product.store';
import { useEffect, useMemo } from 'react';
import { productService } from '@/lib/services/api/product.api';

export function DecolariTable() {
	const data = useDecolariStore((state) => state.decolari);
	const setDecolari = useDecolariStore((state) => state.setDecolari);

	const decolariService = useMemo(() => productService, []);
	useEffect(() => {
		async function fetchAndStoreDecolari() {
			try {
				const data = await decolariService.showDecolari();
				setDecolari(data);
			} catch (err: any) {
				console.error('Error fetching pages: ', err);
			}
		}
		fetchAndStoreDecolari();
	}, [setDecolari, decolariService]);

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

const columns: ColumnDef<Decolari>[] = [
	{
		accessorKey: 'cod_cursa',
		header: 'Cod cursă',
		cell: ({ row }) => <div className="capitalize">{row.getValue('cod_cursa')}</div>
	},
	{
		accessorKey: 'oras_destinatie',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="space-x-2 capitalize"
				>
					<p>Oraș Destinație</p>
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => <div className="pl-4.5">{row.getValue('oras_destinatie')}</div>
	},
	{
		accessorKey: 'ora_decolare',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className="space-x-2 capitalize"
				>
					<p>Ora de decolare</p>
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => {
			const { ora_decolare_time, ora_decolare_date } = row.original;
			return (
				<div className="pr-18 flex justify-around">
					<div className="font-medium">{ora_decolare_time}</div>
					<div>{ora_decolare_date}</div>
				</div>
			);
		}
	},
	{
		id: 'amanata',
		header: ({ table }) => <div className="capitalize">Amanata</div>,
		cell: ({ row }) => (
			<Checkbox checked={row.original.amanata} disabled className="pointer-events-none" />
		),
		enableSorting: false
	},
	{
		id: 'anulata',
		header: ({ table }) => <div className="capitalize">Anulată</div>,
		cell: ({ row }) => (
			<Checkbox checked={row.original.anulata} disabled className="pointer-events-none" />
		),
		enableSorting: false
	}
];
