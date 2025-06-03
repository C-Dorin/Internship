import LearningAdminLayout from '@/containers/layouts/admin';
import { Toaster } from '@/components/ui/toaster';

interface AdminLayoutProps {
	children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
	return (
		<LearningAdminLayout>
			{children}
			<Toaster />
		</LearningAdminLayout>
	);
}
