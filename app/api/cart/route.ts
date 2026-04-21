// app/api/cart/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/database.js';

// GET - Ambil keranjang user
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    console.log('GET cart - userId:', userId);
    
    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID diperlukan', data: [] }, { status: 400 });
    }
    
    const cart = db.prepare(`
      SELECT c.id, c.jumlah, p.id as pupuk_id, p.nama, p.icon, p.harga, p.warna
      FROM cart c
      JOIN pupuk p ON c.pupuk_id = p.id
      WHERE c.user_id = ?
    `).all(userId);
    
    console.log('Cart items found:', cart.length);
    
    const total = cart.reduce((sum, item) => sum + (item.jumlah * item.harga), 0);
    
    return NextResponse.json({ success: true, data: cart, total: total });
  } catch (error) {
    console.error('GET cart error:', error);
    return NextResponse.json({ success: false, error: error.message, data: [] }, { status: 500 });
  }
}
// POST - Tambah ke keranjang
export async function POST(request: Request) {
  try {
    const { userId, pupukId, jumlah } = await request.json();
    
    if (!userId || !pupukId || !jumlah) {
      return NextResponse.json({ success: false, error: 'Data tidak lengkap' }, { status: 400 });
    }
    
    // Cek apakah sudah ada di keranjang
    const existing = db.prepare('SELECT id, jumlah FROM cart WHERE user_id = ? AND pupuk_id = ?').get(userId, pupukId);
    
    if (existing) {
      db.prepare('UPDATE cart SET jumlah = jumlah + ? WHERE id = ?').run(jumlah, existing.id);
    } else {
      db.prepare('INSERT INTO cart (user_id, pupuk_id, jumlah) VALUES (?, ?, ?)').run(userId, pupukId, jumlah);
    }
    
    return NextResponse.json({ success: true, message: 'Berhasil ditambahkan ke keranjang' });
  } catch (error) {
    console.error('POST cart error:', error);
    return NextResponse.json({ success: false, error: 'Gagal menambah ke keranjang' }, { status: 500 });
  }
}

// DELETE - Hapus dari keranjang
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get('id');
    
    if (!cartId) {
      return NextResponse.json({ success: false, error: 'ID diperlukan' }, { status: 400 });
    }
    
    db.prepare('DELETE FROM cart WHERE id = ?').run(cartId);
    
    return NextResponse.json({ success: true, message: 'Berhasil dihapus dari keranjang' });
  } catch (error) {
    console.error('DELETE cart error:', error);
    return NextResponse.json({ success: false, error: 'Gagal menghapus dari keranjang' }, { status: 500 });
  }
}

// PUT - Update jumlah
export async function PUT(request: Request) {
  try {
    const { cartId, jumlah } = await request.json();
    
    if (!cartId || jumlah === undefined) {
      return NextResponse.json({ success: false, error: 'Data tidak lengkap' }, { status: 400 });
    }
    
    if (jumlah <= 0) {
      db.prepare('DELETE FROM cart WHERE id = ?').run(cartId);
    } else {
      db.prepare('UPDATE cart SET jumlah = ? WHERE id = ?').run(jumlah, cartId);
    }
    
    return NextResponse.json({ success: true, message: 'Jumlah diperbarui' });
  } catch (error) {
    console.error('PUT cart error:', error);
    return NextResponse.json({ success: false, error: 'Gagal update jumlah' }, { status: 500 });
  }
}