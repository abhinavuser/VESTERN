import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:vestern/widgets/common/vestern_card.dart';

class MarketOverviewPage extends StatefulWidget {
  const MarketOverviewPage({super.key});

  @override
  _MarketOverviewPageState createState() => _MarketOverviewPageState();
}

class _MarketOverviewPageState extends State<MarketOverviewPage> {
  String _selectedTimeframe = '1D';
  String _selectedMarket = 'Stocks';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF121212),
        elevation: 0,
        title: const Text(
          'Market Overview',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () {},
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildMarketSelector(),
            const SizedBox(height: 24),
            _buildMarketSummary(),
            const SizedBox(height: 24),
            _buildTimeframeSelector(),
            const SizedBox(height: 24),
            _buildMarketChart(),
            const SizedBox(height: 24),
            _buildMarketNews(),
          ],
        ),
      ),
    );
  }

  Widget _buildMarketNews() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Market News',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        _buildNewsItem(
          'Tech Stocks Rally as Fed Signals Rate Cut',
          '2 hours ago',
          'Major tech stocks surge as Federal Reserve hints at possible rate cuts in the coming months.',
        ),
        const SizedBox(height: 16),
        _buildNewsItem(
          'NVIDIA Announces New AI Chip',
          '4 hours ago',
          'NVIDIA unveils next-generation AI chip, stock reaches all-time high.',
        ),
        const SizedBox(height: 16),
        _buildNewsItem(
          'Market Analysis: Crypto Market Shows Recovery',
          '5 hours ago',
          'Bitcoin and other major cryptocurrencies show signs of recovery after recent downturn.',
        ),
      ],
    );
  }


  Widget _buildMarketSelector() {
    return Row(
      children: [
        _buildMarketButton('Stocks', Icons.show_chart),
        const SizedBox(width: 12),
        _buildMarketButton('Crypto', Icons.currency_bitcoin),
        const SizedBox(width: 12),
        _buildMarketButton('Forex', Icons.currency_exchange),
        const SizedBox(width: 12),
        _buildMarketButton('Commodities', Icons.grid_view),
      ],
    );
  }
    Widget _buildNewsItem(String title, String time, String description) {
    return VesternCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  title,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              Text(
                time,
                style: const TextStyle(
                  color: Colors.grey,
                  fontSize: 12,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            description,
            style: TextStyle(
              color: Colors.grey[300],
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMarketButton(String title, IconData icon) {
    bool isSelected = _selectedMarket == title;
    return InkWell(
      onTap: () {
        setState(() {
          _selectedMarket = title;
        });
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          color: isSelected ? const Color(0xFF6C63FF) : const Color(0xFF1E1E1E),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            Icon(
              icon,
              color: isSelected ? Colors.white : Colors.grey,
              size: 20,
            ),
            const SizedBox(width: 8),
            Text(
              title,
              style: TextStyle(
                color: isSelected ? Colors.white : Colors.grey,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMarketSummary() {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Market Summary',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildMarketStat('S&P 500', '4,785.24', '+1.24%', true),
                _buildMarketStat('NASDAQ', '15,123.45', '+0.98%', true),
                _buildMarketStat('DOW', '35,456.78', '-0.45%', false),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMarketStat(String title, String value, String change, bool isPositive) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            color: Colors.grey,
            fontSize: 14,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          value,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        Text(
          change,
          style: TextStyle(
            color: isPositive ? const Color(0xFF03DAC5) : Colors.redAccent,
            fontWeight: FontWeight.bold,
          ),
        ),
      ],
    );
  }

  Widget _buildTimeframeSelector() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: ['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((timeframe) {
        bool isSelected = _selectedTimeframe == timeframe;
        return GestureDetector(
          onTap: () {
            setState(() {
              _selectedTimeframe = timeframe;
            });
          },
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            margin: const EdgeInsets.symmetric(horizontal: 4),
            decoration: BoxDecoration(
              color: isSelected ? const Color(0xFF6C63FF) : Colors.transparent,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(
                color: isSelected ? const Color(0xFF6C63FF) : Colors.grey,
              ),
            ),
            child: Text(
              timeframe,
              style: TextStyle(
                color: isSelected ? Colors.white : Colors.grey,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildMarketChart() {
    return SizedBox(
      height: 300,
      child: LineChart(
        LineChartData(
          gridData: FlGridData(
            show: true,
            drawVerticalLine: true,
            getDrawingHorizontalLine: (value) {
              return FlLine(
                color: Colors.grey.withOpacity(0.1),
                strokeWidth: 1,
              );
            },
            getDrawingVerticalLine: (value) {
              return FlLine(
                color: Colors.grey.withOpacity(0.1),
                strokeWidth: 1,
              );
            },
          ),
          titlesData: const FlTitlesData(show: false),
          borderData: FlBorderData(show: false),
          lineBarsData: [
            LineChartBarData(
              spots: [
                const FlSpot(0, 3),
                const FlSpot(2.6, 2),
                const FlSpot(4.9, 5),
                const FlSpot(6.8, 3.1),
                const FlSpot(8, 4),
                const FlSpot(9.5, 3),
                const FlSpot(11, 4),
              ],
              isCurved: true,
              color: const Color(0xFF6C63FF),
              barWidth: 3,
              isStrokeCapRound: true,
              dotData: const FlDotData(show: false),
              belowBarData: BarAreaData(
                show: true,
                color: const Color(0xFF6C63FF).withOpacity(0.1),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTopMovers() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Top Movers',
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
              _buildMoverCard('AAPL', 'Apple Inc.', '182.63', '+2.41%', true),
              _buildMoverCard('TSLA', 'Tesla Inc.', '245.89', '-1.83%', false),
              _buildMoverCard('NVDA', 'NVIDIA', '485.12', '+3.52%', true),
              _buildMoverCard('META', 'Meta Platforms', '298.45', '+1.27%', true),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildMoverCard(String symbol, String name, String price, String change, bool isPositive) {
    return Container(
      width: 200,
      margin: const EdgeInsets.only(right: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E1E),
        borderRadius: BorderRadius.circular(12),
      ),
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
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: isPositive 
                      ? const Color(0xFF03DAC5).withOpacity(0.1)
                      : Colors.redAccent.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  change,
                  style: TextStyle(
                    color: isPositive ? const Color(0xFF03DAC5) : Colors.redAccent,
                    fontWeight: FontWeight.bold,
                    fontSize: 12,
                  ),
                ),
              ),
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
            '\$$price',
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}