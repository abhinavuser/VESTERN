import pool from '@/utils/db';
import { User } from '@/types';

export async function authenticateUser(username: string, password: string): Promise<User | null> {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}