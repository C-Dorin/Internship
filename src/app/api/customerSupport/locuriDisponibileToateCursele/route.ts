import { NextRequest, NextResponse } from 'next/server';
import { getLocuriDisponibileToateCursele } from '@/lib/utils/customerSupport/customerSupport.utils';

export async function GET(req: NextRequest): Promise<NextResponse> {
	try {
		const data = await getLocuriDisponibileToateCursele();
		return NextResponse.json(data, { status: 201 });
	} catch (error: unknown) {
		console.error('LocuriDisponibileToateCursele failed:', error);
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
		return NextResponse.json({ error: errorMessage }, { status: 400 });
	}
}
