import { NextRequest, NextResponse } from 'next/server';
import { getDecolari } from '@/lib/utils/product/product.utils';

export async function GET(req: NextRequest): Promise<NextResponse> {
	try {
		const data = await getDecolari();
		return NextResponse.json(data, { status: 201 });
	} catch (error: unknown) {
		console.error('Decolari failed:', error);
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
		return NextResponse.json({ error: errorMessage }, { status: 400 });
	}
}
