// app/api/pesanan/[id]/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/database.js';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const { id } = params;
    
    db.prepare(`
      UPDATE pesanan SET status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(status, id);
    
    return NextResponse.json({ success: true, message: 'Status pesanan diperbarui' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal update status' }, { status: 500 });
  }
}