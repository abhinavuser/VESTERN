from typing import Dict, Any, List, Optional
from datetime import datetime, UTC
import json
import re
from langchain_community.llms import Ollama
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from src.database.database_manager import DatabaseManager
import yfinance as yf
import pandas as pd

class FinanceAgent:
    def __init__(self):
        self.db = DatabaseManager()
        self.setup_llm()
        self.setup_prompts()
        self._pending_operation = None
        self._chat_history = []
        self._current_user = None

    def setup_llm(self):
        """Setup the LLM with appropriate parameters."""
        self.llm = Ollama(
            model="llama3.1:8b-instruct-q4_0",
            temperature=0.7,
            base_url="http://localhost:11434"
        )

    def setup_prompts(self):
        """Setup conversation prompts with enhanced context."""
        self.prompt = PromptTemplate(
            input_variables=["query", "current_time", "user_data", "market_data", "chat_history"],
            template="""You are an advanced AI financial assistant named FinanceGPT. You help users manage their investments, 
            execute trades, and provide financial advice. You have access to real-time market data and user portfolios.

            Current Time: {current_time}
            User Information: {user_data}
            Market Data: {market_data}
            Recent Conversation: {chat_history}

            User Query: {query}

            Your capabilities include:
            1. Natural Conversation:
               - Discuss market trends, investment strategies
               - Explain financial concepts
               - Provide personalized advice based on portfolio

            2. Account Management:
               - Create/manage user accounts
               - Show account balance and portfolio
               - Display transaction history
               - Add/remove stocks from watchlist

            3. Trading Operations:
               - Execute stock trades (buy/sell)
               - Monitor positions
               - Set price alerts
               - Analyze potential trades

            4. Market Analysis:
               - Provide real-time quotes
               - Show technical indicators
               - Discuss market news
               - Compare stocks

            When handling trades or sensitive operations:
            - ALWAYS ask for final confirmation
            - Verify account balance for purchases
            - Check existing holdings for sales
            - Show relevant market data before trades

            When responding, format trades and operations as JSON with this structure:
            {{
                "type": "conversation|account|trade|analysis",
                "operation": "CREATE|READ|UPDATE|DELETE|BUY|SELL|ANALYZE",
                "data": {{
                    "symbol": "STOCK_SYMBOL",
                    "shares": NUMBER_OF_SHARES,
                    "price": CURRENT_PRICE
                }},
                "natural_response": "Your friendly response",
                "requires_confirmation": true,
                "show_data": true
            }}

            For casual conversation, respond naturally without JSON.
            Always maintain a professional yet friendly tone.
            """
        )

        self.chain = (
            self.prompt 
            | self.llm 
            | StrOutputParser()
        )

    def get_market_data(self, symbols: List[str] = None) -> Dict:
        """Fetch current market data for relevant symbols."""
        try:
            market_data = {
                "market_status": "OPEN",  # Simplified for testing
                "quotes": {},
                "indices": {
                    "^GSPC": {"name": "S&P 500"},
                    "^DJI": {"name": "Dow Jones"},
                    "^IXIC": {"name": "NASDAQ"}
                }
            }
            
            # Add market indices with cached data
            for symbol in market_data["indices"].keys():
                try:
                    quote = self._get_cached_quote(symbol)
                    market_data["indices"][symbol].update(quote)
                except Exception as e:
                    print(f"Error fetching index {symbol}: {e}")
            
            # Only fetch required symbols
            if symbols:
                for symbol in symbols:
                    try:
                        quote = self._get_cached_quote(symbol)
                        market_data["quotes"][symbol] = quote
                    except Exception as e:
                        print(f"Error fetching {symbol}: {e}")
            
            return market_data
        except Exception as e:
            print(f"Error getting market data: {e}")
            return {"market_status": "ERROR", "quotes": {}, "indices": {}}
        
    def _get_cached_quote(self, symbol: str) -> Dict:
        """Get quote from cache or fetch new data."""
        current_time = time.time()
        
        # Check cache first
        if symbol in self._quote_cache:
            quote, cache_time = self._quote_cache[symbol]
            if current_time - cache_time < self._cache_timeout:
                return quote

        # Add delay between requests
        time.sleep(0.5)
        
        # Fetch new quote
        quote = self.db.get_real_time_quote(symbol)
        self._quote_cache[symbol] = (quote, current_time)
        return quote


    def analyze_sentiment(self, text: str) -> Dict:
        """Analyze if text indicates buying, selling, or general inquiry."""
        text = text.lower()
        
        # Common patterns for trading intentions
        buy_patterns = ['buy', 'purchase', 'invest in', 'get some', 'acquire']
        sell_patterns = ['sell', 'dump', 'get rid of', 'dispose', 'exit']
        
        # Common patterns for casual conversation
        greeting_patterns = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening']
        question_patterns = ['how', 'what', 'why', 'when', 'where', 'can you', 'could you']
        
        # Check for casual conversation first
        if any(pattern in text for pattern in greeting_patterns):
            return {"action": "CHAT", "type": "greeting"}
        
        if any(pattern in text for pattern in question_patterns):
            return {"action": "CHAT", "type": "question"}
        
        # Check for trading patterns
        for pattern in buy_patterns:
            if pattern in text:
                symbols = re.findall(r'[A-Z]{1,5}', text.upper())
                if symbols:
                    return {"action": "BUY", "symbol": symbols[0]}
        
        for pattern in sell_patterns:
            if pattern in text:
                symbols = re.findall(r'[A-Z]{1,5}', text.upper())
                if symbols:
                    return {"action": "SELL", "symbol": symbols[0]}
        
        return {"action": "ANALYZE"}

    def _format_portfolio_summary(self, portfolio: List[Dict]) -> str:
        """Format portfolio data for display."""
        if not portfolio:
            return "Your portfolio is empty."
        
        try:
            # Convert Decimal to float for calculations
            total_value = sum(float(pos['shares']) * float(pos['current_price']) for pos in portfolio)
            total_cost = sum(float(pos['shares']) * float(pos['average_price']) for pos in portfolio)
            total_pl = total_value - total_cost
            
            summary = [
                "📊 Portfolio Summary:",
                f"Total Value: ${total_value:,.2f}",
                f"Total P/L: ${total_pl:,.2f} ({(total_pl/total_cost)*100:.2f}% overall)\n",
                "Current Positions:"
            ]
            
            # Group positions by symbol to avoid duplicates
            positions = {}
            for pos in portfolio:
                symbol = pos['stock_symbol']
                if symbol not in positions:
                    positions[symbol] = {
                        'shares': float(pos['shares']),
                        'average_price': float(pos['average_price']),
                        'current_price': float(pos.get('current_price', pos['average_price']))
                    }
                else:
                    positions[symbol]['shares'] += float(pos['shares'])
            
            for symbol, pos in positions.items():
                current_value = pos['shares'] * pos['current_price']
                cost_basis = pos['shares'] * pos['average_price']
                position_pl = current_value - cost_basis
                pl_percent = (position_pl / cost_basis * 100) if cost_basis != 0 else 0
                
                summary.append(
                    f"- {symbol}: {int(pos['shares'])} shares @ ${pos['average_price']:.2f} "
                    f"(Current: ${pos['current_price']:.2f}, P/L: ${position_pl:.2f} / {pl_percent:.2f}%)"
                )
            
            return "\n".join(summary)
        except Exception as e:
            print(f"Error formatting portfolio: {e}")
            return "Error displaying portfolio."

    def set_current_user(self, account_number: str):
        """Set the current user context."""
        self._current_user = account_number

    def process_request(self, query: str) -> str:
        """Process user requests with enhanced context and security."""
        try:
            # Handle casual conversation first
            query_lower = query.lower().strip()
            words = query.lower().split()
            if 'buy' in words or 'sell' in words:
                return self._handle_trade_command(query)
            
            # Casual conversation patterns
            casual_patterns = {
                r'\b(hi|hello|hey)\b': "Hello! How can I help you with your investments today?",
                r'\b(how are you|how\'s it going)\b': "I'm doing well, thank you! Ready to help you with your financial needs.",
                r'\b(thank you|thanks)\b': "You're welcome! Let me know if you need anything else.",
                r'\b(bye|goodbye)\b': "Goodbye! Have a great day!",
            }
            
            # Check for casual patterns
            for pattern, response in casual_patterns.items():
                if re.search(pattern, query_lower):
                    return response
            
            # Handle market-related queries
            market_patterns = {
                r'\b(how.*market|what.*market|market.*today)\b': self._get_market_summary,
                r'\b(market.*analysis|market.*overview)\b': self._get_market_summary,
            }
            
            for pattern, handler in market_patterns.items():
                if re.search(pattern, query_lower):
                    return handler()
            
            # Simple command mapping
            simple_commands = {
                'balance': self._get_balance,
                'portfolio': self.get_portfolio_summary,
                'my balance': self._get_balance,
                'show balance': self._get_balance,
                'check balance': self._get_balance,
                'show portfolio': self.get_portfolio_summary,
                'my portfolio': self.get_portfolio_summary,
                'watchlist': self._get_watchlist,
                'my watchlist': self._get_watchlist,
                'help': self._get_help,
            }
            
            # Check for simple commands
            if query_lower in simple_commands:
                return simple_commands[query_lower]()
            
            # Handle watchlist commands
            watchlist_patterns = [
                (r'add\s+(\w+)\s+to\s+watchlist', 'add'),
                (r'watch\s+(\w+)', 'add'),
                (r'remove\s+(\w+)\s+from\s+watchlist', 'remove'),
                (r'unwatch\s+(\w+)', 'remove')
            ]

            for pattern, action in watchlist_patterns:
                match = re.search(pattern, query_lower)
                if match:
                    symbol = match.group(1).upper()
                    if action == 'add':
                        return self._add_to_watchlist(symbol)
                    else:
                        return self._remove_from_watchlist(symbol)

            # Get current context
            current_time = datetime.now(UTC).strftime('%Y-%m-%d %H:%M:%S')
            
            # Get user data if available
            user_data = {}
            if self._current_user:
                try:
                    portfolio = self.db.get_portfolio(self._current_user)
                    watchlist = self.db.get_watchlist(self._current_user)
                    user = self.db.get_user(self._current_user)
                    user_data = {
                        "account_number": self._current_user,
                        "balance": float(user['balance']),
                        "portfolio": [
                            {
                                "symbol": p['stock_symbol'],
                                "shares": int(p['shares']),
                                "avg_price": float(p['average_price']),
                                "current_price": float(p.get('current_price', 0))
                            } for p in portfolio
                        ],
                        "watchlist": [w['stock_symbol'] for w in watchlist]
                    }
                except Exception as e:
                    print(f"Error getting user data: {e}")
                    user_data = {"error": "Failed to get user data"}
            
            # Handle trade commands
            words = query_lower.split()
            if 'buy' in words or 'sell' in words:
                return self._handle_trade_command(query_lower)
            
            # Handle quote requests
            if query_lower.startswith('quote '):
                symbol = query_lower.split()[1].upper()
                return self._get_stock_quote(symbol)
            
            # Handle watch commands
            if query_lower.startswith('watch '):
                symbol = query_lower.split()[1].upper()
                return self._add_to_watchlist(symbol)
            
            # Process through LLM for other queries
            try:
                market_data = self.get_market_data()
                response = self.chain.invoke({
                    "query": query,
                    "current_time": current_time,
                    "user_data": json.dumps(user_data, default=str),
                    "market_data": json.dumps(market_data, default=str),
                    "chat_history": "\n".join(self._chat_history[-5:])
                })
                
                # Save chat history
                if self._current_user:
                    try:
                        self.db.save_chat_message(self._current_user, "USER", query)
                        self.db.save_chat_message(self._current_user, "ASSISTANT", response)
                        
                        self._chat_history.append(f"User: {query}")
                        self._chat_history.append(f"Assistant: {response}")
                    except Exception as e:
                        print(f"Error saving chat history: {e}")
                
                return response
                
            except Exception as e:
                print(f"LLM error: {e}")
                return "I'm having trouble processing that request. Please try again or use a specific command."
                
        except Exception as e:
            return f"❌ Error: {str(e)}"
        
    def _add_to_watchlist(self, symbol: str) -> str:
        """Add a stock to user's watchlist."""
        if not self._current_user:
            return "Please log in to modify your watchlist."
        try:
            # Validate symbol first
            try:
                quote = self._get_cached_quote(symbol)
                if not quote or quote.get('error'):
                    return f"❌ Invalid symbol: {symbol}"
            except Exception as e:
                return f"❌ Error validating symbol {symbol}: {str(e)}"

            # Add to watchlist
            result = self.db.add_to_watchlist(self._current_user, symbol)
            
            if result.get('status') == 'success':
                # Get current quote for feedback
                quote = self._get_cached_quote(symbol)
                return (
                    f"✅ Added {symbol} to your watchlist\n"
                    f"Current Price: ${float(quote['price']):.2f}\n"
                    f"Change: {float(quote['change']):.2f}%"
                )
            else:
                return f"❌ {result.get('message', 'Error adding to watchlist')}"
        except Exception as e:
            return f"Error adding to watchlist: {str(e)}"

    def _remove_from_watchlist(self, symbol: str) -> str:
        """Remove a stock from user's watchlist."""
        if not self._current_user:
            return "Please log in to modify your watchlist."
        try:
            result = self.db.remove_from_watchlist(self._current_user, symbol)
            return f"{'✅' if result['status'] == 'success' else '❌'} {result['message']}"
        except Exception as e:
            return f"Error removing from watchlist: {str(e)}"

    def _get_watchlist(self) -> str:
        """Get user's watchlist with current prices."""
        if not self._current_user:
            return "Please log in to view your watchlist."
        try:
            watchlist = self.db.get_watchlist(self._current_user)
            if not watchlist:
                return (
                    "📋 Your Watchlist is empty\n"
                    "Add stocks using 'add <SYMBOL> to watchlist' or 'watch <SYMBOL>'"
                )
            
            lines = ["📋 Your Watchlist:"]
            total_change = 0
            
            for item in watchlist:
                try:
                    quote = self._get_cached_quote(item['stock_symbol'])
                    change = float(quote.get('change', 0))
                    price = float(quote.get('price', 0))
                    emoji = "📈" if change > 0 else "📉" if change < 0 else "➖"
                    
                    lines.append(
                        f"{emoji} {item['stock_symbol']}: ${price:.2f} "
                        f"({change:+.2f}%)"
                    )
                    total_change += change
                except Exception as e:
                    lines.append(f"❌ {item['stock_symbol']}: Error getting quote")
            
            # Add summary if there are items
            if len(watchlist) > 0:
                avg_change = total_change / len(watchlist)
                lines.append(f"\nAverage Change: {avg_change:+.2f}%")
            
            return "\n".join(lines)
        except Exception as e:
            return f"Error getting watchlist: {str(e)}"

    def _get_market_summary(self) -> str:
        """Get a summary of current market conditions."""
        try:
            # Get test data for major indices
            indices_data = {
                "^GSPC": {"name": "S&P 500", "price": 4900.50, "change": 0.75},
                "^DJI": {"name": "Dow Jones", "price": 38750.25, "change": 0.50},
                "^IXIC": {"name": "NASDAQ", "price": 15800.75, "change": 1.25}
            }
            
            summary = ["📊 Market Summary:"]
            
            # Add market status
            market_time = datetime.now(UTC)
            is_market_open = (
                market_time.weekday() < 5 and  # Monday = 0, Friday = 4
                13 <= market_time.hour <= 20   # 9:30 AM - 4:00 PM EST in UTC
            )
            
            summary.append(f"Market Status: {'🟢 OPEN' if is_market_open else '🔴 CLOSED'}")
            summary.append(f"Last Updated: {market_time.strftime('%Y-%m-%d %H:%M:%S')} UTC\n")
            
            # Add indices
            for symbol, data in indices_data.items():
                change_emoji = "📈" if data["change"] > 0 else "📉"
                summary.append(
                    f"{change_emoji} {data['name']}: ${data['price']:,.2f} "
                    f"({data['change']:+.2f}%)"
                )
            
            # Add market sentiment
            avg_change = sum(data["change"] for data in indices_data.values()) / len(indices_data)
            sentiment = (
                "🟢 Bullish" if avg_change > 0.5 else
                "🟡 Neutral" if -0.5 <= avg_change <= 0.5 else
                "🔴 Bearish"
            )
            summary.append(f"\nMarket Sentiment: {sentiment}")
            
            # Add any available user portfolio performance
            if self._current_user:
                try:
                    portfolio = self.db.get_portfolio(self._current_user)
                    if portfolio:
                        total_value = sum(float(pos['shares']) * float(pos['current_price']) for pos in portfolio)
                        total_cost = sum(float(pos['shares']) * float(pos['average_price']) for pos in portfolio)
                        total_pl = total_value - total_cost
                        pl_percent = (total_pl / total_cost * 100) if total_cost > 0 else 0
                        
                        summary.append(f"\nYour Portfolio Performance:")
                        summary.append(
                            f"Total Value: ${total_value:,.2f} "
                            f"({pl_percent:+.2f}% overall)"
                        )
                except Exception as e:
                    print(f"Error getting portfolio performance: {e}")
            
            return "\n".join(summary)
            
        except Exception as e:
            return f"Error getting market summary: {str(e)}"

    def _handle_trade_command(self, query: str) -> str:
        """Handle buy/sell trade commands."""
        try:
            if not self._current_user:
                return "❌ Please log in to execute trades."

            words = query.lower().split()
            action = 'BUY' if 'buy' in words else 'SELL'
            symbol_idx = words.index('buy' if 'buy' in words else 'sell') + 1
            
            # Extract symbol and shares
            shares = None
            symbol = None
            
            # Define supported symbols
            SUPPORTED_SYMBOLS = {
                # Technology
                'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'AMD', 'INTC', 'CSCO',
                # Financial
                'JPM', 'BAC', 'GS', 'V', 'MA',
                # Consumer
                'WMT', 'COST', 'PG', 'KO', 'PEP', 'MCD',
                # Entertainment
                'DIS', 'NFLX',
                # Other sectors
                'TSLA', 'F', 'GM', 'GE', 'XOM', 'CVX', 'T', 'VZ'
            }
            
            # Parse query for shares and symbol
            for word in words[symbol_idx:]:
                if word.isdigit():
                    shares = int(word)
                elif word.upper() in SUPPORTED_SYMBOLS:
                    symbol = word.upper()
            
            if not symbol:
                return (
                    "❌ Invalid or missing stock symbol.\n"
                    "Use 'symbols' command to see supported stocks."
                )
                
            if not shares:
                return (
                    "❌ Please specify the number of shares.\n"
                    f"Example: {action.lower()} {symbol} 10"
                )
            
            if shares <= 0:
                return "❌ Number of shares must be positive."
            
            # Get current price with retry logic
            max_retries = 3
            retry_delay = 1  # seconds
            quote = None
            last_error = None
            
            for attempt in range(max_retries):
                try:
                    quote = self.db.get_real_time_quote(symbol)
                    if quote and 'price' in quote:
                        break
                except Exception as e:
                    last_error = str(e)
                    if attempt < max_retries - 1:
                        time.sleep(retry_delay)
                        retry_delay *= 2  # Exponential backoff
            
            if not quote or 'price' not in quote:
                return f"❌ Error: Unable to get quote for {symbol}: {last_error or 'Unknown error'}"
            
            total_cost = float(quote['price']) * shares
            
            # Verify sufficient balance for buy orders
            if action == 'BUY':
                try:
                    user = self.db.get_user(self._current_user)
                    if float(user['balance']) < total_cost:
                        return (
                            f"❌ Insufficient funds for this trade.\n"
                            f"Required: ${total_cost:,.2f}\n"
                            f"Available: ${float(user['balance']):,.2f}"
                        )
                except Exception as e:
                    return f"❌ Error verifying account balance: {str(e)}"
            
            # Verify sufficient shares for sell orders
            if action == 'SELL':
                try:
                    portfolio = self.db.get_portfolio(self._current_user)
                    position = next((pos for pos in portfolio if pos['stock_symbol'] == symbol), None)
                    if not position or int(position['shares']) < shares:
                        available = position['shares'] if position else 0
                        return (
                            f"❌ Insufficient shares for this trade.\n"
                            f"Required: {shares} shares\n"
                            f"Available: {available} shares"
                        )
                except Exception as e:
                    return f"❌ Error verifying share holdings: {str(e)}"
            
            # Prepare trade data
            trade_data = {
                "type": "trade",
                "operation": action,
                "data": {
                    "symbol": symbol,
                    "shares": shares,
                    "price": float(quote['price'])
                },
                "natural_response": (
                    f"Would you like to {action.lower()} {shares} shares of {symbol} "
                    f"at ${float(quote['price']):.2f} per share?"
                ),
                "requires_confirmation": True,
                "show_data": True
            }
            
            self._pending_operation = trade_data
            
            # Build detailed response
            response = [
                f"💹 {symbol} Trade Confirmation",
                f"Action: {action}",
                f"Shares: {shares:,}",
                f"Price: ${float(quote['price']):.2f}",
                f"Total {'cost' if action == 'BUY' else 'proceeds'}: ${total_cost:,.2f}",
                f"Change Today: {float(quote.get('change', 0)):.2f}%",
                f"Volume: {int(quote.get('volume', 0)):,}",
                "",
                "Please confirm by saying 'yes' or 'confirm'"
            ]
            
            return "\n".join(response)
            
        except ValueError as ve:
            return f"❌ Invalid trade command: {str(ve)}\nExample: buy AAPL 10"
        except Exception as e:
            print(f"Trade error: {str(e)}")  # Log error for debugging
            return "❌ Error processing trade. Please try again with format: buy/sell SYMBOL SHARES"

    def _get_stock_quote(self, symbol: str) -> str:
        """Get and format stock quote."""
        try:
            quote = self.db.get_real_time_quote(symbol)
            return (
                f"\n📈 {symbol} Quote:\n"
                f"Price: ${float(quote['price']):.2f}\n"
                f"Change: {float(quote['change']):.2f}%\n"
                f"Volume: {int(quote['volume']):,}"
            )
        except Exception as e:
            return f"❌ Error getting quote for {symbol}: {str(e)}"

    def _get_balance(self) -> str:
        """Get user's current balance."""
        if not self._current_user:
            return "Please log in to check your balance."
        try:
            user = self.db.get_user(self._current_user)
            return f"💰 Current Balance: ${float(user['balance']):,.2f}"
        except Exception as e:
            return f"Error getting balance: {str(e)}"

    def _get_watchlist(self) -> str:
        """Get user's watchlist with current prices."""
        if not self._current_user:
            return "Please log in to view your watchlist."
        try:
            watchlist = self.db.get_watchlist(self._current_user)
            if not watchlist:
                return "Your watchlist is empty."
            
            lines = ["📋 Your Watchlist:"]
            for item in watchlist:
                lines.append(
                    f"- {item['stock_symbol']}: ${float(item['price']):.2f} "
                    f"({float(item['change']):.2f}%)"
                )
            return "\n".join(lines)
        except Exception as e:
            return f"Error getting watchlist: {str(e)}"

    def _add_to_watchlist(self, symbol: str) -> str:
        """Add a stock to user's watchlist."""
        if not self._current_user:
            return "Please log in to modify your watchlist."
        try:
            result = self.db.add_to_watchlist(self._current_user, symbol)
            return f"{'✅' if result['status'] == 'success' else '❌'} {result['message']}"
        except Exception as e:
            return f"Error adding to watchlist: {str(e)}"

    def _get_help(self) -> str:
        """Get help message with available commands."""
        return """
📌 Available Commands:
1. login <email> <password> - Login to account
2. create <email> <password> <account_number> - Create new account
3. portfolio - View your portfolio
4. quote <symbol> - Get stock quote
5. buy <symbol> <shares> - Buy stocks
6. sell <symbol> <shares> - Sell stocks
7. watch <symbol> - Add to watchlist
8. watchlist - View watchlist
9. balance - Check balance
10. deposit <amount> - Deposit funds
11. chat <message> - Chat with agent
12. clear - Clear screen
13. exit - Exit application

You can also ask questions naturally!
"""

    def _execute_operation(self, operation: Dict) -> str:
        """Execute parsed operations with proper error handling."""
        try:
            if not self._current_user:
                return "❌ Please log in to perform this operation."

            if operation["type"] == "trade":
                result = self.db.execute_trade(
                    self._current_user,
                    operation["operation"],
                    operation["data"]["symbol"],
                    operation["data"]["shares"],
                    operation["data"]["price"]
                )
                
                if result["status"] == "success":
                    # Update portfolio summary after trade
                    portfolio = self.db.get_portfolio(self._current_user)
                    return f"✅ {result['message']}\n\n{self._format_portfolio_summary(portfolio)}"
                return f"❌ {result['message']}"
            
            elif operation["type"] == "account":
                if operation["operation"] == "READ":
                    if "portfolio" in operation["data"]:
                        portfolio = self.db.get_portfolio(self._current_user)
                        return self._format_portfolio_summary(portfolio)
                    elif "watchlist" in operation["data"]:
                        watchlist = self.db.get_watchlist(self._current_user)
                        return "Watchlist:\n" + "\n".join(
                            f"- {item['stock_symbol']}: ${item['price']:.2f}" 
                            for item in watchlist
                        )
            
            return operation["natural_response"]
            
        except Exception as e:
            return f"❌ Error executing operation: {str(e)}"

    def confirm_operation(self) -> str:
        """Execute a pending operation after user confirmation."""
        if self._pending_operation:
            operation = self._pending_operation
            self._pending_operation = None
            return self._execute_operation(operation)
        return "No pending operation to confirm."

    def get_portfolio_summary(self) -> str:
        """Get formatted portfolio summary for current user."""
        if not self._current_user:
            return "Please log in to view portfolio."
        
        try:
            portfolio = self.db.get_portfolio(self._current_user)
            if not portfolio:
                return "Your portfolio is empty."
            
            total_value = sum(float(pos['shares']) * float(pos['current_price']) for pos in portfolio)
            total_cost = sum(float(pos['shares']) * float(pos['average_price']) for pos in portfolio)
            total_pl = total_value - total_cost
            
            summary = [
                "📊 Portfolio Summary:",
                f"Total Value: ${total_value:,.2f}",
                f"Total P/L: ${total_pl:,.2f} ({(total_pl/total_cost)*100:.2f}% overall)\n",
                "Current Positions:"
            ]
            
            for pos in portfolio:
                current_value = float(pos['shares']) * float(pos['current_price'])
                cost_basis = float(pos['shares']) * float(pos['average_price'])
                position_pl = current_value - cost_basis
                pl_percent = (position_pl / cost_basis) * 100
                
                summary.append(
                    f"- {pos['stock_symbol']}: {int(pos['shares'])} shares @ ${float(pos['average_price']):.2f} "
                    f"(Current: ${float(pos['current_price']):.2f}, P/L: ${position_pl:.2f} / {pl_percent:.2f}%)"
                )
            
            return "\n".join(summary)
        except Exception as e:
            print(f"Error formatting portfolio: {str(e)}")
            return "Error displaying portfolio."
        

    def _get_market_summary(self) -> str:
        """Get a summary of current market conditions."""
        try:
            market_data = self.get_market_data()
            indices = market_data.get("indices", {})
            
            summary = ["📊 Market Summary:"]
            for symbol, data in indices.items():
                if "price" in data:
                    summary.append(
                        f"{data['name']}: ${float(data['price']):.2f} "
                        f"({float(data.get('change', 0)):.2f}%)"
                    )
            
            return "\n".join(summary)
        except Exception as e:
            return f"Error getting market summary: {str(e)}"

    def _get_performance_analysis(self, symbol: str) -> str:
        """Get detailed performance analysis for a symbol."""
        try:
            quote = self._get_cached_quote(symbol)
            
            analysis = [
                f"📈 {symbol} Analysis:",
                f"Current Price: ${float(quote['price']):.2f}",
                f"Change: {float(quote['change']):.2f}%",
                f"Volume: {int(quote['volume']):,}",
            ]
            
            # Add technical indicators if available
            if 'indicators' in quote:
                analysis.append("\nTechnical Indicators:")
                for indicator, value in quote['indicators'].items():
                    analysis.append(f"{indicator}: {value}")
            
            return "\n".join(analysis)
        except Exception as e:
            return f"Error analyzing {symbol}: {str(e)}"
        
    def get_supported_symbols(self) -> List[str]:
        """Get list of supported stock symbols."""
        return {
            # Technology
            'AAPL': 'Apple Inc.',
            'MSFT': 'Microsoft Corporation',
            'GOOGL': 'Alphabet Inc. (Google)',
            'AMZN': 'Amazon.com Inc.',
            'META': 'Meta Platforms Inc. (Facebook)',
            'NVDA': 'NVIDIA Corporation',
            'AMD': 'Advanced Micro Devices Inc.',
            'INTC': 'Intel Corporation',
            'CSCO': 'Cisco Systems Inc.',
            'ORCL': 'Oracle Corporation',
            'CRM': 'Salesforce Inc.',
            'ADBE': 'Adobe Inc.',
            
            # Financial
            'JPM': 'JPMorgan Chase & Co.',
            'BAC': 'Bank of America Corp.',
            'GS': 'Goldman Sachs Group Inc.',
            'V': 'Visa Inc.',
            'MA': 'Mastercard Inc.',
            
            # Consumer
            'WMT': 'Walmart Inc.',
            'COST': 'Costco Wholesale Corporation',
            'PG': 'Procter & Gamble Co.',
            'KO': 'The Coca-Cola Company',
            'PEP': 'PepsiCo Inc.',
            'MCD': 'McDonald\'s Corporation',
            
            # Entertainment/Media
            'DIS': 'The Walt Disney Company',
            'NFLX': 'Netflix Inc.',
            'CMCSA': 'Comcast Corporation',
            
            # Healthcare
            'JNJ': 'Johnson & Johnson',
            'PFE': 'Pfizer Inc.',
            'UNH': 'UnitedHealth Group Inc.',
            'ABBV': 'AbbVie Inc.',
            
            # Industrial/Manufacturing
            'CAT': 'Caterpillar Inc.',
            'BA': 'Boeing Company',
            'GE': 'General Electric Company',
            
            # Energy
            'XOM': 'Exxon Mobil Corporation',
            'CVX': 'Chevron Corporation',
            
            # Telecommunications
            'T': 'AT&T Inc.',
            'VZ': 'Verizon Communications Inc.',
            
            # Automotive
            'TSLA': 'Tesla Inc.',
            'F': 'Ford Motor Company',
            'GM': 'General Motors Company',
            
            # Retail
            'TGT': 'Target Corporation',
            'HD': 'The Home Depot Inc.',
            'NKE': 'Nike Inc.',
        }

    def _get_symbols_command(self) -> str:
        """Format and return list of supported symbols."""
        symbols = self.get_supported_symbols()
        
        # Group symbols by sector
        sectors = {
            'Technology': ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'AMD', 'INTC', 'CSCO', 'ORCL', 'CRM', 'ADBE'],
            'Financial': ['JPM', 'BAC', 'GS', 'V', 'MA'],
            'Consumer': ['WMT', 'COST', 'PG', 'KO', 'PEP', 'MCD'],
            'Entertainment': ['DIS', 'NFLX', 'CMCSA'],
            'Healthcare': ['JNJ', 'PFE', 'UNH', 'ABBV'],
            'Industrial': ['CAT', 'BA', 'GE'],
            'Energy': ['XOM', 'CVX'],
            'Telecom': ['T', 'VZ'],
            'Automotive': ['TSLA', 'F', 'GM'],
            'Retail': ['TGT', 'HD', 'NKE']
        }
        
        lines = ["📈 Supported Stock Symbols:"]
        
        for sector, sector_symbols in sectors.items():
            lines.append(f"\n{sector}:")
            for symbol in sector_symbols:
                lines.append(f"  • {symbol}: {symbols[symbol]}")
        
        lines.append("\nUsage:")
        lines.append("- quote <SYMBOL>     (e.g., quote AAPL)")
        lines.append("- buy <SYMBOL> <QTY> (e.g., buy AAPL 10)")
        lines.append("- sell <SYMBOL> <QTY> (e.g., sell MSFT 5)")
        lines.append("- watch <SYMBOL>     (e.g., watch GOOGL)")
        
        return "\n".join(lines)