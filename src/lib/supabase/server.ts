import { cookies } from 'next/headers';
import { createMiddlewareClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';
import type { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
	throw new Error(
		`Missing Supabase server env vars:
		- NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ?? 'undefined'}
		- NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? 'set' : 'undefined'}
		- SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceRoleKey ? 'set' : 'undefined'}`
	);
}

// Create a Supabase client for server-side use.
export const createSupabaseClientServiceRole = (): SupabaseClient<Database> => {
	return createClient<Database>(supabaseUrl, supabaseServiceRoleKey);
};

// Create a Supabase client for middleware use.
export const createSupabaseClientMiddleware = (
	req: NextRequest,
	res: NextResponse
): SupabaseClient<Database> => {
	return createMiddlewareClient<Database>({
		req,
		res
	});
};

// Create a Supabase client for API route or server-side use.
export const createSupabaseClientApi = async (): Promise<SupabaseClient<Database>> => {
	const cookieStore = cookies();
	return createRouteHandlerClient<Database>({
		cookies: () => cookieStore
	});
};
