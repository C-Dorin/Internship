'use client';

import { useRouter } from 'next/navigation';
import { ThemeImage } from '@/components/theme-image';
import { ModeToggle } from '@/components/theme-toggler';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copyright } from 'lucide-react';
import Link from 'next/link';

export default function LearningProductLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const goToSignUp = (e: React.MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();
		router.push('/auth?mode=signUp');
	};

	const goToSignIn = (e: React.MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();
		router.push('/auth?mode=signIn');
	};

	return (
		<div className="flex flex-col min-h-screen">
			{/* Header */}
			<header className="px-24 pt-6 sticky top-0 z-20">
				<Card className="flex flex-row justify-between px-8 bg-background/70 backdrop-blur-md">
					<div className="flex">
						<Link href="/product" passHref className="flex space-x-2 min-w-[25rem]">
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
						<Link href="/product" onClick={goToSignIn} passHref>
							<Button variant="ghost" size="xs">
								<span className="text-lg font-normal">Sign in</span>
							</Button>
						</Link>
						<Link href="/product" onClick={goToSignUp} passHref>
							<Button size="xs" className="rounded-sm">
								<span className="text-lg font-normal">Sign up</span>
							</Button>
						</Link>
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
