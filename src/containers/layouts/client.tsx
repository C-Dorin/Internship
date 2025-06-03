'use client';

import { ThemeImage } from '@/components/theme-image';
import { ModeToggle } from '@/components/theme-toggler';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copyright, FileUser, LogOut, Trash } from 'lucide-react';
import Link from 'next/link';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { authService } from '@/lib/services/api/auth.api';
import { toast } from 'sonner';

export default function LearningClientLayout({ children }: { children: React.ReactNode }) {
	const handleSignOut = async (): Promise<void> => {
		try {
			const { message } = await authService.signOut();
			toast.success(message);
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return (
		<div className="flex flex-col min-h-screen">
			{/* Header */}
			<header className="px-24 pt-6 sticky top-0 z-20">
				<Card className="flex flex-row justify-between px-8 bg-background/70 backdrop-blur-md">
					<div className="flex">
						<Link href="/workspace" passHref className="flex space-x-2 min-w-[25rem]">
							<ThemeImage
								lightSrc="/icons/light_mode/favicon.svg"
								darkSrc="/icons/dark_mode/favicon.svg"
								alt="icon"
								width={32}
								height={32}
							/>
							<span className="text-xl font-medium">AEROPORT INTERNATIONAL CHISINAU</span>
						</Link>
					</div>
					<div className="flex space-x-3">
						<ModeToggle />
						<div className="flex space-x-1.5">
							<Label>Larda</Label>
							<Label>Chislow</Label>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="h-8 w-8 p-0">
										<span className="sr-only">Open menu</span>
										<Avatar>
											<AvatarImage src="{avatar}" alt="@avatar" />
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>Client</DropdownMenuLabel>
									<DropdownMenuItem>
										<FileUser />
										<p>Aplică la o poziție</p>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={handleSignOut}>
										<LogOut />
										<p>Log out</p>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Trash className="text-destructive" />
										<p className="text-destructive">Șterge Account</p>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</Card>
			</header>
			<main className="flex-grow flex pt-4 px-4 justify-center z-10">{children}</main>
			{/* Footer */}
			<footer className="flex justify-center bg-accent">
				<div className="flex items-center space-x-1 py-40 text-sm font-medium">
					<Copyright size={16} />
					<p>2025</p>
					<p>Aeroport International Chisinau</p>
				</div>
			</footer>
		</div>
	);
}
