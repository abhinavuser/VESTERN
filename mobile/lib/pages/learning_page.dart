import 'package:flutter/material.dart';
import 'package:vestern/config/theme.dart';
import 'package:vestern/widgets/common/vestern_card.dart';

class LearningPage extends StatelessWidget {
  const LearningPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF121212),
        elevation: 0,
        title: const Text(
          'Learning Center',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.bookmarks_outlined),
            onPressed: () {
              // Show saved courses
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
            _buildFeaturedCourse(),
            const SizedBox(height: 24),
            _buildCourseCategories(),
            const SizedBox(height: 24),
            _buildPopularCourses(),
            const SizedBox(height: 24),
            _buildLearningPaths(),
          ],
        ),
      ),
    );
  }

  Widget _buildFeaturedCourse() {
    return VesternCard(
      color: VesternTheme.primaryPurple.withOpacity(0.1),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: VesternTheme.primaryPurple,
              borderRadius: BorderRadius.circular(20),
            ),
            child: const Text(
              'Featured Course',
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 12,
              ),
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            'AI-Powered Trading Strategies',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Learn how to leverage artificial intelligence for smarter trading decisions',
            style: TextStyle(
              color: Colors.grey[300],
              fontSize: 16,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              _buildCourseInfo(Icons.access_time, '8 weeks'),
              const SizedBox(width: 24),
              _buildCourseInfo(Icons.bar_chart, 'Intermediate'),
              const SizedBox(width: 24),
              _buildCourseInfo(Icons.people, '2.5k students'),
            ],
          ),
          const SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () {
                // Handler
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: VesternTheme.primaryPurple,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: const Text(
                'Start Learning',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCourseInfo(IconData icon, String text) {
    return Row(
      children: [
        Icon(
          icon,
          size: 16,
          color: Colors.grey,
        ),
        const SizedBox(width: 8),
        Text(
          text,
          style: const TextStyle(
            color: Colors.grey,
            fontSize: 14,
          ),
        ),
      ],
    );
  }

  Widget _buildCourseCategories() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Categories',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              _buildCategoryCard('Technical Analysis', Icons.analytics, 24),
              _buildCategoryCard('Fundamental Analysis', Icons.article, 18),
              _buildCategoryCard('Risk Management', Icons.security, 12),
              _buildCategoryCard('AI Trading', Icons.psychology, 8),
              _buildCategoryCard('Market Basics', Icons.school, 15),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildCategoryCard(String title, IconData icon, int courses) {
    return Container(
      width: 200,
      margin: const EdgeInsets.only(right: 16),
      child: VesternCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(
              icon,
              size: 32,
              color: VesternTheme.primaryPurple,
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
              '$courses courses',
              style: const TextStyle(
                color: Colors.grey,
                fontSize: 14,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPopularCourses() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Popular Courses',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        _buildCourseList([
          {
            'title': 'Basics of Stock Market',
            'instructor': 'Sarah Johnson',
            'duration': '4 weeks',
            'level': 'Beginner',
            'rating': 4.8,
          },
          {
            'title': 'Advanced Technical Analysis',
            'instructor': 'Michael Chen',
            'duration': '6 weeks',
            'level': 'Advanced',
            'rating': 4.9,
          },
          {
            'title': 'Risk Management Strategies',
            'instructor': 'David Wilson',
            'duration': '3 weeks',
            'level': 'Intermediate',
            'rating': 4.7,
          },
        ]),
      ],
    );
  }

  Widget _buildCourseList(List<Map<String, dynamic>> courses) {
    return Column(
      children: courses.map((course) {
        return VesternCard(
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      course['title'],
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'By ${course['instructor']}',
                      style: const TextStyle(
                        color: Colors.grey,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        _buildCourseInfo(Icons.access_time, course['duration']),
                        const SizedBox(width: 16),
                        _buildCourseInfo(Icons.bar_chart, course['level']),
                        const SizedBox(width: 16),
                        Row(
                          children: [
                            const Icon(
                              Icons.star,
                              size: 16,
                              color: Colors.amber,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              '${course['rating']}',
                              style: const TextStyle(
                                color: Colors.grey,
                                fontSize: 14,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const Icon(
                Icons.chevron_right,
                color: Colors.grey,
              ),
            ],
          ),
        );
      }).toList(),
    );
  }

  Widget _buildLearningPaths() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Learning Paths',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              _buildLearningPathCard(
                'Become a Day Trader',
                'Master day trading strategies and risk management',
                '12 weeks',
                8,
              ),
              _buildLearningPathCard(
                'AI Trading Expert',
                'Learn to build and implement AI trading systems',
                '16 weeks',
                10,
              ),
              _buildLearningPathCard(
                'Portfolio Manager',
                'Develop skills for professional portfolio management',
                '14 weeks',
                9,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildLearningPathCard(
    String title,
    String description,
    String duration,
    int courses,
  ) {
    return Container(
      width: 300,
      margin: const EdgeInsets.only(right: 16),
      child: VesternCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
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
            const SizedBox(height: 16),
            Row(
              children: [
                _buildCourseInfo(Icons.access_time, duration),
                const SizedBox(width: 16),
                _buildCourseInfo(Icons.book, '$courses courses'),
              ],
            ),
            const SizedBox(height: 16),
            LinearProgressIndicator(
              value: 0.0,
              backgroundColor: Colors.grey[800],
              valueColor: const AlwaysStoppedAnimation<Color>(VesternTheme.primaryPurple),
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  // Start learning path
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: VesternTheme.primaryPurple,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: const Text(
                  'Start Path',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}