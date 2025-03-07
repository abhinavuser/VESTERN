import pool from '@/utils/db';
import { Watchlist } from '@/types';

export async function getUserWatchlist(userId: number): Promise<Watchlist[]> {
  const result = await pool.query(
    'SELECT * FROM watchlist WHERE user_id = $1',
    [userId]
  );
  return result.rows;
}