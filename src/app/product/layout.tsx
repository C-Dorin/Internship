import LearningProductLayout from '@/containers/layouts/marketing';
import { Toaster } from '@/components/ui/toaster';

interface ProductLayoutProps {
	children: React.ReactNode;
}

export default function ProductLayout({ children }: ProductLayoutProps) {
	return (
		<LearningProductLayout>
			{children}
			<Toaster />
		</LearningProductLayout>
	);
}
