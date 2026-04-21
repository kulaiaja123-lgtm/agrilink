// app/api/pesanan/[id]/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/database.js';

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { status } = await request.json();
    
    db.prepare(`
      UPDATE pesanan SET status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(status, id);
    
    return NextResponse.json({ success: true, message: 'Status pesanan diperbarui' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}