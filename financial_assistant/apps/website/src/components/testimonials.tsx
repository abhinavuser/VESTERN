"use client";

import { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./infinite-moving-cards";

type NewsItem = {
  id: string;
  category: string;
  headline: string;
  imageUrl: string;
  timestamp: string;
};

const generateDummyNews = (): NewsItem[] => {
  const newsCategories = [
    { name: "MARKETS", color: "text-blue-400" },
    { name: "STOCKS", color: "text-green-400" },
    { name: "FOREX", color: "text-yellow-400" },
    { name: "CRYPTO", color: "text-orange-400" },
    { name: "ECONOMY", color: "text-purple-400" }
  ];
  
  const newsData = [
    {
      headline: "S&P 500 reaches new all-time high, surpassing 5,200 points",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&q=80"
    },
    {
      headline: "Bitcoin surges past $100,000 as institutional adoption grows",
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=500&q=80"
    },
    {
      headline: "Federal Reserve maintains interest rates, signals future cuts",
      image: "https://images.unsplash.com/photo-1554244933-d876deb6b2ff?w=500&q=80"
    },
    {
      headline: "Tesla announces revolutionary new battery technology",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500&q=80"
    },
    {
      headline: "Amazon's AI division reports breakthrough in quantum computing",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80"
    },
    {
      headline: "Gold prices rally amid global economic uncertainty",
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=500&q=80"
    },
    {
      headline: "JPMorgan launches new blockchain payment system",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=500&q=80"
    },
    {
      headline: "European markets respond positively to ECB policy changes",
      image: "https://images.unsplash.com/photo-1520695723220-9c21c6f33f1f?w=500&q=80"
    }
  ];

  return newsData.map((news, index) => ({
    id: `news-${index}`,
    category: newsCategories[index % newsCategories.length].name,
    headline: news.headline,
    imageUrl: news.image,
    timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
  }));
};

export function Testimonials() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    const updateNews = () => {
      setNewsItems(generateDummyNews());
    };

    updateNews();
    const interval = setInterval(updateNews, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-transparent py-2">
      <h3 className="text-2xl mb-4 font-bold text-center text-white">
        Financial Markets Live Updates
      </h3>
      <InfiniteMovingCards
        items={newsItems}
        direction="left"
        speed="slow"
      />
    </div>
  );
}