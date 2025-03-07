import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:vestern/config/theme.dart';

class StockChart extends StatelessWidget {
  final List<FlSpot> spots;
  final bool isPositive;
  final double? minY;
  final double? maxY;
  final bool showGrid;
  final bool showBorder;
  final bool showLabels;
  final double height;

  const StockChart({super.key, 
    required this.spots,
    this.isPositive = true,
    this.minY,
    this.maxY,
    this.showGrid = false,
    this.showBorder = false,
    this.showLabels = false,
    this.height = 200,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: height,
      child: LineChart(
        LineChartData(
          gridData: FlGridData(
            show: showGrid,
            drawVerticalLine: showGrid,
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
          titlesData: FlTitlesData(
            show: showLabels,
            bottomTitles: AxisTitles(
              sideTitles: SideTitles(showTitles: showLabels),
            ),
            leftTitles: AxisTitles(
              sideTitles: SideTitles(showTitles: showLabels),
            ),
            rightTitles: const AxisTitles(
              sideTitles: SideTitles(showTitles: false),
            ),
            topTitles: const AxisTitles(
              sideTitles: SideTitles(showTitles: false),
            ),
          ),
          borderData: FlBorderData(
            show: showBorder,
            border: Border.all(color: Colors.grey.withOpacity(0.2)),
          ),
          minX: 0,
          maxX: spots.length.toDouble() - 1,
          minY: minY ?? spots.map((e) => e.y).reduce((a, b) => a < b ? a : b) * 0.95,
          maxY: maxY ?? spots.map((e) => e.y).reduce((a, b) => a > b ? a : b) * 1.05,
          lineBarsData: [
            LineChartBarData(
              spots: spots,
              isCurved: true,
              color: isPositive ? VesternTheme.accentTeal : Colors.redAccent,
              barWidth: 2,
              isStrokeCapRound: true,
              dotData: const FlDotData(show: false),
              belowBarData: BarAreaData(
                show: true,
                color: (isPositive ? VesternTheme.accentTeal : Colors.redAccent).withOpacity(0.1),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
