"use client";

import { useEffect, useState } from "react";
import BlackHole from "@/components/BlackHole";

const BlackHoleSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [blackHoleOpacity, setBlackHoleOpacity] = useState(1);

  useEffect(() => {
    console.log(scrollProgress);
  }, [scrollProgress]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress for the first section (0 to 1)
      const progress = Math.min(scrollTop / windowHeight, 1);
      setScrollProgress(progress);

      // Fade out BlackHole as user scrolls
      const blackHoleFade = Math.max(1 - progress * 1.2, 0);
      setBlackHoleOpacity(blackHoleFade);

      // Fade in PersonalSection - starts at 40% scroll progress
      const personalFade = Math.max((progress - 0.4) / 0.6, 0);
      const personalSectionOpacity = Math.min(personalFade, 1);
    };

    // Initial call to set correct state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="h-[150svh] flex flex-col snap-center relative overflow-hidden">
      <BlackHole scrollProgress={scrollProgress} opacity={blackHoleOpacity} />
    </section>
  );
};

export default BlackHoleSection;
