-- Create database
CREATE DATABASE finance_db;

-- Connect to database
\c finance_db;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL,
    balance DECIMAL(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Create transactions table
CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    account_number VARCHAR(20) REFERENCES users(account_number),
    transaction_type VARCHAR(20) NOT NULL,  -- 'BUY', 'SELL', 'DEPOSIT', 'WITHDRAW'
    stock_symbol VARCHAR(10),
    shares INTEGER,
    price_per_share DECIMAL(10, 2),
    total_amount DECIMAL(15, 2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'COMPLETED'
);

-- Create portfolio table
CREATE TABLE portfolio (
    id SERIAL PRIMARY KEY,
    account_number VARCHAR(20) REFERENCES users(account_number),
    stock_symbol VARCHAR(10) NOT NULL,
    shares INTEGER NOT NULL,
    average_price DECIMAL(10, 2) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(account_number, stock_symbol)
);

-- Create watchlist table
CREATE TABLE watchlist (
    id SERIAL PRIMARY KEY,
    account_number VARCHAR(20) REFERENCES users(account_number),
    stock_symbol VARCHAR(10) NOT NULL,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(account_number, stock_symbol)
);

-- Create chat_history table
CREATE TABLE chat_history (
    id SERIAL PRIMARY KEY,
    account_number VARCHAR(20) REFERENCES users(account_number),
    message_type VARCHAR(10) NOT NULL,  -- 'USER' or 'ASSISTANT'
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);