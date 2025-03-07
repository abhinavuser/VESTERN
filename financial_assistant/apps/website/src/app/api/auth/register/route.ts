import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

function generateAccountNumber() {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ACC${timestamp.slice(-6)}${random}`;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Generate account number and hash password
    const account_number = generateAccountNumber();
    const hashedPassword = await bcrypt.hash(password, 10);
    const created_at = new Date().toISOString();

    // Insert new user
    const result = await pool.query(
      `INSERT INTO users (
        email,
        password,
        account_number,
        balance,
        created_at,
        last_login
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, account_number, balance`,
      [email, hashedPassword, account_number, 0, created_at, created_at]
    );

    const newUser = result.rows[0];

    // Set session cookie
    const sessionToken = Buffer.from(`${newUser.id}:${Date.now()}`).toString('base64');
    cookies().set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json({
      id: newUser.id,
      email: newUser.email,
      account_number: newUser.account_number,
      balance: newUser.balance
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}