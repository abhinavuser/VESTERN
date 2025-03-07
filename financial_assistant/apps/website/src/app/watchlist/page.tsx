"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@midday/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface WatchlistItem {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
  addedDate: string;
}

function WatchlistPage() {
  const { user } = useAuth();
  const [watchlistData, setWatchlistData] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<keyof WatchlistItem>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (user) {
      fetchWatchlistData();
    }
  }, [user]);

  const fetchWatchlistData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/watchlist', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch watchlist data');

      const data = await response.json();
      setWatchlistData(data);
    } catch (error) {
      console.error('Error fetching watchlist data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (column: keyof WatchlistItem) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedData = [...watchlistData].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
    
    return sortOrder === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  if (isLoading) {
    return (
      <div className="container max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-[1400px] mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="mt-12 font-bold text-4xl md:text-5xl mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Watchlist
        </h1>

        {watchlistData.length === 0 ? (
          <div className="text-center py-16 bg-black rounded-xl border border-gray-800">
            <p className="text-gray-400 mb-4">Your watchlist is empty</p>
            <Button 
              variant="outline" 
              className="px-6 py-2 hover:bg-black/10"
            >
              Browse Market
            </Button>
          </div>
        ) : (
          <div className="bg-black rounded-xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black">
                  <tr>
                    <th 
                      className="text-left p-4 text-gray-400 cursor-pointer hover:text-white"
                      onClick={() => handleSort("name")}
                    >
                      Asset
                    </th>
                    <th 
                      className="text-right p-4 text-gray-400 cursor-pointer hover:text-white"
                      onClick={() => handleSort("price")}
                    >
                      Price
                    </th>
                    <th 
                      className="text-right p-4 text-gray-400 cursor-pointer hover:text-white"
                      onClick={() => handleSort("change24h")}
                    >
                      24h Change
                    </th>
                    <th 
                      className="text-right p-4 text-gray-400 cursor-pointer hover:text-white"
                      onClick={() => handleSort("volume")}
                    >
                      Volume
                    </th>
                    <th 
                      className="text-right p-4 text-gray-400 cursor-pointer hover:text-white"
                      onClick={() => handleSort("marketCap")}
                    >
                      Market Cap
                    </th>
                    <th className="text-right p-4 text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((item) => (
                    <tr key={item.id} className="border-t border-gray-800 hover:bg-gray-800/50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-white">{item.symbol}</div>
                          <div className="text-sm text-gray-400">{item.name}</div>
                        </div>
                      </td>
                      <td className="p-4 text-right text-white">
                        ₹{item.price.toLocaleString('en-IN', { 
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </td>
                      <td className={`p-4 text-right ${item.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {item.change24h >= 0 ? '+' : ''}{item.change24h.toFixed(2)}%
                      </td>
                      <td className="p-4 text-right text-white">
                        {item.volume.toLocaleString('en-IN')}
                      </td>
                      <td className="p-4 text-right text-white">
                        ₹{item.marketCap.toLocaleString('en-IN')}
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant="outline"
                          className="px-3 py-1 hover:bg-black/10"
                          onClick={() => {
                            // Handle remove from watchlist
                          }}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button 
            variant="outline" 
            className="px-6 py-2 hover:bg-black/10"
          >
            Add New Asset
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default WatchlistPage;