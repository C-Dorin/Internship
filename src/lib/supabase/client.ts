import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database.types';

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error(
		`Missing Supabase environment variables:
		- NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ?? 'undefined'}
		- NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? 'set' : 'undefined'}

		Make sure they are correctly set in your environment variables.`
	);
}

// Create a Supabase client for client-side use.
export const createSupabaseClientAnonymous: SupabaseClient<Database> = createClient<Database>(
	supabaseUrl,
	supabaseAnonKey
);

// Create a Supabase client for browser client-side use.
export const createSupabaseClientBrowser: SupabaseClient<Database> = createBrowserClient<Database>(
	supabaseUrl,
	supabaseAnonKey
);
