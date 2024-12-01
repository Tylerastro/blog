import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t py-6">
      <div className=" flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
        <p className="text-center text-sm leading-loose text-gray-500 dark:text-gray-400">
          2024 My Personal Blog. All rights reserved.
        </p>
        <nav className="flex items-center space-x-4 text-sm font-medium">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </nav>
      </div>
    </footer>
  );
}
