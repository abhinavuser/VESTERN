export interface Portfolio {
  id: number;
  account_number: string;
  stock_symbol: string;
  shares: number;
  average_price: number;
  last_updated: string;
}

export interface Transaction {
  transaction_id: number;
  account_number: string;
  transaction_type: 'BUY' | 'SELL';
  stock_symbol: string;
  shares: number;
  price_per_share: number;
  total_amount: number;
  transaction_date: string;
  status: string;
}

export interface Watchlist {
  id: number;
  account_number: string;
  stock_symbol: string;
  added_date: string;
}

export interface User {
  id: number;
  account_number: string;
  email: string;
  password: string; // This will be hashed
  balance: number;
  created_at: string;
  last_login: string;
}

export interface AuthUser {
  id: number;
  account_number: string;
  email: string;
  balance: number;
}