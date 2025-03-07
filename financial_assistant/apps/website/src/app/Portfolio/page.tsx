"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@midday/ui/button";
import { useAuth } from "@/contexts/AuthContext";

type PortfolioAsset = {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  change24h: number;
  value: number;
  allocation: number;
  type: "Stocks" | "Crypto" | "Mutual Funds" | "ETFs";
};

type PortfolioSummary = {
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  totalGain: number;
  totalGainPercent: number;
};

const generatePortfolioData = () => {
  const assets: PortfolioAsset[] = [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries",
      quantity: 100,
      avgPrice: 2450.75,
      currentPrice: 2567.30,
      change24h: 1.25,
      value: 256730,
      allocation: 25.67,
      type: "Stocks"
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      quantity: 0.5,
      avgPrice: 42000,
      currentPrice: 44500,
      change24h: 2.35,
      value: 22250,
      allocation: 12.34,
      type: "Crypto"
    },
    {
      symbol: "HDFC",
      name: "HDFC Bank",
      quantity: 150,
      avgPrice: 1575.50,
      currentPrice: 1623.45,
      change24h: -0.75,
      value: 243517.50,
      allocation: 18.45,
      type: "Stocks"
    },
    // Add more assets as needed
  ];

  const summary: PortfolioSummary = {
    totalValue: assets.reduce((acc, asset) => acc + asset.value, 0),
    dayChange: 4521.75,
    dayChangePercent: 1.23,
    totalGain: 15234.50,
    totalGainPercent: 5.67
  };

  return { assets, summary };
};

export default function Page() {
  const [portfolioData, setPortfolioData] = useState<{
    assets: PortfolioAsset[];
    summary: PortfolioSummary;
  }>({ assets: [], summary: {} as PortfolioSummary });
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("1D");

  useEffect(() => {
    setPortfolioData(generatePortfolioData());
  }, []);

  return (
    <div className="container max-w-[1400px] mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="mt-12 font-bold text-4xl md:text-5xl mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Portfolio Overview
        </h1>
        
        {/* Portfolio Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-gray-400 text-sm mb-2">Total Value</h3>
            <p className="text-2xl font-bold text-white">
              ₹{portfolioData.summary.totalValue?.toLocaleString('en-IN')}
            </p>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-gray-400 text-sm mb-2">24h Change</h3>
            <p className={`text-2xl font-bold ${portfolioData.summary.dayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {portfolioData.summary.dayChange >= 0 ? '+' : ''}
              {portfolioData.summary.dayChange?.toLocaleString('en-IN')} 
              <span className="text-lg ml-1">
                ({portfolioData.summary.dayChangePercent}%)
              </span>
            </p>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-gray-400 text-sm mb-2">Total Gain/Loss</h3>
            <p className={`text-2xl font-bold ${portfolioData.summary.totalGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {portfolioData.summary.totalGain >= 0 ? '+' : ''}
              {portfolioData.summary.totalGain?.toLocaleString('en-IN')}
              <span className="text-lg ml-1">
                ({portfolioData.summary.totalGainPercent}%)
              </span>
            </p>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h3 className="text-gray-400 text-sm mb-2">Last Updated</h3>
            <p className="text-xl font-medium text-white">
              {new Date().toLocaleString('en-US', { 
                timeZone: 'UTC',
                hour12: false 
              })} UTC
            </p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-8">
          {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? "default" : "outline"}
              onClick={() => setSelectedTimeframe(timeframe)}
              className="px-4 py-2"
            >
              {timeframe}
            </Button>
          ))}
        </div>

        {/* Assets Table */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left p-4 text-gray-400">Asset</th>
                <th className="text-right p-4 text-gray-400">Price</th>
                <th className="text-right p-4 text-gray-400">24h Change</th>
                <th className="text-right p-4 text-gray-400">Holdings</th>
                <th className="text-right p-4 text-gray-400">Value</th>
                <th className="text-right p-4 text-gray-400">Allocation</th>
              </tr>
            </thead>
            <tbody>
              {portfolioData.assets.map((asset) => (
                <tr key={asset.symbol} className="border-t border-gray-800 hover:bg-gray-800/50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-white">{asset.symbol}</div>
                      <div className="text-sm text-gray-400">{asset.name}</div>
                    </div>
                  </td>
                  <td className="p-4 text-right text-white">
                    ₹{asset.currentPrice.toLocaleString('en-IN')}
                  </td>
                  <td className={`p-4 text-right ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                  </td>
                  <td className="p-4 text-right text-white">
                    {asset.quantity}
                  </td>
                  <td className="p-4 text-right text-white">
                    ₹{asset.value.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-white">{asset.allocation}%</span>
                      <div className="w-20 h-1.5 bg-gray-700 rounded">
                        <div 
                          className="h-full rounded bg-blue-400"
                          style={{ width: `${asset.allocation}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Asset Button */}
        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="px-6 py-2">
            Add New Asset
          </Button>
        </div>
      </motion.div>
    </div>
  );
}