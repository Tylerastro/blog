"use client";

import React, { useState, useEffect } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("h2, h3, h4"));
    const tocItems = headings.map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
      level: parseInt(heading.tagName.charAt(1)),
    }));
    setToc(tocItems);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed right-4 top-1/4 w-64 p-4 bg-white dark:bg-gray-800 opacity-55 rounded-lg shadow-lg overflow-auto max-h-[70vh]">
      <ul className="space-y-2">
        {toc.map((item) => (
          <li
            key={item.id}
            className={`cursor-pointer transition-colors duration-200 ease-in-out
              ${item.level === 2 ? "pl-0" : item.level === 3 ? "pl-4" : "pl-8"}
              ${
                activeId === item.id
                  ? "text-blue-500 font-medium"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              }`}
            onClick={() => handleClick(item.id)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </nav>
  );
}
