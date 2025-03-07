import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:vestern/config/theme.dart';
import 'package:vestern/widgets/common/vestern_card.dart';

class PortfolioPage extends StatefulWidget {
  const PortfolioPage({super.key});

  @override
  _PortfolioPageState createState() => _PortfolioPageState();
}

class _PortfolioPageState extends State<PortfolioPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF121212),
        elevation: 0,
        title: const Text(
          'Portfolio',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () {
              // Add new position
            },
          ),
          IconButton(
            icon: const Icon(Icons.more_vert),
            onPressed: () {
              // Show portfolio options
            },
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildPortfolioSummary(),
            const SizedBox(height: 24),
            _buildAllocationChart(),
            const SizedBox(height: 24),
            _buildPositions(),
          ],
        ),
      ),
    );
  }

  Widget _buildPortfolioSummary() {
    return VesternCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Portfolio Value',
            style: TextStyle(
              color: Colors.grey,
              fontSize: 16,
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            '\$124,583.00',
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 4),
          const Row(
            children: [
              Icon(
                Icons.arrow_upward,
                color: VesternTheme.accentTeal,
                size: 16,
              ),
              SizedBox(width: 4),
              Text(
                '+\$2,341.25 (1.91%)',
                style: TextStyle(
                  color: VesternTheme.accentTeal,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                ' today',
                style: TextStyle(
                  color: Colors.grey,
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _buildPortfolioStat('Buying Power', '\$34,218.92'),
              _buildPortfolioStat('Total Return', '+21.45%'),
              _buildPortfolioStat('Annual Return', '+15.32%'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPortfolioStat(String label, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            color: Colors.grey,
            fontSize: 14,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
      ],
    );
  }

  Widget _buildAllocationChart() {
    return VesternCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Asset Allocation',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 24),
          SizedBox(
            height: 200,
            child: PieChart(
              PieChartData(
                sectionsSpace: 0,
                centerSpaceRadius: 40,
                sections: [
                  PieChartSectionData(
                    value: 40,
                    title: 'Tech',
                    color: VesternTheme.primaryPurple,
                    radius: 50,
                    titleStyle: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  PieChartSectionData(
                    value: 30,
                    title: 'Finance',
                    color: VesternTheme.accentTeal,
                    radius: 50,
                    titleStyle: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  PieChartSectionData(
                    value: 15,
                    title: 'Health',
                    color: Colors.orange,
                    radius: 50,
                    titleStyle: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  PieChartSectionData(
                    value: 15,
                    title: 'Other',
                    color: Colors.grey,
                    radius: 50,
                    titleStyle: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPositions() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Positions',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        VesternCard(
          child: Column(
            children: [
              _buildPositionItem(
                'AAPL',
                'Apple Inc.',
                10,
                182.63,
                1826.30,
                241.52,
                true,
              ),
              Divider(height: 24, color: Colors.grey.shade800),
              _buildPositionItem(
                'MSFT',
                'Microsoft',
                15,
                326.24,
                4893.60,
                567.45,
                true,
              ),
              Divider(height: 24, color: Colors.grey.shade800),
              _buildPositionItem(
                'TSLA',
                'Tesla Inc.',
                5,
                245.89,
                1229.45,
                -123.45,
                false,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildPositionItem(
    String symbol,
    String name,
    int shares,
    double price,
    double value,
    double profit,
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
            '$shares shares',
            style: const TextStyle(color: Colors.grey),
          ),
        ),
        Expanded(
          child: Text(
            '\$${price.toStringAsFixed(2)}',
            style: const TextStyle(fontWeight: FontWeight.w500),
          ),
        ),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                '\$${value.toStringAsFixed(2)}',
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
              Text(
                '${isPositive ? '+' : ''}\$${profit.toStringAsFixed(2)}',
                style: TextStyle(
                  color: isPositive ? VesternTheme.accentTeal : Colors.redAccent,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}