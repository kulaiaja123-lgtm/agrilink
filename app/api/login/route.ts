// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'API Login is working!',
    status: 'ok'
  });
}

export async function POST(request: Request) {
  console.log('=== API LOGIN DIPANGGIL ===');
  
  try {
    const { email, password } = await request.json();
    console.log('Email:', email);
    console.log('Password:', password);
    
    // Mapping email ke role
    let role = 'PETANI';
    let name = email.split('@')[0];
    
    // Cek berdasarkan email untuk menentukan role
    if (email.toLowerCase().includes('distributor')) {
      role = 'DISTRIBUTOR';
      name = 'Distributor ' + name;
    } else if (email.toLowerCase().includes('penjual')) {
      role = 'PENJUAL';
      name = 'Penjual ' + name;
    } else if (email.toLowerCase().includes('petani')) {
      role = 'PETANI';
      name = 'Petani ' + name;
    }
    
    // Validasi password sederhana (minimal 1 karakter)
    if (password && password.length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Login berhasil!',
        user: {
          email: email,
          name: name,
          role: role
        }
      });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Email atau password salah'
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Terjadi kesalahan: ' + error.message
    });
  }
}