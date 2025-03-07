"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Transaction {
  id: string;
  type: 'BUY' | 'SELL';
  symbol: string;
  quantity: number;
  price: number;
  total: number;
  timestamp: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    // Update UTC time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().slice(0, 19).replace('T', ' '));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Fetch transactions
    fetchTransactions();

    return () => clearInterval(timer);
  }, [filter]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`/api/transactions?filter=${filter}`);
      const data = await response.json();
      setTransactions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white">Transaction History</h1>
          <div className="text-gray-400 font-mono">
            {currentTime} UTC
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {['ALL', 'BUY', 'SELL', 'COMPLETED', 'PENDING'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${filter === filterOption 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                {filterOption}
              </button>
            ))}
          </div>
          <span className="text-sm text-gray-400">
            User: <span className="text-gray-200">PrajanS</span>
          </span>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Time (UTC)</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Symbol</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Quantity</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Price</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Total</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {transactions.map((tx) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {tx.timestamp}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${tx.type === 'BUY' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    {tx.symbol}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-300">
                    {tx.quantity.toFixed(8)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-300">
                    ₹{tx.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-300">
                    ₹{tx.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${tx.status === 'COMPLETED' ? 'bg-green-900/50 text-green-400' : 
                        tx.status === 'PENDING' ? 'bg-yellow-900/50 text-yellow-400' :
                        'bg-red-900/50 text-red-400'}`}>
                      {tx.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}