// app/api/admin/stats/route.ts
import { NextResponse } from 'next/server';
import { pupukData, artikelData, userData } from '@/lib/data-static';

export async function GET() {
  try {
    const stats = {
      totalUsers: userData.length,
      totalPupuk: pupukData.length,
      totalArtikel: artikelData.length,
      totalTransaksi: 3
    };
    
    return NextResponse.json({ success: true, data: stats });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan';
    return NextResponse.json({ success: false, error: errorMessage });
  }
}