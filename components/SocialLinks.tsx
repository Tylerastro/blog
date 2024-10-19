import React from "react";
import Link from "next/link";
import LineMdBuyMeACoffeeTwotone from "./icons/BuymeaCoffee";
import { Github } from "lucide-react";

export default function SocialLinks() {
  return (
    <div className="flex justify-center space-x-4 w-full py-3">
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/Tylerastro"
      >
        <Github className="w-9 h-9" />
      </Link>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://buymeacoffee.com/tylerastro"
      >
        <LineMdBuyMeACoffeeTwotone className="w-9 h-9" />
      </Link>
    </div>
  );
}
