import 'package:flutter/material.dart';
import 'package:vestern/config/theme.dart';
import 'package:vestern/widgets/common/vestern_card.dart';
import 'package:fl_chart/fl_chart.dart';

class StocksPage extends StatefulWidget {
  const StocksPage({super.key});

  @override
  _StocksPageState createState() => _StocksPageState();
}

class _StocksPageState extends State<StocksPage> {
  final String _selectedTimeframe = '1D';
  final TextEditingController _searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF121212),
        elevation: 0,
        title: const Text(
          'Stocks',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () {
              // Show filters
            },
          ),
          IconButton(
            icon: const Icon(Icons.bookmark_outline),
            onPressed: () {
              // Show watchlist
            },
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: Column(
        children: [
          _buildSearchBar(),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildWatchlist(),
                  const SizedBox(height: 24),
                  _buildTopGainers(),
                  const SizedBox(height: 24),
                  _buildTopLosers(),
                  const SizedBox(height: 24),
                  _buildMostActive(),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSearchBar() {
    return Container(
      padding: const EdgeInsets.all(16),
      color: const Color(0xFF121212),
      child: TextField(
        controller: _searchController,
        style: const TextStyle(color: Colors.white),
        decoration: InputDecoration(
          hintText: 'Search stocks, ETFs, indices...',
          hintStyle: const TextStyle(color: Colors.grey),
          prefixIcon: const Icon(Icons.search, color: Colors.grey),
          filled: true,
          fillColor: VesternTheme.surfaceDark,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide.none,
          ),
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        ),
      ),
    );
  }

  Widget _buildWatchlist() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Watchlist',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              _buildWatchlistCard('AAPL', 'Apple Inc.', 182.63, 2.41, true),
              _buildWatchlistCard('TSLA', 'Tesla Inc.', 245.89, -1.83, false),
              _buildWatchlistCard('NVDA', 'NVIDIA', 485.12, 3.52, true),
              _buildWatchlistCard('META', 'Meta Platforms', 298.45, 1.27, true),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildWatchlistCard(
    String symbol,
    String name,
    double price,
    double changePercent,
    bool isPositive,
  ) {
    return Container(
      width: 200,
      margin: const EdgeInsets.only(right: 16),
      child: VesternCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  symbol,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                _buildChangeIndicator(changePercent, isPositive),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              name,
              style: const TextStyle(
                color: Colors.grey,
                fontSize: 14,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              '\$${price.toStringAsFixed(2)}',
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            SizedBox(
              height: 50,
              child: LineChart(
                LineChartData(
                  gridData: const FlGridData(show: false),
                  titlesData: const FlTitlesData(show: false),
                  borderData: FlBorderData(show: false),
                  lineBarsData: [
                    LineChartBarData(
                      spots: [
                        const FlSpot(0, 3),
                        const FlSpot(1, 1),
                        const FlSpot(2, 4),
                        const FlSpot(3, 2),
                        const FlSpot(4, 5),
                      ],
                      isCurved: true,
                      color: isPositive ? VesternTheme.accentTeal : Colors.redAccent,
                      barWidth: 2,
                      isStrokeCapRound: true,
                      dotData: const FlDotData(show: false),
                      belowBarData: BarAreaData(show: false),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildChangeIndicator(double change, bool isPositive) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: isPositive 
            ? VesternTheme.accentTeal.withOpacity(0.1)
            : Colors.redAccent.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        '${isPositive ? '+' : ''}${change.toStringAsFixed(2)}%',
        style: TextStyle(
          color: isPositive ? VesternTheme.accentTeal : Colors.redAccent,
          fontWeight: FontWeight.bold,
          fontSize: 12,
        ),
      ),
    );
  }

  Widget _buildStockSection(String title, List<Map<String, dynamic>> stocks) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        VesternCard(
          child: Column(
            children: stocks.map((stock) {
              bool isPositive = stock['changePercent'] > 0;
              return Column(
                children: [
                  _buildStockListItem(
                    stock['symbol'],
                    stock['name'],
                    stock['price'],
                    stock['changePercent'],
                    isPositive,
                  ),
                  if (stock != stocks.last)
                    Divider(height: 24, color: Colors.grey.shade800),
                ],
              );
            }).toList(),
          ),
        ),
      ],
    );
  }

  Widget _buildStockListItem(
    String symbol,
    String name,
    double price,
    double changePercent,
    bool isPositive,
  ) {
    return Row(
      children: [
        Expanded(
          flex: 2,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                symbol,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              Text(
                name,
                style: const TextStyle(
                  color: Colors.grey,
                  fontSize: 14,
                ),
              ),
            ],
          ),
        ),
        Expanded(
          child: Text(
            '\$${price.toStringAsFixed(2)}',
            style: const TextStyle(fontWeight: FontWeight.w500),
          ),
        ),
        _buildChangeIndicator(changePercent, isPositive),
      ],
    );
  }

  Widget _buildTopGainers() {
    final gainers = [
      {
        'symbol': 'NVDA',
        'name': 'NVIDIA Corporation',
        'price': 485.12,
        'changePercent': 3.52,
      },
      {
        'symbol': 'AMD',
        'name': 'Advanced Micro Devices',
        'price': 178.39,
        'changePercent': 2.89,
      },
      {
        'symbol': 'AAPL',
        'name': 'Apple Inc.',
        'price': 182.63,
        'changePercent': 2.41,
      },
    ];
    return _buildStockSection('Top Gainers', gainers);
  }

  Widget _buildTopLosers() {
    final losers = [
      {
        'symbol': 'TSLA',
        'name': 'Tesla Inc.',
        'price': 245.89,
        'changePercent': -1.83,
      },
      {
        'symbol': 'NFLX',
        'name': 'Netflix Inc.',
        'price': 478.25,
        'changePercent': -1.45,
      },
      {
        'symbol': 'AMZN',
        'name': 'Amazon.com Inc.',
        'price': 145.28,
        'changePercent': -0.92,
      },
    ];
    return _buildStockSection('Top Losers', losers);
  }

  Widget _buildMostActive() {
    final active = [
      {
        'symbol': 'AAPL',
        'name': 'Apple Inc.',
        'price': 182.63,
        'changePercent': 2.41,
      },
      {
        'symbol': 'TSLA',
        'name': 'Tesla Inc.',
        'price': 245.89,
        'changePercent': -1.83,
      },
      {
        'symbol': 'META',
        'name': 'Meta Platforms',
        'price': 298.45,
        'changePercent': 1.27,
      },
    ];
    return _buildStockSection('Most Active', active);
  }
}