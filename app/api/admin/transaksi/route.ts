// app/api/admin/transaksi/route.ts
import { NextResponse } from 'next/server';

const transaksiData = [
  { id: 1, order_number: 'INV/2024/001', petani_nama: 'Petani Demo', total_harga: 150000, status: 'selesai', created_at: new Date().toISOString() },
  { id: 2, order_number: 'INV/2024/002', petani_nama: 'Petani Demo', total_harga: 180000, status: 'diproses', created_at: new Date().toISOString() },
];

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: transaksiData });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Gagal mengambil data transaksi' });
  }
}