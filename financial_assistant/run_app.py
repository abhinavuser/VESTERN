import sys
from pathlib import Path
from src.ui.test_interface import FinanceAgentTester

def main():
    tester = FinanceAgentTester()
    tester.run()

if __name__ == "__main__":
    # Add project root to Python path
    project_root = Path(__file__).parent
    sys.path.append(str(project_root))
    main()