class Stock {
  final String symbol;
  final String name;
  final double price;
  final double change;
  final double changePercentage;
  final int volume;

  Stock({
    required this.symbol,
    required this.name,
    required this.price,
    required this.change,
    required this.changePercentage,
    required this.volume,
  });

  factory Stock.fromJson(Map<String, dynamic> json) {
    return Stock(
      symbol: json['symbol'],
      name: json['name'],
      price: json['price'].toDouble(),
      change: json['change'].toDouble(),
      changePercentage: json['changePercentage'].toDouble(),
      volume: json['volume'],
    );
  }
}