import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClientMiddleware } from '@/lib/supabase/client';

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createSupabaseClientMiddleware(req, res);

	const { data, error } = await supabase.auth.getSession();
	const session = data?.session;

	if (error) {
		console.error('Error fetching session:', error.message);
		return NextResponse.json({ message: 'Failed to authenticate' }, { status: 500 });
	}

	// Giving the user access to certain pages
	const { pathname } = req.nextUrl;

	if (!session) {
		if (pathname.startsWith('/product') || pathname.startsWith('/auth')) {
			return res;
		}

		if (
			pathname === '/' ||
			pathname === '/workspace/admin' ||
			pathname === '/workspace/client' ||
			pathname === '/workspace/customerSupport'
		) {
			return NextResponse.redirect(new URL('/product', req.url));
		}
	}

	if (session) {
		if (
			pathname.startsWith('/workspace/admin') ||
			pathname.startsWith('/workspace/client') ||
			pathname.startsWith('/workspace/customerSupport')
		) {
			return res;
		}

		if (pathname === '/' || pathname === '/product' || pathname === '/workspace') {
			return NextResponse.redirect(new URL('/workspace/client', req.url));
		}
	}

	return res;
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
};
