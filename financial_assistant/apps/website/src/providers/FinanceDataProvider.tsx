"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { Portfolio, Transaction, Watchlist } from '@/types';

interface FinanceData {
  portfolio: Portfolio[];
  transactions: Transaction[];
  watchlist: Watchlist[];
  portfolioValue: number;
  dailyReturn: { value: number; percentage: number };
  totalReturn: { value: number; percentage: number };
  currentTime: string;
  currentUser: string;
  loading: boolean;
}

const FinanceContext = createContext<FinanceData>({} as FinanceData);

export function FinanceDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<FinanceData>({
    portfolio: [],
    transactions: [],
    watchlist: [],
    portfolioValue: 0,
    dailyReturn: { value: 0, percentage: 0 },
    totalReturn: { value: 0, percentage: 0 },
    currentTime: '',
    currentUser: 'PrajanS',
    loading: true
  });

  useEffect(() => {
    // Update time
    const updateTime = () => {
      const now = new Date();
      setData(prev => ({
        ...prev,
        currentTime: now.toISOString().replace('T', ' ').slice(0, 19)
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Fetch data
    fetchData();

    return () => clearInterval(timer);
  }, []);

  const fetchData = async () => {
    try {
      const [portfolioRes, transactionsRes, watchlistRes] = await Promise.all([
        fetch('/api/portfolio'),
        fetch('/api/transactions'),
        fetch('/api/watchlist')
      ]);

      const portfolioData = await portfolioRes.json();
      const transactionsData = await transactionsRes.json();
      const watchlistData = await watchlistRes.json();

      const totalValue = portfolioData.reduce(
        (sum: number, item: Portfolio) => sum + (item.quantity * item.avg_price),
        0
      );

      setData(prev => ({
        ...prev,
        portfolio: portfolioData,
        transactions: transactionsData,
        watchlist: watchlistData,
        portfolioValue: totalValue,
        dailyReturn: { value: totalValue * 0.015, percentage: 1.5 },
        totalReturn: { value: totalValue * 0.25, percentage: 25 },
        loading: false
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      setData(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <FinanceContext.Provider value={data}>
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinanceData = () => useContext(FinanceContext);