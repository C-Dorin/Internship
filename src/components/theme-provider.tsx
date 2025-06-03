'use client';

import { useEffect, useState, useMemo } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import { getUserFromLocalStorage } from '@/lib/store/local-storage.util';
import { useAuthStore } from '@/lib/store/auth.store';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const user = getUserFromLocalStorage();
		if (user) {
			useAuthStore.getState().setUser(user);
		}
	}, []);

	const shouldRender = useMemo(() => mounted, [mounted]);
	if (!shouldRender) return null;

	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
