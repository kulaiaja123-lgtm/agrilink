// app/api/cart/route.ts
import { NextResponse } from 'next/server';

// Data keranjang sementara (in-memory untuk demo)
let cartData: any[] = [];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID diperlukan', data: [] }, { status: 400 });
    }
    
    const userCart = cartData.filter(item => item.user_id === parseInt(userId));
    
    const total = userCart.reduce((sum: number, item: any) => sum + (item.jumlah * item.harga), 0);
    
    return NextResponse.json({ success: true, data: userCart, total: total });
  } catch (error) {
    console.error('GET cart error:', error);
    return NextResponse.json({ success: false, error: 'Gagal mengambil keranjang', data: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, pupukId, jumlah, nama, harga, icon } = await request.json();
    
    if (!userId || !pupukId || !jumlah) {
      return NextResponse.json({ success: false, error: 'Data tidak lengkap' }, { status: 400 });
    }
    
    // Cek apakah sudah ada di keranjang
    const existingIndex = cartData.findIndex(item => item.user_id === userId && item.pupuk_id === pupukId);
    
    if (existingIndex !== -1) {
      cartData[existingIndex].jumlah += jumlah;
    } else {
      cartData.push({
        id: Date.now(),
        user_id: userId,
        pupuk_id: pupukId,
        nama: nama || 'Pupuk',
        icon: icon || '🌿',
        harga: harga || 0,
        jumlah: jumlah
      });
    }
    
    return NextResponse.json({ success: true, message: 'Berhasil ditambahkan ke keranjang' });
  } catch (error) {
    console.error('POST cart error:', error);
    return NextResponse.json({ success: false, error: 'Gagal menambah ke keranjang' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get('id');
    
    if (!cartId) {
      return NextResponse.json({ success: false, error: 'ID diperlukan' }, { status: 400 });
    }
    
    cartData = cartData.filter(item => item.id !== parseInt(cartId));
    
    return NextResponse.json({ success: true, message: 'Berhasil dihapus dari keranjang' });
  } catch (error) {
    console.error('DELETE cart error:', error);
    return NextResponse.json({ success: false, error: 'Gagal menghapus dari keranjang' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { cartId, jumlah } = await request.json();
    
    if (!cartId || jumlah === undefined) {
      return NextResponse.json({ success: false, error: 'Data tidak lengkap' }, { status: 400 });
    }
    
    const index = cartData.findIndex(item => item.id === cartId);
    
    if (index !== -1) {
      if (jumlah <= 0) {
        cartData.splice(index, 1);
      } else {
        cartData[index].jumlah = jumlah;
      }
    }
    
    return NextResponse.json({ success: true, message: 'Jumlah diperbarui' });
  } catch (error) {
    console.error('PUT cart error:', error);
    return NextResponse.json({ success: false, error: 'Gagal update jumlah' }, { status: 500 });
  }
}