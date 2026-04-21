// app/api/admin/users/route.ts
import { NextResponse } from 'next/server';
import { userData } from '@/lib/data-static';

export async function GET() {
  try {
    const users = userData.map(({ password, ...rest }) => rest);
    return NextResponse.json({ success: true, data: users });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan';
    return NextResponse.json({ success: false, error: errorMessage });
  }
}