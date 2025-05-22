import LearningProductLayout from '@/containers/layouts/marketing';

interface ProductLayoutProps {
	children: React.ReactNode;
}

export default function ProductLayout({ children }: ProductLayoutProps) {
	return <LearningProductLayout>{children}</LearningProductLayout>;
}
