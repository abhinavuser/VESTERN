import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vestern/config/theme.dart';

import 'package:vestern/services/market_data_service.dart';
import 'package:vestern/pages/dashboard_page.dart';
import 'package:vestern/pages/market_overview_page.dart';
import 'package:vestern/pages/portfolio_page.dart';
import 'package:vestern/pages/stocks_page.dart';
import 'package:vestern/pages/pricing_page.dart';
import 'package:vestern/pages/learning_page.dart';
import 'package:vestern/pages/features_page.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => MarketDataProvider()),
        // Add other providers here
      ],
      child: const VesternApp(),
    ),
  );
}

class VesternApp extends StatelessWidget {
  const VesternApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Vestern',
      debugShowCheckedModeBanner: false,
      theme: VesternTheme.darkTheme,
      home: const VesternHomePage(),
    );
  }
}

class VesternHomePage extends StatefulWidget {
  const VesternHomePage({super.key});

  @override
  _VesternHomePageState createState() => _VesternHomePageState();
}

class _VesternHomePageState extends State<VesternHomePage> {
  int _selectedIndex = 0;
  
  final List<Widget> _pages = [
    const DashboardPage(),
    const MarketOverviewPage(),
    const PortfolioPage(),
    const StocksPage(),
    const PricingPage(),
    const LearningPage(),
    const FeaturesPage(),
  ];

  @override
  Widget build(BuildContext context) {
    final bool isDesktop = MediaQuery.of(context).size.width >= 1100;
    final bool isTablet = MediaQuery.of(context).size.width >= 600 && MediaQuery.of(context).size.width < 1100;

    return Scaffold(
      body: Row(
        children: [
          if (isDesktop || isTablet)
            NavigationRail(
              backgroundColor: const Color(0xFF121212),
              selectedIndex: _selectedIndex,
              onDestinationSelected: (int index) {
                setState(() {
                  _selectedIndex = index;
                });
              },
              labelType: NavigationRailLabelType.all,
              leading: Padding(
                padding: const EdgeInsets.symmetric(vertical: 24.0),
                child: Column(
                  children: [
                    Container(
                      height: 60,
                      width: 60,
                      decoration: const BoxDecoration(
                        color: VesternTheme.primaryPurple,
                        shape: BoxShape.circle,
                      ),
                      child: const Center(
                        child: Text(
                          'V',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 30,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    const Text(
                      'VESTERN',
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 1.2,
                      ),
                    ),
                  ],
                ),
              ),
              destinations: const [
                NavigationRailDestination(
                  icon: Icon(Icons.dashboard_outlined),
                  selectedIcon: Icon(Icons.dashboard),
                  label: Text('Dashboard'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.insights_outlined),
                  selectedIcon: Icon(Icons.insights),
                  label: Text('Market'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.account_balance_wallet_outlined),
                  selectedIcon: Icon(Icons.account_balance_wallet),
                  label: Text('Portfolio'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.show_chart_outlined),
                  selectedIcon: Icon(Icons.show_chart),
                  label: Text('Stocks'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.attach_money_outlined),
                  selectedIcon: Icon(Icons.attach_money),
                  label: Text('Pricing'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.school_outlined),
                  selectedIcon: Icon(Icons.school),
                  label: Text('Learning'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.stars_outlined),
                  selectedIcon: Icon(Icons.stars),
                  label: Text('Features'),
                ),
              ],
            ),
          Expanded(
            child: _pages[_selectedIndex],
          ),
        ],
      ),
      bottomNavigationBar: (!isDesktop && !isTablet) ? BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        backgroundColor: const Color(0xFF121212),
        selectedItemColor: VesternTheme.primaryPurple,
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.insights),
            label: 'Market',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.account_balance_wallet),
            label: 'Portfolio',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.show_chart),
            label: 'Stocks',
          ),
        ],
      ) : null,
    );
  }
}

// Market Data Provider
class MarketDataProvider with ChangeNotifier {
  final MarketDataService _marketDataService = MarketDataService();
  bool _isLoading = false;
  String? _error;

  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> refreshMarketData() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      // Implement market data refresh logic
      await _marketDataService.getMarketSummary();
      await _marketDataService.getTopStocks();
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}