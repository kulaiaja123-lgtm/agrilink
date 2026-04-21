// app/api/pupuk/route.ts
import { NextResponse } from 'next/server';
import { pupukData } from '@/lib/data-static';

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    data: pupukData,
    total: pupukData.length 
  });
}