import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import pool from '@/lib/db';

export async function GET() {
  try {
    const sessionToken = cookies().get('session')?.value;
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For testing purposes, return mock data
    // Replace this with actual database query when ready
    const mockData = [
      {
        id: 1,
        symbol: "AAPL",
        name: "Apple Inc.",
        price: 175.84,
        change24h: 2.34,
        volume: 98745632,
        marketCap: 2897456321789,
        addedDate: new Date().toISOString()
      },
      {
        id: 2,
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        price: 2745.63,
        change24h: -1.23,
        volume: 3456789,
        marketCap: 1897456321789,
        addedDate: new Date().toISOString()
      }
    ];

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Watchlist fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch watchlist' },
      { status: 500 }
    );
  }
}