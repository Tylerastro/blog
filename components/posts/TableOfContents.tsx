import React, { useState, useEffect } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
  key: string;
}

export function TableOfContents() {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll("h2, h3, h4, h5, h6")
    );
    // Create a hierarchical structure for keys
    const tocItems: TOCItem[] = [];
    const headingTexts: string[] = ["", "", "", "", "", ""]; // Index 0 is unused, 1-5 for h2-h6

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1));
      const levelIndex = level - 2; // Adjust to 0-based index for our array (h2 -> 0)
      const headingText = heading.textContent || "";

      // Update the text at current level
      headingTexts[levelIndex] = headingText;

      // Clear all deeper levels when we encounter a higher-level heading
      for (let i = levelIndex + 1; i < headingTexts.length; i++) {
        headingTexts[i] = "";
      }

      // Generate hierarchical key by combining all relevant heading texts
      const hierarchicalKey = headingTexts
        .slice(0, levelIndex + 1)
        .filter((text) => text !== "")
        .join(" > ");

      // set elemnt id to the hierarchical key
      heading.id = hierarchicalKey;

      tocItems.push({
        id: heading.id,
        text: headingText,
        level: level,
        key: hierarchicalKey,
      });
    });

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
    <nav className="relative hidden md:block w-full p-4 opacity-85 max-h-[70vh] overflow-auto ">
      <ul className="space-y-2">
        {toc.map((item) => (
          <li
            key={item.key}
            className={`cursor-pointer transition-colors duration-200 ease-in-out
              ${item.level === 2 ? "pl-0" : item.level === 3 ? "pl-4" : "pl-8"}
              ${
                activeId === item.id
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-primary/80"
              }`}
            onClick={() => handleClick(item.id)}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(item.id);
              }}
              className="block w-full truncate"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
