import { ThemeProvider } from '@/components/theme-provider';
import { ThemeFavicon } from '@/components/theme-favicon';
import '@/styles/global.css';

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/lightModeLogo/favicon-32x32.png" sizes="32x32" />
				<link rel="apple-touch-icon" href="/lightModeLogo/apple-touch-icon.png" />
				<link rel="icon" href="/darkModeLogo/favicon-32x32.png" sizes="32x32" />
				<link rel="apple-touch-icon" href="/darkModeLogo/apple-touch-icon.png" />
			</head>
			<body className="bg-background text-foreground">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ThemeFavicon />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
