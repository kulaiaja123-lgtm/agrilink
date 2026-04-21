// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { userData } from '@/lib/data-static';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    const user = userData.find(u => u.email === email);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Email atau password salah' },
        { status: 401 }
      );
    }
    
    if (user.password !== password) {
      return NextResponse.json(
        { success: false, error: 'Email atau password salah' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}