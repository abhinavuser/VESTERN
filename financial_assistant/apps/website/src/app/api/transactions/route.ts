import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT t.transaction_id, t.account_number, t.transaction_type, 
              t.stock_symbol, t.shares, t.price_per_share, 
              t.total_amount, t.transaction_date, t.status
       FROM transactions t
       INNER JOIN users u ON t.account_number = u.account_number
       WHERE u.account_number = $1
       ORDER BY t.transaction_date DESC 
       LIMIT 50`,
      ['ACC123'] // Replace this with the actual account number from your auth system
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transaction data' },
      { status: 500 }
    );
  }
}