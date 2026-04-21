// app/api/pesanan/route.ts
import { NextResponse } from 'next/server';
import { userData } from '@/lib/data-static';

let pesananData: any[] = [];
let pesananDetailData: any[] = [];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const role = searchParams.get('role');
    
    let filtered = [...pesananData];
    
    if (role === 'PETANI') {
      filtered = filtered.filter(p => p.petani_id === parseInt(userId || '0'));
    } else if (role === 'PENJUAL') {
      filtered = filtered.filter(p => p.penjual_id === parseInt(userId || '0'));
    }
    
    // Tambahkan detail ke setiap pesanan
    const result = filtered.map(order => ({
      ...order,
      details: pesananDetailData.filter(d => d.pesanan_id === order.id)
    }));
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal mengambil pesanan', data: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { petaniId, penjualId, cartItems, catatan } = await request.json();
    
    const orderNumber = `INV/${new Date().getFullYear()}/${Date.now()}`;
    const totalHarga = cartItems.reduce((sum: number, item: any) => sum + (item.jumlah * item.harga), 0);
    
    const petani = userData.find(u => u.id === petaniId);
    const penjual = userData.find(u => u.id === penjualId);
    
    const newOrder = {
      id: Date.now(),
      order_number: orderNumber,
      petani_id: petaniId,
      penjual_id: penjualId,
      petani_nama: petani?.name || 'Petani',
      penjual_nama: penjual?.name || 'Penjual',
      total_harga: totalHarga,
      status: 'menunggu',
      catatan: catatan || '',
      created_at: new Date().toISOString()
    };
    
    pesananData.push(newOrder);
    
    for (const item of cartItems) {
      pesananDetailData.push({
        id: Date.now() + Math.random(),
        pesanan_id: newOrder.id,
        pupuk_id: item.pupuk_id,
        nama: item.nama,
        icon: item.icon,
        jumlah: item.jumlah,
        harga: item.harga
      });
    }
    
    return NextResponse.json({ success: true, orderNumber, pesananId: newOrder.id });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal membuat pesanan' }, { status: 500 });
  }
}