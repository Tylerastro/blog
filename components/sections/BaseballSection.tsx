"use client";

import { useEffect, useState } from "react";
import { BaseballCanvas } from "../baseball/BaseballCanvas";

interface BaseballSectionProps {
  className?: string;
}

export function BaseballSection({ className = "" }: BaseballSectionProps) {
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
    <section className={`h-screen relative overflow-hidden ${className}`}>
      {/* Baseball Field Canvas */}
      <BaseballCanvas
        scrollProgress={scrollProgress}
        className="absolute inset-0 z-0"
      />
    </section>
  );
}
