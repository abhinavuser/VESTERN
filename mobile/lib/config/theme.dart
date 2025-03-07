import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class VesternTheme {
  static ThemeData darkTheme = ThemeData.dark().copyWith(
    scaffoldBackgroundColor: const Color(0xFF0A0A0A),
    primaryColor: const Color(0xFF1E1E1E),
    colorScheme: const ColorScheme.dark(
      primary: Color(0xFF6C63FF),
      secondary: Color(0xFF03DAC5),
      surface: Color(0xFF1E1E1E),
    ),
    textTheme: GoogleFonts.poppinsTextTheme(ThemeData.dark().textTheme),
    cardTheme: CardTheme(
      color: const Color(0xFF1E1E1E),
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
    ),
  );

  static const Color primaryPurple = Color(0xFF6C63FF);
  static const Color accentTeal = Color(0xFF03DAC5);
  static const Color backgroundDark = Color(0xFF0A0A0A);
  static const Color surfaceDark = Color(0xFF1E1E1E);
  static const Color textGrey = Color(0xFF9E9E9E);
}