import { NextResponse } from 'next/server';
import db from '@/lib/database.js';

export async function GET() {
  try {
    const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get();
    const totalPupuk = db.prepare('SELECT COUNT(*) as count FROM pupuk').get();
    const totalArtikel = db.prepare('SELECT COUNT(*) as count FROM artikel').get();
    const totalTransaksi = db.prepare('SELECT COUNT(*) as count FROM pesanan').get();

    return NextResponse.json({
      success: true,
      data: {
        totalUsers: totalUsers.count,
        totalPupuk: totalPupuk.count,
        totalArtikel: totalArtikel.count,
        totalTransaksi: totalTransaksi.count
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}