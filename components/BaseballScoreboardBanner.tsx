"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export function BaseballScoreboardBanner() {
  const [currentTime, setCurrentTime] = useState("");
  const [animationValues, setAnimationValues] = useState<
    Array<{ delay: number; duration: number }>
  >([]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc8Time = new Date(now.getTime() + 8 * 60 * 60 * 1000);
      const timeString = utc8Time.toISOString().substr(11, 8); // HH:MM:SS format
      setCurrentTime(timeString);
    };

    // Generate animation values only on client side
    const animations = Array.from({ length: 96 }, () => ({
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }));
    setAnimationValues(animations);

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 select-none">
      <Card className="bg-black/20 backdrop-blur-md border-0 shadow-[0_0_30px_rgba(0,255,255,0.3)] overflow-hidden relative">
        {/* Enhanced Cyberpunk grid overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
            {Array.from({ length: 96 }).map((_, i) => (
              <div
                key={i}
                className="border border-cyan-400/30 animate-pulse"
                style={
                  animationValues[i]
                    ? {
                        animationDelay: `${animationValues[i].delay}s`,
                        animationDuration: `${animationValues[i].duration}s`,
                      }
                    : {}
                }
              />
            ))}
          </div>
        </div>

        {/* Cyberpunk corner brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400"></div>

        {/* Main Scoreboard Header */}
        <div className="bg-black/40 backdrop-blur-sm border-y-2 border-cyan-400/80 shadow-[inset_0_0_20px_rgba(0,255,255,0.2)] text-cyan-400 p-3 sm:p-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-cyan-400/20 border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.8)] animate-pulse relative">
              <div className="absolute inset-0 transform rotate-45 bg-transparent border border-cyan-400"></div>
              <div className="absolute inset-2 transform rotate-45 bg-cyan-400/40"></div>
            </div>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-wider font-mono uppercase text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
              ◤ TYLER FIELD ◥
            </h1>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-cyan-400/20 border-2 border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.8)] animate-pulse relative">
              <div className="absolute inset-0 transform rotate-45 bg-transparent border border-cyan-400"></div>
              <div className="absolute inset-2 transform rotate-45 bg-cyan-400/40"></div>
            </div>
          </div>
        </div>

        {/* Scoreboard Display */}
        <div className="bg-black/30 backdrop-blur-sm border-y border-cyan-400/30 p-3 sm:p-6 relative z-10">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            {/* Visitor Section */}
            <div className="space-y-1 sm:space-y-2">
              <div className="text-base font-bold tracking-widest text-cyan-300/80 font-mono drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
                ▼ VISITOR ▼
              </div>
              <div className="bg-black/50 text-orange-400 border-2 border-orange-400/60 shadow-[0_0_10px_rgba(255,165,0,0.6)] rounded px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg font-bold font-mono">
                POSTS
              </div>
            </div>

            {/* Home Section - Current Time */}
            <div className="space-y-1 sm:space-y-2">
              <div className="text-base font-bold tracking-widest text-cyan-300/80 font-mono drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
                ◆ TIME (UTC+8) ◆
              </div>
              <div className="bg-black/50 text-cyan-400 border-2 border-cyan-400/80 shadow-[0_0_10px_rgba(0,255,255,0.4)] rounded px-2 sm:px-4 py-2 sm:py-3 text-lg sm:text-xl md:text-2xl font-bold font-mono drop-shadow-[0_0_5px_rgba(0,255,255,0.6)]">
                {currentTime || "00:00:00"}
              </div>
            </div>

            {/* Inning Section */}
            <div className="space-y-1 sm:space-y-2">
              <div className="text-base font-bold tracking-widest text-cyan-300/80 font-mono drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
                ▲ INNING ▲
              </div>
              <div className="bg-black/50 text-purple-400 border-2 border-purple-400/60 shadow-[0_0_10px_rgba(147,51,234,0.6)] rounded px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-lg font-bold font-mono">
                ABOUT
              </div>
            </div>
          </div>

          {/* Score Display - Hidden on mobile, shown on larger screens */}
          <div className="mt-4 sm:mt-6 hidden sm:grid grid-cols-10 gap-1 text-center text-xs">
            <div className="font-bold text-cyan-300/60 font-mono drop-shadow-[0_0_3px_rgba(0,255,255,0.4)]">
              TEAM
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((inning) => (
              <div
                key={inning}
                className="font-bold text-cyan-300/60 font-mono drop-shadow-[0_0_3px_rgba(0,255,255,0.4)]"
              >
                {inning}
              </div>
            ))}

            <div className="bg-black/50 text-cyan-400 border border-cyan-400/80 shadow-[0_0_8px_rgba(0,255,255,0.6)] rounded px-2 py-1 font-bold text-sm font-mono">
              BLOG
            </div>
            {[0, 1, "", "", "", "", "", "", ""].map((score, index) => (
              <div
                key={index}
                className="bg-black/30 text-green-400 border border-green-400/40 shadow-[0_0_5px_rgba(0,255,0,0.3)] rounded px-2 py-1 font-bold font-mono"
              >
                {score}
              </div>
            ))}

            <div className="bg-black/50 text-orange-400 border border-orange-400/80 shadow-[0_0_8px_rgba(255,165,0,0.6)] rounded px-2 py-1 font-bold text-sm font-mono">
              LIFE
            </div>
            {[1, 0, "", "", "", "", "", "", ""].map((score, index) => (
              <div
                key={index}
                className="bg-black/30 text-red-400 border border-red-400/40 shadow-[0_0_5px_rgba(255,0,0,0.3)] rounded px-2 py-1 font-bold font-mono"
              >
                {score}
              </div>
            ))}
          </div>

          {/* Mobile Score Summary */}
          <div className="mt-4 sm:hidden grid grid-cols-2 gap-2 text-center">
            <div className="bg-black/50 text-cyan-400 border-2 border-cyan-400/80 shadow-[0_0_12px_rgba(0,255,255,0.6)] rounded px-3 py-2 font-bold text-sm font-mono">
              BLOG: 8
            </div>
            <div className="bg-black/50 text-orange-400 border-2 border-orange-400/80 shadow-[0_0_12px_rgba(255,165,0,0.6)] rounded px-3 py-2 font-bold text-sm font-mono">
              LIFE: 5
            </div>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="bg-black/40 backdrop-blur-sm border-t-2 border-cyan-400/60 shadow-[inset_0_0_15px_rgba(0,255,255,0.1)] text-cyan-300 p-2 sm:p-3 relative z-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center sm:justify-start">
              {/* BALL Count */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-cyan-300 font-mono drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
                  ◉ BALL:
                </span>
                <div
                  className="flex gap-1"
                  role="img"
                  aria-label="2 balls out of 4"
                >
                  {[1, 2, 3].map((index) => (
                    <div
                      key={`ball-${index}`}
                      className={`w-3 h-3 sm:w-4 sm:h-4 transform rotate-45 border-2 transition-all duration-300 ${
                        index <= 2
                          ? "bg-yellow-400/80 border-yellow-400 shadow-[0_0_8px_rgba(255,255,0,0.8)] animate-pulse"
                          : "bg-transparent border-yellow-400/30 opacity-40"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              {/* STRIKE Count */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-cyan-300 font-mono drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
                  ◈ STRIKE:
                </span>
                <div
                  className="flex gap-1"
                  role="img"
                  aria-label="1 strike out of 3"
                >
                  {[1, 2].map((index) => (
                    <div
                      key={`strike-${index}`}
                      className={`w-3 h-3 sm:w-4 sm:h-4 border-2 transition-all duration-300 ${
                        index <= 1
                          ? "bg-red-400/80 border-red-400 shadow-[0_0_8px_rgba(255,0,0,0.8)] animate-pulse"
                          : "bg-transparent border-red-400/30 opacity-40"
                      }`}
                      style={{
                        clipPath:
                          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              {/* OUT Count */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-cyan-300 font-mono drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
                  ◆ OUT:
                </span>
                <div
                  className="flex gap-1"
                  role="img"
                  aria-label="0 outs out of 3"
                >
                  {[1, 2].map((index) => (
                    <div
                      key={`out-${index}`}
                      className={`w-3 h-3 sm:w-4 sm:h-4 border-2 transition-all duration-300 ${
                        index <= 0
                          ? "bg-purple-400/80 border-purple-400 shadow-[0_0_8px_rgba(147,51,234,0.8)]"
                          : "bg-transparent border-purple-400/30 opacity-40"
                      }`}
                      style={{
                        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                      }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="font-bold text-center sm:text-right font-mono text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] animate-pulse">
              ◤ WELCOME TO THE GAME ◥
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
