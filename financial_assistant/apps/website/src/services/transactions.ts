import pool from '@/utils/db';
import { Transaction } from '@/types';

export async function getUserTransactions(userId: number): Promise<Transaction[]> {
  const result = await pool.query(
    'SELECT * FROM transactions WHERE user_id = $1 ORDER BY timestamp DESC',
    [userId]
  );
  return result.rows;
}