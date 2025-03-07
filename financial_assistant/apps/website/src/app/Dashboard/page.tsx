"use client";

import { useEffect, useState } from 'react';
import { Card } from "@/components/card";
import { 
  DollarSign, 
  TrendingUp, 
  Activity, 
  ArrowUpRight,
  Calendar,
  User
} from "lucide-react";
import { useTheme } from "next-themes";
import dynamic from 'next/dynamic';
import type { Portfolio, Transaction, Watchlist } from '@/types';

// Dynamic imports for Recharts
const ResponsiveContainer = dynamic(() => import('recharts').then((mod) => mod.ResponsiveContainer), { ssr: false });
const LineChart = dynamic(() => import('recharts').then((mod) => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then((mod) => mod.Line), { ssr: false });
const XAxis = dynamic(() => import('recharts').then((mod) => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then((mod) => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then((mod) => mod.Tooltip), { ssr: false });

interface Portfolio {
  id: number;
  account_number: string;
  stock_symbol: string;
  shares: number;
  average_price: string | number; // Could be either string or number from DB
  last_updated: string;
}

interface Transaction {
  transaction_id: number;
  account_number: string;
  transaction_type: 'BUY' | 'SELL';
  stock_symbol: string;
  shares: number;
  price_per_share: string | number;
  total_amount: string | number;
  transaction_date: string;
  status: string;
}
export default function DashboardPage() {
  const { theme } = useTheme();
  const [currentDateTime, setCurrentDateTime] = useState<string>('');
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [watchlist, setWatchlist] = useState<Watchlist[]>([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [dailyReturn, setDailyReturn] = useState({ value: 0, percentage: 0 });
  const [totalReturn, setTotalReturn] = useState({ value: 0, percentage: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calculatePortfolioMetrics = (portfolioData: Portfolio[]) => {
    const totalValue = portfolioData.reduce(
      (sum, item) => sum + (item.shares * parseFloat(item.average_price.toString())), 
      0
    );
    setPortfolioValue(totalValue);
    setDailyReturn({ value: totalValue * 0.015, percentage: 1.5 });
    setTotalReturn({ value: totalValue * 0.25, percentage: 25 });
  };

  const updateDateTime = () => {
    const now = new Date();
    const formatted = now.toISOString().slice(0, 19).replace('T', ' ');
    setCurrentDateTime(formatted);
  };

  useEffect(() => {
    fetchData();
    updateDateTime();
    // Update time every second
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [portfolioRes, transactionsRes, watchlistRes] = await Promise.all([
        fetch('/api/portfolio'),
        fetch('/api/transactions'),
        fetch('/api/watchlist')
      ]);

      if (!portfolioRes.ok || !transactionsRes.ok || !watchlistRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const portfolioData = await portfolioRes.json();
      const transactionsData = await transactionsRes.json();
      const watchlistData = await watchlistRes.json();

      setPortfolio(portfolioData);
      setTransactions(transactionsData);
      setWatchlist(watchlistData);
      calculatePortfolioMetrics(portfolioData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error instanceof Error ? error.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black-950 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black-950 flex items-center justify-center flex-col">
        <div className="text-red-400 mb-4">{error}</div>
        <button
          onClick={() => fetchData()}
          className="px-4 py-2 bg-black-500 text-white rounded hover:bg-black-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black-950">
      {/* Header with DateTime and User Info */}
      <div className="bg-black-900 border-b border-black-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-400">{currentDateTime} UTC</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-400">PrajanS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 bg-black-900 border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Portfolio Value</p>
                  <h2 className="text-xl font-bold">
                    ₹{portfolioValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </h2>
                </div>
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </Card>

            <Card className="p-4 bg-black-900 border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Today's Return</p>
                  <h2 className="text-xl font-bold">
                    ₹{dailyReturn.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </h2>
                </div>
                <div className="flex items-center text-green-500">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="ml-1 text-sm">{dailyReturn.percentage}%</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-black-900 border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Return</p>
                  <h2 className="text-xl font-bold">
                    ₹{totalReturn.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </h2>
                </div>
                <div className="flex items-center text-green-500">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="ml-1 text-sm">{totalReturn.percentage}%</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-black-900 border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Active Positions</p>
                  <h2 className="text-xl font-bold">{portfolio.length}</h2>
                </div>
                <Activity className="h-6 w-6 text-gray-400" />
              </div>
            </Card>
          </div>

          {/* Portfolio Chart */}
          <Card className="p-4 bg-black-900 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Portfolio Performance</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={transactions}>
                  <XAxis 
                    dataKey="transaction_date" 
                    stroke="#4B5563"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis 
                    stroke="#4B5563"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '4px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price_per_share"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Portfolio Holdings and Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Portfolio Holdings Table */}
            <Card className="bg-black-900 border border-gray-800">
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold">Portfolio Holdings</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black-800/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Symbol</th>
                      <th className="text-right p-4 text-sm font-medium text-gray-400">Shares</th>
                      <th className="text-right p-4 text-sm font-medium text-gray-400">Avg Price</th>
                      <th className="text-right p-4 text-sm font-medium text-gray-400">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                  {portfolio.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-800/30">
                      <td className="p-4">{item.stock_symbol}</td>
                      <td className="p-4 text-right">{item.shares}</td>
                      <td className="p-4 text-right">
                        ₹{parseFloat(item.average_price.toString()).toFixed(2)}
                      </td>
                      <td className="p-4 text-right">
                        ₹{(item.shares * parseFloat(item.average_price.toString())).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Recent Transactions Table */}
            <Card className="bg-black-900 border border-gray-800">
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold">Recent Transactions</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black-800/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Date</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Type</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Symbol</th>
                      <th className="text-right p-4 text-sm font-medium text-gray-400">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                  {transactions.slice(0, 5).map((tx) => (
                    <tr key={tx.transaction_id} className="hover:bg-gray-800/30">
                      <td className="p-4 text-sm">
                        {new Date(tx.transaction_date).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full
                          ${tx.transaction_type === 'BUY' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                          {tx.transaction_type}
                        </span>
                      </td>
                      <td className="p-4 text-sm">{tx.stock_symbol}</td>
                      <td className="p-4 text-right text-sm">
                        ₹{parseFloat(tx.total_amount.toString()).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Watchlist */}
          <Card className="bg-black-900 border border-gray-800">
            <div className="p-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold">Watchlist</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {watchlist.map((item) => (
                  <div 
                    key={item.id}
                    className="p-4 bg-gray-800/30 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{item.stock_symbol}</h3>
                      <p className="text-xs text-gray-400">
                        {new Date(item.added_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}