from typing import Optional
import os
from datetime import datetime, UTC
import time
from src.agent.finance_agent import FinanceAgent
from src.database.database_manager import DatabaseManager

class FinanceAgentTester:
    def __init__(self):
        self.agent = FinanceAgent()
        self.db = DatabaseManager()
        self.current_user: Optional[str] = None
        self.clear_screen()

    def clear_screen(self):
        """Clear console screen."""
        os.system('cls' if os.name == 'nt' else 'clear')

    def print_header(self):
        """Print application header."""
        print("\n" + "="*50)
        print("🤖 Finance Agent Testing Interface")
        print("="*50)
        current_time = datetime.now(UTC).strftime('%Y-%m-%d %H:%M:%S')
        print(f"UTC Time: {current_time}")
        if self.current_user:
            print(f"Logged in as: {self.current_user}")
        print("="*50 + "\n")

    def print_menu(self):
        """Print main menu options."""
        print("\n📌 Available Commands:")
        print("1. login <email> <password> - Login to account")
        print("2. create <email> <password> <account_number> - Create new account")
        print("3. portfolio - View your portfolio")
        print("4. quote <symbol> - Get stock quote")
        print("5. buy <symbol> <shares> - Buy stocks")
        print("6. sell <symbol> <shares> - Sell stocks")
        print("7. watch <symbol> - Add to watchlist")
        print("8. watchlist - View watchlist")
        print("9. balance - Check balance")
        print("10. deposit <amount> - Deposit funds")
        print("11. chat <message> - Chat with agent")
        print("12. clear - Clear screen")
        print("13. exit - Exit application")
        print("\nOr just type your question naturally!\n")

    def handle_login(self, email: str, password: str):
        """Handle user login."""
        result = self.db.validate_login(email, password)
        if result["status"] == "success":
            self.current_user = result["data"]["account_number"]
            self.agent.set_current_user(self.current_user)
            print(f"✅ Logged in successfully! Balance: ${result['data']['balance']:.2f}")
        else:
            print(f"❌ {result['message']}")

    def handle_create_account(self, email: str, password: str, account_number: str):
        """Handle account creation."""
        result = self.db.create_user({
            "email": email,
            "password": password,
            "account_number": account_number
        })
        print(f"{'✅' if result['status'] == 'success' else '❌'} {result['message']}")

    def handle_command(self, command: str):
        """Parse and handle user commands."""
        try:
            parts = command.strip().split()
            cmd = parts[0].lower()

            if not self.current_user and cmd not in ['login', 'create', 'exit', 'clear']:
                print("❌ Please login first!")
                return True

            if cmd == 'login' and len(parts) == 3:
                self.handle_login(parts[1], parts[2])
            elif cmd == 'create' and len(parts) == 4:
                self.handle_create_account(parts[1], parts[2], parts[3])
            elif cmd == 'portfolio':
                print(self.agent.get_portfolio_summary())
            elif cmd == 'quote' and len(parts) == 2:
                quote = self.db.get_real_time_quote(parts[1].upper())
                print(f"\n📈 {quote['symbol']} Quote:")
                print(f"Price: ${quote['price']:.2f}")
                print(f"Change: {quote['change']:.2f}%")
                print(f"Volume: {quote['volume']:,}")
            elif cmd == 'buy' and len(parts) >= 3:
                response = self.agent.process_request(f"buy {parts[2]} shares of {parts[1]}")
                print(response)
                if "confirm" in response.lower():
                    confirm = input("\nConfirm trade (yes/no): ").lower()
                    if confirm in ['yes', 'y']:
                        print(self.agent.confirm_operation())
            elif cmd == 'sell' and len(parts) >= 3:
                response = self.agent.process_request(f"sell {parts[2]} shares of {parts[1]}")
                print(response)
                if "confirm" in response.lower():
                    confirm = input("\nConfirm trade (yes/no): ").lower()
                    if confirm in ['yes', 'y']:
                        print(self.agent.confirm_operation())
            elif cmd == 'watch' and len(parts) == 2:
                result = self.db.add_to_watchlist(self.current_user, parts[1].upper())
                print(f"{'✅' if result['status'] == 'success' else '❌'} {result['message']}")
            elif cmd == 'watchlist':
                watchlist = self.db.get_watchlist(self.current_user)
                print("\n📋 Your Watchlist:")
                for item in watchlist:
                    print(f"- {item['stock_symbol']}: ${item['price']:.2f} ({item['change']:.2f}%)")
            elif cmd == 'balance':
                user = self.db.get_user(self.current_user)
                print(f"\n💰 Current Balance: ${user['balance']:.2f}")
            elif cmd == 'deposit' and len(parts) == 2:
                try:
                    amount = float(parts[1])
                    # Simple deposit implementation - you might want to add proper transaction handling
                    self.db.execute_query(
                        "UPDATE users SET balance = balance + %s WHERE account_number = %s",
                        (amount, self.current_user),
                        fetch=False
                    )
                    print(f"✅ Deposited ${amount:.2f} successfully")
                except ValueError:
                    print("❌ Invalid amount")
            elif cmd == 'chat':
                message = ' '.join(parts[1:])
                response = self.agent.process_request(message)
                print(f"\n🤖 Agent: {response}")
            elif cmd == 'clear':
                self.clear_screen()
                self.print_header()
            elif cmd == 'exit':
                return False
            else:
                # Treat as natural language query
                response = self.agent.process_request(command)
                print(f"\n🤖 Agent: {response}")

        except Exception as e:
            print(f"❌ Error: {str(e)}")

        return True

    def run(self):
        """Run the testing interface."""
        running = True
        self.print_header()
        self.print_menu()

        while running:
            try:
                command = input("\n💬 Enter command or question: ").strip()
                if command:
                    running = self.handle_command(command)
            except KeyboardInterrupt:
                print("\n👋 Goodbye!")
                break
            except Exception as e:
                print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    tester = FinanceAgentTester()
    tester.run()