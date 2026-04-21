// app/api/admin/pupuk/route.ts
import { NextResponse } from 'next/server';
import { pupukData } from '@/lib/data-static';

let pupukList = [...pupukData];

export async function POST(request: Request) {
  try {
    const { nama, icon, warna, kandungan, harga } = await request.json();
    
    const newId = pupukList.length + 1;
    const newPupuk = { id: newId, nama, icon, warna, kandungan, harga: parseInt(harga) };
    pupukList.push(newPupuk);
    
    return NextResponse.json({ success: true, data: newPupuk });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan';
    return NextResponse.json({ success: false, error: errorMessage });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    pupukList = pupukList.filter(p => p.id !== parseInt(id!));
    
    return NextResponse.json({ success: true });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan';
    return NextResponse.json({ success: false, error: errorMessage });
  }
}