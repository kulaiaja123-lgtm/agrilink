// app/api/chat/route.ts
import { NextResponse } from 'next/server';

// Database pengetahuan pertanian
const knowledgeBase: Record<string, string> = {
  'urea': 'Urea adalah pupuk nitrogen (46% N) yang merangsang pertumbuhan daun dan batang. Dosis: 250-300 kg/ha. Waktu terbaik: 14-21 hari setelah tanam.',
  'npk': 'NPK (15-15-15) adalah pupuk majemuk dengan nitrogen, fosfor, kalium. Baik untuk pertumbuhan seimbang. Dosis: 300-400 kg/ha.',
  'za': 'ZA (Zwavelzure Ammoniak) mengandung Nitrogen 21% dan Sulfur 24%. Cocok untuk tanah masam. Dosis: 150-250 kg/ha.',
  'kcl': 'KCL (Kalium Klorida) mengandung Kalium 60%. Memperkuat batang dan meningkatkan kualitas buah. Dosis: 100-200 kg/ha.',
  'walang sangit': 'Walang sangit hama padi yang menyerang bulir padi. Pengendalian: semprot insektisida berbahan aktif sipermetrin atau tanam varietas tahan.',
  'blas': 'Penyakit blas pada padi disebabkan jamur. Gejala: bercak berbentuk belah ketupat. Pengendalian: fungisida berbahan aktif tricyclazole.',
  'antraknosa': 'Penyakit antraknosa/patek pada cabai. Gejala: bercak hitam pada buah. Pengendalian: fungisida mankozeb, rotasi tanaman.',
  'pupuk dasar': 'Pupuk dasar diberikan sebelum tanam. Gunakan pupuk kandang atau kompos 2 minggu sebelum tanam.',
  'irigasi': 'Irigasi yang baik: pagi atau sore hari. Hindari siang hari karena penguapan tinggi.',
  'panen': 'Waktu panen tergantung varietas. Ciri-ciri: 80-90% gabah menguning, batang agak kering.',
};

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'Pesan tidak boleh kosong' },
        { status: 400 }
      );
    }

    const lowerMessage = message.toLowerCase();
    let answer = '';
    
    for (const [keyword, response] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(keyword)) {
        answer = response;
        break;
      }
    }
    
    if (!answer) {
      answer = `Maaf, saya belum memiliki informasi tentang "${message}".\n\n💡 Saran:\n• Tanyakan tentang pupuk (Urea, NPK, ZA, KCL)\n• Tanyakan hama/penyakit (Walang sangit, Blas, Antraknosa)\n• Tanyakan tips (Pupuk dasar, Irigasi, Panen)`;
    }
    
    return NextResponse.json({
      success: true,
      reply: answer,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}