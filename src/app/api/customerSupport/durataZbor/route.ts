import { NextRequest, NextResponse } from 'next/server';
import { getDurataZbor } from '@/lib/utils/customerSupport/customerSupport.utils';

export async function GET(req: NextRequest): Promise<NextResponse> {
	try {
		const data = await getDurataZbor();
		return NextResponse.json(data, { status: 201 });
	} catch (error: unknown) {
		console.error('DurataZbor failed:', error);
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
		return NextResponse.json({ error: errorMessage }, { status: 400 });
	}
}
