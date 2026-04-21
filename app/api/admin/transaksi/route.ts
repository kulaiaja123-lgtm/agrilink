import { NextResponse } from 'next/server';
import db from '@/lib/database.js';

export async function GET() {
  try {
    const transaksi = db.prepare(`
      SELECT p.*, u.name as petani_nama 
      FROM pesanan p
      JOIN users u ON p.petani_id = u.id
      ORDER BY p.created_at DESC
    `).all();
    return NextResponse.json({ success: true, data: transaksi });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}