"use client";

import { Button } from "@midday/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FooterCTA() {
  const pathname = usePathname();

  if (pathname.includes("pitch")) {
    return null;
  }

  return (
    <div className="border border-border md:container text-center px-10 py-14 mx-4 md:mx-auto md:px-24 md:py-20 mb-32 mt-24 flex items-center flex-col bg-[#F2F1EF] dark:bg-[#121212]">
      <span className="text-6xl	md:text-8xl font-medium text-primary dark:text-white">
        Easy Invest through Vestern
      </span>
      <p className="text-[#878787] mt-6">
        Investing, Portfolio, Market Overview, Summarized Tech News & More <br /> Assistant.
      </p>

      <div className="mt-10 md:mb-8">
        <div className="flex items-center space-x-4">
          <Link
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border border-primary h-12 px-6 dark:border-white border-black text-primary hidden md:block"
            >
              Home
            </Button>
          </Link>

          <a href="https://app.vestern.com/Subscribe">
            <Button className="h-12 px-5 bg-black text-white dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80">
              Start free trial
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
