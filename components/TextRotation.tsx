"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface TextRotationProps {
  texts: string[];
  duration?: number;
  staggerTime?: number;
  loop?: boolean;
  className?: string;
}

export default function TextRotation({
  texts = ["First text", "Second text", "Third text"],
  duration = 0.5,
  staggerTime = 2,
  loop = true,
  className = "",
}: TextRotationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(useGSAP);

  // Set up the animation
  useGSAP(
    () => {
      gsap.set(containerRef.current, { opacity: 1 });
      const tl = gsap.timeline({
        repeat: loop ? -1 : 0,
      });

      tl.from(".rotating-text", {
        opacity: 0,
        y: 20,
        duration: duration,
        ease: "power1.inOut",
        stagger: {
          amount: staggerTime,
        },
      }).to(
        ".rotating-text",
        {
          opacity: 0,
          rotateX: 90,
          y: -20,
          duration: duration,
          ease: "power1.inOut",
          stagger: {
            amount: staggerTime,
          },
        },
        staggerTime / texts.length
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`relative text-nowrap ${className}`}>
      {texts.map((text, index) => (
        <span key={index} className="rotating-text absolute inline-block">
          {text}
        </span>
      ))}
    </div>
  );
}
