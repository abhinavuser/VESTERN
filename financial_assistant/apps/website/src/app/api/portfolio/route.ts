import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT p.id, p.account_number, p.stock_symbol, p.shares, p.average_price, p.last_updated 
       FROM portfolio p
       INNER JOIN users u ON p.account_number = u.account_number
       WHERE u.account_number = $1`,
      ['ACC123'] // Replace this with the actual account number from your auth system
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}