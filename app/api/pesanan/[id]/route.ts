// app/api/pesanan/[id]/route.ts
import { NextResponse } from 'next/server';

let pesananData: any[] = [];

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { status } = await request.json();
    
    const index = pesananData.findIndex(p => p.id === parseInt(id));
    
    if (index !== -1) {
      pesananData[index].status = status;
      pesananData[index].updated_at = new Date().toISOString();
    }
    
    return NextResponse.json({ success: true, message: 'Status pesanan diperbarui' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal update status' }, { status: 500 });
  }
}