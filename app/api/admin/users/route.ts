import { NextResponse } from 'next/server';
import db from '@/lib/database.js';

export async function GET() {
  try {
    const users = db.prepare('SELECT id, name, email, role, created_at FROM users ORDER BY id').all();
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}