"use client";
import React, { useEffect, useRef, useState } from "react";
import { TableOfContents } from "./TableOfContents";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function TocContainer() {
  const tocRef = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  useGSAP(() => {
    gsap.set("#table-of-contents", { opacity: 0, y: -50 });
    gsap.to("#table-of-contents", {
      opacity: 1,
      duration: 1,
      x: 0,
      y: 0,
      scrollTrigger: {
        trigger: "#post-title",
        start: "bottom top",
        pin: true,
      },
      ease: "power2.out",
    });
  });
  return (
    <div
      id="table-of-contents"
      ref={tocRef}
      className="fixed right-6 top-24 z-10 max-w-[250px]"
    >
      <TableOfContents />
    </div>
  );
}
