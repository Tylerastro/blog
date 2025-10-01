"use client";

import { useEffect, useState } from "react";
import { BaseballCanvas } from "../baseball/BaseballCanvas";

export function BaseballSection() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - windowHeight;

      // Calculate progress (0 to 1)
      const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <BaseballCanvas
        scrollProgress={scrollProgress}
        className="absolute inset-0 z-0"
      />

      {/* Text overlay in the third column */}
      <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
        <div className="w-2/3"></div>
        <div className="w-1/3 p-8 text-white flex justify-start pointer-events-auto">
          <div className="max-w-md">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Hi I am Tyler.
              </h1>
              <div className="space-y-4 text-lg md:text-xl leading-relaxed">
                <p>
                  I'm a passionate developer who loves creating interactive
                  experiences and exploring the intersection of technology and
                  creativity.
                </p>
                <p>
                  Welcome to my digital space where I share my thoughts on
                  software development, creative coding, and the latest in tech.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
