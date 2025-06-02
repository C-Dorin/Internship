import LearningProductLayout from '@/containers/layouts/marketing';
import { Toaster } from '@/components/ui/toaster';

interface AdminLayoutProps {
	children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
	return (
		<LearningProductLayout>
			{children}
			<Toaster />
		</LearningProductLayout>
	);
}
