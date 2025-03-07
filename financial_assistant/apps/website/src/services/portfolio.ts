import pool from '@/utils/db';
import { Portfolio } from '@/types';

export async function getUserPortfolio(userId: number): Promise<Portfolio[]> {
  const result = await pool.query(
    'SELECT * FROM portfolio WHERE user_id = $1',
    [userId]
  );
  return result.rows;
}