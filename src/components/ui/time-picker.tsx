import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Clock } from 'lucide-react';

export function TimePicker({ onChange }: { onChange?: (time: string) => void }) {
	const [hour, setHour] = useState<string | null>(null);
	const [minute, setMinute] = useState<string | null>(null);

	const handleTimeChange = (h: string | null, m: string | null) => {
		if (h !== null && m !== null) {
			const time = `${h}:${m}`;
			onChange?.(time);
		}
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="w-[180px] justify-between font-normal">
					{hour && minute ? `${hour}:${minute}` : 'Select Time'}
					<Clock className="ml-2 h-4 w-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="flex gap-4 p-4">
				<div>
					<p className="text-sm font-medium mb-1 pl-3">Hour</p>
					<Select
						onValueChange={(val) => {
							setHour(val);
							handleTimeChange(val, minute);
						}}
					>
						<SelectTrigger className="w-[80px]">
							<SelectValue placeholder="HH" />
						</SelectTrigger>
						<SelectContent>
							{Array.from({ length: 24 }).map((_, i) => {
								const val = String(i).padStart(2, '0');
								return (
									<SelectItem key={val} value={val}>
										{val}
									</SelectItem>
								);
							})}
						</SelectContent>
					</Select>
				</div>

				<div>
					<p className="text-sm font-medium mb-1 pl-3">Minute</p>
					<Select
						onValueChange={(val) => {
							setMinute(val);
							handleTimeChange(hour, val);
						}}
					>
						<SelectTrigger className="w-[80px]">
							<SelectValue placeholder="MM" />
						</SelectTrigger>
						<SelectContent>
							{Array.from({ length: 60 }).map((_, i) => {
								const val = String(i).padStart(2, '0');
								return (
									<SelectItem key={val} value={val}>
										{val}
									</SelectItem>
								);
							})}
						</SelectContent>
					</Select>
				</div>
			</PopoverContent>
		</Popover>
	);
}
