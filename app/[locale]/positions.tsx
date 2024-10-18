"use client";

import { ReactTyped } from "react-typed";

export default function Positions() {
  return (
    <div className="flex flex-col items-center space-y-4 text-center">
      <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
        <ReactTyped
          strings={[
            "Tyler",
            "or Tylerastro",
            "an Astronomer",
            "a Developer",
            "a Physicist",
          ]}
          typeSpeed={40}
          backSpeed={55}
          loop
          className="font-semibold text-primary"
        />
      </p>
    </div>
  );
}
