// app/api/chat/route.ts
import { NextResponse } from 'next/server';

const knowledgeBase: Record<string, string> = {
  'urea': 'Urea adalah pupuk nitrogen (46% N) yang merangsang pertumbuhan daun dan batang.',
  'npk': 'NPK adalah pupuk majemuk dengan nitrogen, fosfor, kalium untuk pertumbuhan seimbang.',
  'walang sangit': 'Walang sangit hama padi. Pengendalian: semprot insektisida saat sore hari.',
  'blas': 'Penyakit blas pada padi. Pengendalian: fungisida berbahan aktif tricyclazole.',
};

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    const lowerMessage = message.toLowerCase();
    let answer = '';
    
    for (const [keyword, response] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(keyword)) {
        answer = response;
        break;
      }
    }
    
    if (!answer) {
      answer = 'Maaf, saya belum memiliki informasi tentang itu. Coba tanyakan tentang pupuk (Urea, NPK) atau hama (Walang sangit, Blas).';
    }
    
    return NextResponse.json({ success: true, reply: answer });
  } catch (error) {
    return NextResponse.json({ error: 'Terjadi kesalahan' }, { status: 500 });
  }
}