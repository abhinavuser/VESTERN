"use client";

import { Button } from "@midday/ui/button";
import Link from "next/link";
import { HeroImage } from "./hero-image";
import { Metrics } from "./metrics";
import { WordAnimation } from "./word-animation";
import { useEffect, useState } from "react";
import { User } from "@/types";

export function Hero() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace('T', ' ').slice(0, 19));
    }, 1000);

    // Fetch user data if logged in
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user');
        if (response.ok) {
          const userData = await response.json();
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mt-[60px] lg:mt-[180px] min-h-[530px] relative lg:h-[calc(100vh-300px)]">
      {/* User Info Bar */}
      <div className="absolute top-0 right-0 flex items-center space-x-4 p-4 text-sm text-gray-400">
        <div>
          {currentTime} UTC
        </div>
        {currentUser && (
          <div>
            Welcome, {currentUser.username}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <h2 className="mt-6 md:mt-10 max-w-[580px] text-gray-800 dark:text-gray-200 leading-tight text-[24px] md:text-[36px] font-sans font-semibold tracking-tight pl-4 md:pl-6">
          <span className="text-[48px] md:text-[108px] font-extrabold">VESTERN</span><br />

          <span className="text-[20px] md:text-[32px] font-small">
            Your Future, Engineered with AI and Human Expertise for Smarter Investing.<br />
            Made for <WordAnimation/>.
          </span>
        </h2>

        <div className="mt-8 md:mt-10 pl-4 md:pl-6">
          <div className="flex items-center space-x-4">
            {!currentUser ? (
              <a href="/signin">
                <Button className="h-11 px-5">Sign In</Button>
              </a>
            ) : (
              <a href="/portfolio">
                <Button className="h-11 px-5">View Portfolio</Button>
              </a>
            )}
          </div>
        </div>

        <p className="text-xs text-[#707070] mt-4 font-mono pl-4 md:pl-6">
          {!currentUser ? "START INVESTING FROM TODAY" : "WELCOME TO VESTERN"}
        </p>
      </div>

      <HeroImage />
      <Metrics />
    </section>
  );
}