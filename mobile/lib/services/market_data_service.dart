import '../models/stock.dart';

class MarketDataService {
  static const String baseUrl = 'YOUR_API_BASE_URL';
  static const String apiKey = 'YOUR_API_KEY';

  Future<List<Stock>> getTopStocks() async {
    // This is a mock implementation
    // Replace with actual API call
    return [
      Stock(
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 182.63,
        change: 4.31,
        changePercentage: 2.41,
        volume: 1234567,
      ),
      Stock(
        symbol: 'MSFT',
        name: 'Microsoft',
        price: 326.24,
        change: 5.85,
        changePercentage: 1.83,
        volume: 987654,
      ),
    ];
  }

  Future<Map<String, dynamic>> getMarketSummary() async {
    // Implement market summary API call
    return {
      'sp500': {
        'value': 4785.24,
        'change': 58.73,
        'changePercentage': 1.24,
      },
      'nasdaq': {
        'value': 15123.45,
        'change': 147.21,
        'changePercentage': 0.98,
      },
      'dow': {
        'value': 35456.78,
        'change': -159.56,
        'changePercentage': -0.45,
      },
    };
  }
}