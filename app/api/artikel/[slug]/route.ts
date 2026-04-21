// app/api/artikel/[slug]/route.ts
import { NextResponse } from 'next/server';
import { artikelData } from '@/lib/data-static';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const artikel = artikelData.find(a => a.slug === slug);
  
  if (!artikel) {
    return NextResponse.json(
      { success: false, error: 'Artikel tidak ditemukan' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({ success: true, data: artikel });
}