"use client";
import SocialLinks from "@/components/SocialLinks";
import AskMeAnything from "@/components/ui/Ask";
import Positions from "./positions";

export default function Intro() {
  return (
    <section className="w-full h-[80svh] py-12 md:py-12 lg:py-16 xl:py-18 flex flex-col">
      <div className="px-4 md:px-6 flex-grow">
        <div className="flex flex-col items-center space-y-4 text-center pb-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Hi! I am
          </h1>
          <Positions />
        </div>
        <SocialLinks />
        <AskMeAnything />
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => {
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        >
          View Projects
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
