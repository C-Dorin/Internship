import { NextRequest, NextResponse } from 'next/server';
import { getOrarDecolareAvion } from '@/lib/utils/client/client.utils';

export async function GET(req: NextRequest): Promise<NextResponse> {
	try {
		const searchParams = req.nextUrl.searchParams;
		const oras = searchParams.get('oras');
		const oraMin = searchParams.get('oraMin');
		const oraMax = searchParams.get('oraMax');

		if (!oras || !oraMin || !oraMax) {
			return NextResponse.json({ message: 'Parametrii lipsesc' }, { status: 400 });
		}

		const data = await getOrarDecolareAvion(oras, oraMin, oraMax);
		return NextResponse.json(data, { status: 201 });
	} catch (error: unknown) {
		console.error('OrarDecolareAvion failed:', error);
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
		return NextResponse.json({ error: errorMessage }, { status: 400 });
	}
}
