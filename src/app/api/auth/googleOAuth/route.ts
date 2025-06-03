import { NextRequest, NextResponse } from 'next/server';
import { signInUserWithOAuth } from '@/lib/utils/auth/auth.utils';
import { persistUserFromSession } from '@/lib/utils/auth/userPersist.utils';
import { createSupabaseClientApi } from '@/lib/supabase/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
	try {
		const url = new URL(req.url);
		const redirectUrl = await signInUserWithOAuth(url);

		// Get the current session
		const supabase = await createSupabaseClientApi();
		const {
			data: { session }
		} = await supabase.auth.getSession();

		if (session) {
			persistUserFromSession(session);
		}

		return NextResponse.redirect(redirectUrl, { status: 302 });
	} catch (error: unknown) {
		console.error('Sign-in-with-oauth error:', error);
		const errorMessage = error instanceof Error ? error.message : 'Internal server error';
		return NextResponse.json({ message: errorMessage }, { status: 500 });
	}
}
