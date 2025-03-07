import 'package:flutter/material.dart';
import 'package:vestern/config/theme.dart';
import 'package:vestern/widgets/common/vestern_card.dart';

class FeaturesPage extends StatelessWidget {
  const FeaturesPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF121212),
        elevation: 0,
        title: const Text(
          'Features',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeader(),
            const SizedBox(height: 32),
            _buildFeatureCategories(),
            const SizedBox(height: 32),
            _buildAIFeatures(),
            const SizedBox(height: 32),
            _buildTradingFeatures(),
            const SizedBox(height: 32),
            _buildAnalysisFeatures(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Powerful Features',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 8),
        Text(
          'Discover all the tools and features available to help you make better trading decisions',
          style: TextStyle(
            color: Colors.grey,
            fontSize: 16,
          ),
        ),
      ],
    );
  }

  Widget _buildFeatureCategories() {
    return Row(
      children: [
        Expanded(
          child: _buildCategoryCard(
            'AI & ML',
            Icons.psychology,
            'Advanced artificial intelligence and machine learning capabilities',
            VesternTheme.primaryPurple,
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: _buildCategoryCard(
            'Trading',
            Icons.show_chart,
            'Comprehensive trading tools and analytics',
            VesternTheme.accentTeal,
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: _buildCategoryCard(
            'Analysis',
            Icons.analytics,
            'In-depth market and portfolio analysis',
            Colors.amber,
          ),
        ),
      ],
    );
  }

  Widget _buildCategoryCard(
    String title,
    IconData icon,
    String description,
    Color color,
  ) {
    return VesternCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(
            icon,
            size: 32,
            color: color,
          ),
          const SizedBox(height: 16),
          Text(
            title,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            description,
            style: const TextStyle(
              color: Colors.grey,
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAIFeatures() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'AI & Machine Learning',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        GridView.count(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisCount: 2,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
          childAspectRatio: 1.5,
          children: [
            _buildFeatureCard(
              'Predictive Analytics',
              'AI-powered market predictions and trend analysis',
              Icons.trending_up,
              VesternTheme.primaryPurple,
            ),
            _buildFeatureCard(
              'Smart Alerts',
              'Intelligent notifications based on market patterns',
              Icons.notifications_active,
              VesternTheme.primaryPurple,
            ),
            _buildFeatureCard(
              'Sentiment Analysis',
              'Real-time market sentiment tracking',
              Icons.psychology,
              VesternTheme.primaryPurple,
            ),
            _buildFeatureCard(
              'Portfolio Optimization',
              'AI-driven portfolio recommendations',
              Icons.auto_awesome,
              VesternTheme.primaryPurple,
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildTradingFeatures() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Trading Tools',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        GridView.count(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisCount: 2,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
          childAspectRatio: 1.5,
          children: [
            _buildFeatureCard(
              'Real-time Trading',
              'Execute trades with zero latency',
              Icons.flash_on,
              VesternTheme.accentTeal,
            ),
            _buildFeatureCard(
              'Advanced Orders',
              'Complex order types and strategies',
              Icons.assignment,
              VesternTheme.accentTeal,
            ),
            _buildFeatureCard(
              'Risk Management',
              'Automated stop-loss and take-profit',
              Icons.security,
              VesternTheme.accentTeal,
            ),
            _buildFeatureCard(
              'Paper Trading',
              'Practice with virtual currency',
              Icons.school,
              VesternTheme.accentTeal,
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildAnalysisFeatures() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Analysis Tools',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        GridView.count(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisCount: 2,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
          childAspectRatio: 1.5,
          children: [
            _buildFeatureCard(
              'Technical Analysis',
              'Advanced charting and indicators',
              Icons.analytics,
              Colors.amber,
            ),
            _buildFeatureCard(
              'Fundamental Data',
              'Company financials and metrics',
              Icons.assessment,
              Colors.amber,
            ),
            _buildFeatureCard(
              'Market Scanner',
              'Custom screening and filtering',
              Icons.search,
              Colors.amber,
            ),
            _buildFeatureCard(
              'Performance Analytics',
              'Detailed trading performance metrics',
              Icons.bar_chart,
              Colors.amber,
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildFeatureCard(
    String title,
    String description,
    IconData icon,
    Color color,
  ) {
    return VesternCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            icon,
            size: 24,
            color: color,
          ),
          const SizedBox(height: 12),
          Text(
            title,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            description,
            style: const TextStyle(
              color: Colors.grey,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }
}