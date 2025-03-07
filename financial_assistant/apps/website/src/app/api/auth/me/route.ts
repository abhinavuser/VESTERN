import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import pool from '@/lib/db';

export async function GET() {
  try {
    const sessionToken = cookies().get('session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Decode session token
    const [userId] = Buffer.from(sessionToken, 'base64')
      .toString()
      .split(':');

    // Get user data
    const result = await pool.query(
      'SELECT id, email, account_number, balance FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}