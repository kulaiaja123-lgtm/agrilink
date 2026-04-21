// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  return NextResponse.json({
    success: true,
    message: 'Registrasi berhasil! (Demo mode)'
  });
}