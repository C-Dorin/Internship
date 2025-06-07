import { NextRequest, NextResponse } from 'next/server';
import { getAvioaneAeroport } from '@/lib/utils/client/client.utils';

export async function GET(req: NextRequest): Promise<NextResponse> {
	try {
		const data = await getAvioaneAeroport();
		return NextResponse.json(data, { status: 201 });
	} catch (error: unknown) {
		console.error('AvioaneAeroport failed:', error);
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
		return NextResponse.json({ error: errorMessage }, { status: 400 });
	}
}
