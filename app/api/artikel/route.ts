// app/api/artikel/route.ts
import { NextResponse } from 'next/server';
import { artikelData } from '@/lib/data-static';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  
  let filtered = [...artikelData];
  
  if (category && category !== 'semua') {
    filtered = filtered.filter(a => a.category === category);
  }
  
  return NextResponse.json({ 
    success: true, 
    data: filtered,
    total: filtered.length 
  });
}