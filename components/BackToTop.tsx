"use client";

import { useState, useEffect } from "react";
import { ChevronUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BackToTopProps {
  showAfterScroll?: number;
  className?: string;
}

export function BackToTop({
  showAfterScroll = 300,
  className,
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > showAfterScroll) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [showAfterScroll]);

  return (
    <>
      {isVisible && (
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            "fixed bottom-8 right-8 rounded-full shadow-lg z-50 opacity-90 hover:opacity-100 transition-opacity",
            className
          )}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ChevronUpIcon className="h-5 w-5" />
        </Button>
      )}
    </>
  );
}
