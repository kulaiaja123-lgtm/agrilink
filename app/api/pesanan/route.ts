// app/api/pesanan/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/database.js';

// GET - Ambil pesanan berdasarkan user
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const role = searchParams.get('role');
    
    console.log('GET pesanan - userId:', userId, 'role:', role);
    
    let query = `
      SELECT p.*, u.name as petani_nama, u2.name as penjual_nama
      FROM pesanan p
      JOIN users u ON p.petani_id = u.id
      JOIN users u2 ON p.penjual_id = u2.id
    `;
    
    if (role === 'PETANI') {
      query += ` WHERE p.petani_id = ${userId}`;
    } else if (role === 'PENJUAL') {
      query += ` WHERE p.penjual_id = ${userId}`;
    }
    
    query += ` ORDER BY p.created_at DESC`;
    
    const pesanan = db.prepare(query).all();
    console.log('Pesanan found:', pesanan.length);
    
    // Ambil detail setiap pesanan
    for (const order of pesanan) {
      const details = db.prepare(`
        SELECT pd.*, pu.nama, pu.icon
        FROM pesanan_detail pd
        JOIN pupuk pu ON pd.pupuk_id = pu.id
        WHERE pd.pesanan_id = ?
      `).all(order.id);
      order.details = details;
    }
    
    return NextResponse.json({ success: true, data: pesanan });
  } catch (error) {
    console.error('GET pesanan error:', error);
    return NextResponse.json({ success: false, error: error.message, data: [] }, { status: 500 });
  }
}

// POST - Buat pesanan baru
export async function POST(request: Request) {
  try {
    const { petaniId, penjualId, cartItems, catatan } = await request.json();
    
    console.log('POST pesanan - petaniId:', petaniId, 'items:', cartItems?.length);
    
    // Generate nomor pesanan
    const orderNumber = `INV/${new Date().getFullYear()}/${Date.now()}`;
    const totalHarga = cartItems.reduce((sum, item) => sum + (item.jumlah * item.harga), 0);
    
    // Insert pesanan
    const insertPesanan = db.prepare(`
      INSERT INTO pesanan (order_number, petani_id, penjual_id, total_harga, catatan)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = insertPesanan.run(orderNumber, petaniId, penjualId, totalHarga, catatan || '');
    const pesananId = result.lastInsertRowid;
    
    // Insert detail pesanan
    const insertDetail = db.prepare(`
      INSERT INTO pesanan_detail (pesanan_id, pupuk_id, jumlah, harga)
      VALUES (?, ?, ?, ?)
    `);
    
    for (const item of cartItems) {
      insertDetail.run(pesananId, item.pupuk_id, item.jumlah, item.harga);
    }
    
    // Hapus keranjang user
    db.prepare('DELETE FROM cart WHERE user_id = ?').run(petaniId);
    
    return NextResponse.json({ success: true, orderNumber, pesananId });
  } catch (error) {
    console.error('POST pesanan error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}