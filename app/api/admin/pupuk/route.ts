import { NextResponse } from 'next/server';
import db from '@/lib/database.js';

export async function POST(request: Request) {
  try {
    const { nama, icon, warna, kandungan, harga } = await request.json();
    const insert = db.prepare(`
      INSERT INTO pupuk (nama, icon, warna, kandungan, harga)
      VALUES (?, ?, ?, ?, ?)
    `);
    insert.run(nama, icon, warna, kandungan, harga);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    db.prepare('DELETE FROM pupuk WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}