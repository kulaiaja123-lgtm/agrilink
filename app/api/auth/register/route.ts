// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Untuk demo, register tidak menyimpan data
  return NextResponse.json({
    success: true,
    message: 'Registrasi berhasil! (Demo mode)'
  });
}