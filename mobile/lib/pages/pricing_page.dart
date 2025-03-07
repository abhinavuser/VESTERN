import 'package:flutter/material.dart';
import 'package:vestern/config/theme.dart';
import 'package:vestern/widgets/common/vestern_card.dart';

class PricingPage extends StatelessWidget {
  const PricingPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF121212),
        elevation: 0,
        title: const Text(
          'Pricing',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Choose Your Plan',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            _buildPricingPlans(),
          ],
        ),
      ),
    );
  }

  Widget _buildPricingPlans() {
    return GridView.count(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisCount: 3,
      crossAxisSpacing: 16,
      children: [
        _buildPricingCard(
          'Basic',
          'Free',
          ['Market Data', 'Basic Analysis', 'Portfolio Tracking'],
          false,
        ),
        _buildPricingCard(
          'Pro',
          '\$29.99',
          ['Everything in Basic', 'Advanced Analytics', 'AI Insights'],
          true,
        ),
        _buildPricingCard(
          'Enterprise',
          'Custom',
          ['Everything in Pro', 'API Access', 'Custom Solutions'],
          false,
        ),
      ],
    );
  }

  Widget _buildPricingCard(
    String title,
    String price,
    List<String> features,
    bool isPrimary,
  ) {
    return VesternCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            price,
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: isPrimary ? VesternTheme.primaryPurple : null,
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: features.length,
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  child: Row(
                    children: [
                      const Icon(
                        Icons.check_circle,
                        color: VesternTheme.accentTeal,
                        size: 16,
                      ),
                      const SizedBox(width: 8),
                      Text(features[index]),
                    ],
                  ),
                );
              },
            ),
          ),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: isPrimary 
                    ? VesternTheme.primaryPurple 
                    : Colors.grey[800],
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              child: const Text('Get Started'),
            ),
          ),
        ],
      ),
    );
  }
}