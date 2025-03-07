import 'package:intl/intl.dart';

class Formatters {
  static final currencyFormatter = NumberFormat.currency(
    symbol: '\$',
    decimalDigits: 2,
  );

  static final percentFormatter = NumberFormat.percentPattern();
  
  static final compactFormatter = NumberFormat.compact();

  static String formatCurrency(double value) {
    return currencyFormatter.format(value);
  }

  static String formatPercent(double value) {
    return percentFormatter.format(value / 100);
  }

  static String formatCompact(double value) {
    return compactFormatter.format(value);
  }

  static String formatChange(double value, {bool showSign = true}) {
    final sign = value >= 0 ? (showSign ? '+' : '') : '';
    return '$sign${currencyFormatter.format(value)}';
  }

  static String formatPercentChange(double value) {
    final sign = value >= 0 ? '+' : '';
    return '$sign${value.toStringAsFixed(2)}%';
  }
}