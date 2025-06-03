import CustomerSupport from '@/containers/layouts/customerSupport';
import { Toaster } from '@/components/ui/toaster';

interface CustomerSupportLayoutProps {
	children: React.ReactNode;
}

export default function CustomerSupportLayout({ children }: CustomerSupportLayoutProps) {
	return (
		<CustomerSupport>
			{children}
			<Toaster />
		</CustomerSupport>
	);
}
