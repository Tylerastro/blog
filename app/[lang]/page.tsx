import {
  GitHubLogoIcon,
  TwitterLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import type { HomeProps } from "@/types";
import { BaseballSection } from "@/components/sections/BaseballSection";

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  return (
    <main className="flex flex-col">
      <section className="h-[100svh] relative overflow-hidden">
        {/* Split Background with Tilted Line */}
        <div className="absolute inset-0">
          {/* Light Half */}
          <div className="absolute inset-0 bg-background"></div>
          {/* Dark Half with Tilted Transition */}
          <div
            className="absolute inset-0 bg-secondary"
            style={{
              clipPath: "polygon(0 60%, 100% 40%, 100% 100%, 0% 100%)",
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
            {/* Avatar */}
            <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-gray-800 to-black shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-black"></div>
              </div>
            </div>

            {/* Name and Title */}
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 text-center">
              Tyler Lin
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 text-center">
              Software Engineer / Astronomer / Baseball Player
            </p>

            {/* Social Media Links */}
            <div className="flex gap-6 mb-12">
              <a
                href="https://github.com/Tylerastro"
                className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <GitHubLogoIcon className="w-6 h-6 text-white dark:text-gray-800" />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-100 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <TwitterLogoIcon className="w-6 h-6 text-white dark:text-gray-800" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-100 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInLogoIcon className="w-6 h-6 text-white dark:text-gray-800" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-100 flex items-center justify-center transition-colors"
                aria-label="Medium"
              >
                <svg
                  className="w-6 h-6 text-white dark:text-gray-800"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Transition section */}
      <section className="h-[30svh] relative overflow-hidden bg-gradient-to-b from-secondary to-secondary-foreground" />

      {/* Baseball Field Section */}
      <section className="h-[100svh] relative overflow-hidden bg-secondary-foreground">
        <BaseballSection />
      </section>
    </main>
  );
}
