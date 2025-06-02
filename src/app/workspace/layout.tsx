import LearningWorkspaceLayout from '@/containers/layouts/workspace';
import { Toaster } from '@/components/ui/toaster';

interface WorkspaceLayoutProps {
	children: React.ReactNode;
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
	return (
		<LearningWorkspaceLayout>
			{children}
			<Toaster />
		</LearningWorkspaceLayout>
	);
}
