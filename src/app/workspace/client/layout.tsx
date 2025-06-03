import Client from '@/containers/layouts/client';
import { Toaster } from '@/components/ui/toaster';

interface ClientLayoutProps {
	children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
	return (
		<Client>
			{children}
			<Toaster />
		</Client>
	);
}
