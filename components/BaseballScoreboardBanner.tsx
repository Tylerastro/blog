"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export function BaseballScoreboardBanner() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc8Time = new Date(now.getTime() + 8 * 60 * 60 * 1000);
      const timeString = utc8Time.toISOString().substr(11, 8); // HH:MM:SS format
      setCurrentTime(timeString);
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4">
      <Card className="bg-card border-2 border-border shadow-lg overflow-hidden">
        {/* Main Scoreboard Header */}
        <div className="bg-primary text-primary-foreground p-3 sm:p-4 text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary-foreground rounded-full flex items-center justify-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full"></div>
            </div>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-wider">
              Tyler Field
            </h1>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary-foreground rounded-full flex items-center justify-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Scoreboard Display */}
        <div className="bg-foreground text-background p-3 sm:p-6">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            {/* Visitor Section */}
            <div className="space-y-1 sm:space-y-2">
              <div className="text-base font-bold tracking-widest opacity-80">
                VISITOR
              </div>
              <div className="bg-background text-foreground rounded px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg font-bold">
                POSTS
              </div>
            </div>

            {/* Home Section - Current Time */}
            <div className="space-y-1 sm:space-y-2">
              <div className="text-base font-bold tracking-widest opacity-80">
                TIME (UTC+8)
              </div>
              <div className="bg-accent text-accent-foreground rounded px-2 sm:px-4 py-2 sm:py-3 text-lg sm:text-xl md:text-2xl font-bold shadow-inner">
                {currentTime || "00:00:00"}
              </div>
            </div>

            {/* Inning Section */}
            <div className="space-y-1 sm:space-y-2">
              <div className="text-base font-bold tracking-widest opacity-80">
                INNING
              </div>
              <div className="bg-background text-foreground rounded px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg font-bold">
                ABOUT
              </div>
            </div>
          </div>

          {/* Score Display - Hidden on mobile, shown on larger screens */}
          <div className="mt-4 sm:mt-6 hidden sm:grid grid-cols-10 gap-1 text-center text-xs">
            <div className="font-bold opacity-80">TEAM</div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((inning) => (
              <div key={inning} className="font-bold opacity-80">
                {inning}
              </div>
            ))}

            <div className="bg-background text-foreground rounded px-2 py-1 font-bold text-sm">
              BLOG
            </div>
            {[0, 1, "", "", "", "", "", "", ""].map((score, index) => (
              <div
                key={index}
                className="bg-background text-foreground rounded px-2 py-1 font-bold"
              >
                {score}
              </div>
            ))}

            <div className="bg-background text-foreground rounded px-2 py-1 font-bold text-sm">
              LIFE
            </div>
            {[1, 0, "", "", "", "", "", "", ""].map((score, index) => (
              <div
                key={index}
                className="bg-background text-foreground rounded px-2 py-1 font-bold"
              >
                {score}
              </div>
            ))}
          </div>

          {/* Mobile Score Summary */}
          <div className="mt-4 sm:hidden grid grid-cols-2 gap-2 text-center">
            <div className="bg-background text-foreground rounded px-3 py-2 font-bold text-sm">
              BLOG: 8
            </div>
            <div className="bg-background text-foreground rounded px-3 py-2 font-bold text-sm">
              LIFE: 5
            </div>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="bg-secondary text-secondary-foreground p-2 sm:p-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center sm:justify-start">
              {/* BALL Count */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-green-600 dark:text-green-400">
                  BALL:
                </span>
                <div
                  className="flex gap-1"
                  role="img"
                  aria-label="2 balls out of 4"
                >
                  {[1, 2, 3].map((index) => (
                    <div
                      key={`ball-${index}`}
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-colors ${
                        index <= 2
                          ? "bg-green-500 border-green-500 shadow-sm"
                          : "bg-transparent border-green-400 opacity-60"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              {/* STRIKE Count */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-yellow-700">STRIKE:</span>
                <div
                  className="flex gap-1"
                  role="img"
                  aria-label="1 strike out of 3"
                >
                  {[1, 2].map((index) => (
                    <div
                      key={`strike-${index}`}
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-colors ${
                        index <= 1
                          ? "bg-yellow-500 border-yellow-500 shadow-sm"
                          : "bg-transparent border-yellow-500 opacity-80"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              {/* OUT Count */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-red-600 dark:text-red-400">
                  OUT:
                </span>
                <div
                  className="flex gap-1"
                  role="img"
                  aria-label="0 outs out of 3"
                >
                  {[1, 2].map((index) => (
                    <div
                      key={`out-${index}`}
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-colors ${
                        index <= 0
                          ? "bg-red-500 border-red-500 shadow-sm"
                          : "bg-transparent border-red-600 opacity-80"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="font-bold text-center sm:text-right">
              WELCOME TO THE GAME
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
