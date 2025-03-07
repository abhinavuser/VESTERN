import { Pool } from 'pg';

const pool = new Pool({
  user: 'abhinavuser',
  host: 'localhost',
  database: 'finance_db',
  password: '2101',
  port: 5432
});

export default pool;