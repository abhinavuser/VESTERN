"use client";

import { useFinanceData } from '@/providers/FinanceDataProvider';

export function UserInfo() {
  const { currentUser, currentTime, portfolioValue } = useFinanceData();

  return (
    <div className="flex items-center gap-4 text-sm">
      <span className="text-gray-400">
        Welcome, <span className="text-gray-200">{currentUser}</span>
      </span>
      <span className="text-gray-400 font-mono">{currentTime} UTC</span>
      <span className="hidden lg:block text-gray-400">
        Portfolio: <span className="text-green-400">₹{portfolioValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
      </span>
    </div>
  );
}