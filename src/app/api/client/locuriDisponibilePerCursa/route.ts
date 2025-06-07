import { NextRequest, NextResponse } from 'next/server';
import { getLocuriDisponibilePerCursa } from '@/lib/utils/client/client.utils';

export async function GET(req: NextRequest): Promise<NextResponse> {
	try {
		const searchParams = req.nextUrl.searchParams;
		const cod = searchParams.get('cod');

		if (!cod) {
			return NextResponse.json({ message: 'Parametrii lipsesc' }, { status: 400 });
		}

		const data = await getLocuriDisponibilePerCursa(cod);
		return NextResponse.json(data, { status: 201 });
	} catch (error: unknown) {
		console.error('LocuriDisponibilePerCursa failed:', error);
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
		return NextResponse.json({ error: errorMessage }, { status: 400 });
	}
}
