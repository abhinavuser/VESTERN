"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type NewsItem = {
  id: string;
  name: string;
  avatarUrl: string;
  handle: string;
  verified: boolean;
  quote: string;
  timestamp: string;
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
}: {
  items: NewsItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
}) => {
  const [duplicatedItems, setDuplicatedItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    setDuplicatedItems([...items, ...items]);
  }, [items]);

  const getSpeedValue = (speedSetting: string) => {
    const speedMap = {
      slow: 40,
      normal: 20,
      fast: 10,
    };
    return speedMap[speedSetting as keyof typeof speedMap] || speedMap.normal;
  };

  return (
    <div className="relative m-auto w-full overflow-hidden bg-transparent">
      <motion.div
        className="flex gap-4 py-4"
        style={{
          width: "fit-content",
        }}
        animate={{
          x: direction === "left" 
            ? ["0%", "-50%"] 
            : ["-50%", "0%"],
        }}
        transition={{
          duration: getSpeedValue(speed),
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className={`relative flex-shrink-0 w-[350px] rounded-xl bg-white/5 p-4 backdrop-blur-sm hover:bg-white/10 transition-colors duration-200 group ${
              pauseOnHover ? "hover:[animation-play-state:paused]" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <img
                src={item.avatarUrl}
                alt={item.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-white flex items-center gap-1">
                  {item.name}
                  {item.verified && (
                    <svg
                      className="w-4 h-4 text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" />
                    </svg>
                  )}
                </h3>
                <p className="text-sm text-gray-400">{item.handle}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-300 leading-relaxed">
              {item.quote}
            </p>
            <time className="block mt-2 text-xs text-gray-500">
              {new Date(item.timestamp).toLocaleString()}
            </time>
          </div>
        ))}
      </motion.div>
    </div>
  );
}