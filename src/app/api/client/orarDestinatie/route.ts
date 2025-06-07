import { NextRequest, NextResponse } from 'next/server';
import { getOrarDestinatie } from '@/lib/utils/client/client.utils';

export async function GET(req: NextRequest): Promise<NextResponse> {
	try {
		const searchParams = req.nextUrl.searchParams;
		const oras = searchParams.get('oras');

		if (!oras) {
			return NextResponse.json({ message: 'Parametrii lipsesc' }, { status: 400 });
		}

		const data = await getOrarDestinatie(oras);
		return NextResponse.json(data, { status: 201 });
	} catch (error: unknown) {
		console.error('OrarDestinatie failed:', error);
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
		return NextResponse.json({ error: errorMessage }, { status: 400 });
	}
}
