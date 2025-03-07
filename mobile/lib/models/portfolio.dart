class Portfolio {
  final double totalValue;
  final double dailyChange;
  final double dailyChangePercentage;
  final double balance;
  final List<Position> positions;

  Portfolio({
    required this.totalValue,
    required this.dailyChange,
    required this.dailyChangePercentage,
    required this.balance,
    required this.positions,
  });
}

class Position {
  final String symbol;
  final String name;
  final int quantity;
  final double averagePrice;
  final double currentPrice;
  final double totalValue;
  final double profit;

  Position({
    required this.symbol,
    required this.name,
    required this.quantity,
    required this.averagePrice,
    required this.currentPrice,
    required this.totalValue,
    required this.profit,
  });
}