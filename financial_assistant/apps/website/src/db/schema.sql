-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    symbol VARCHAR(20) NOT NULL,
    quantity DECIMAL(18,8) NOT NULL,
    avg_price DECIMAL(18,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type VARCHAR(4) CHECK (type IN ('BUY', 'SELL')),
    symbol VARCHAR(20) NOT NULL,
    quantity DECIMAL(18,8) NOT NULL,
    price DECIMAL(18,2) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create watchlist table
CREATE TABLE IF NOT EXISTS watchlist (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    symbol VARCHAR(20) NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    account_number VARCHAR(50) UNIQUE NOT NULL,
    balance DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Insert test user if not exists
INSERT INTO users (username, password) 
VALUES ('PrajanS', '2101') 
ON CONFLICT (username) DO NOTHING;

-- Insert sample data
DO $$
DECLARE
    user_id INTEGER;
BEGIN
    SELECT id INTO user_id FROM users WHERE username = 'PrajanS';
    
    -- Sample portfolio data
    INSERT INTO portfolio (user_id, symbol, quantity, avg_price) VALUES 
    (user_id, 'AAPL', 10, 180.50),
    (user_id, 'GOOGL', 5, 140.25),
    (user_id, 'MSFT', 15, 350.75);

    -- Sample transactions
    INSERT INTO transactions (user_id, type, symbol, quantity, price) VALUES 
    (user_id, 'BUY', 'AAPL', 10, 180.50),
    (user_id, 'BUY', 'GOOGL', 5, 140.25),
    (user_id, 'SELL', 'MSFT', 5, 355.00);

    -- Sample watchlist
    INSERT INTO watchlist (user_id, symbol) VALUES 
    (user_id, 'TSLA'),
    (user_id, 'NVDA'),
    (user_id, 'AMD');
END $$;