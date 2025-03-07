"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type MarketData = {
  index: string;
  value: number;
  change: number;
  changePercent: number;
  volume: string;
  timestamp: string;
};

const generateMarketData = (): MarketData[] => [
  {
    index: "NIFTY 50",
    value: 22431.95,
    change: 267.95,
    changePercent: 1.21,
    volume: "142.5M",
    timestamp: new Date().toISOString()
  },
  {
    index: "SENSEX",
    value: 73651.35,
    change: 843.35,
    changePercent: 1.15,
    volume: "98.2M",
    timestamp: new Date().toISOString()
  },
  {
    index: "NIFTY BANK",
    value: 47289.55,
    change: -156.45,
    changePercent: -0.33,
    volume: "76.8M",
    timestamp: new Date().toISOString()
  },
  {
    index: "BSE SMALLCAP",
    value: 43267.85,
    change: 567.85,
    changePercent: 1.33,
    volume: "54.3M",
    timestamp: new Date().toISOString()
  }
];

export default function Page() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);

  useEffect(() => {
    const updateMarketData = () => {
      setMarketData(generateMarketData());
    };

    updateMarketData();
    const interval = setInterval(updateMarketData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container max-w-[1200px] mx-auto px-4 py-8">
      <h1 className="mt-8 font-bold text-center text-5xl mb-16 leading-snug bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
        Market Overview
      </h1>

      {/* Market Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {marketData.map((data) => (
          <motion.div
            key={data.index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-gray-600 transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-xl text-white">{data.index}</h3>
              <span className="text-sm text-gray-400">
                {new Date(data.timestamp).toLocaleTimeString()}
              </span>
            </div>
            
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-white">
                {data.value.toLocaleString('en-IN', { 
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
              <div className={`flex items-center ${data.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                <span className="text-lg font-semibold">
                  {data.change >= 0 ? '↑' : '↓'} {Math.abs(data.change).toFixed(2)}
                </span>
                <span className="ml-1 text-sm">
                  ({data.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Volume:</span>
                <span className="text-sm text-white font-medium">{data.volume}</span>
              </div>
              <div className="h-1 w-24 bg-black-700 rounded">
                <div 
                  className={`h-full rounded ${data.change >= 0 ? 'bg-black-400' : 'bg-white-400'}`}
                  style={{ width: `${Math.min(Math.abs(data.changePercent * 10), 100)}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Market Insights */}
      <div className="bg-gradient-to-br from-black-900 to-black-800 rounded-xl p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6">Market Insights</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-xl mb-2 text-gray-200">Market Trend</h3>
            <p className="text-gray-400">
              The Indian market showed strong momentum today with both NIFTY and SENSEX 
              reaching new heights. The rally was primarily led by IT and Banking sectors, 
              while small-cap stocks continued their bullish trend.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-xl mb-2 text-gray-200">Global Context</h3>
            <p className="text-gray-400">
              Global markets remain supportive with positive cues from Asian markets. 
              The US Federal Reserve's recent comments on potential rate cuts have boosted 
              investor sentiment across markets.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-xl mb-2 text-gray-200">Technical Outlook</h3>
            <p className="text-gray-400">
              Key technical indicators suggest a bullish trend in the short term. 
              The NIFTY's support levels are established at 22,000 while resistance 
              is seen at 22,800 levels.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-gray-400">
        Last Updated: {new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC
      </div>
    </div>
  );
}