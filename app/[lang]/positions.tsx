"use client";
import { ReactTyped } from "react-typed";

export default function Positions() {
  return (
    <div className="flex flex-col items-center space-y-4 text-center">
      <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
        <ReactTyped
          strings={[
            "position1",
            "position2",
            "position3",
            "position4",
            "position5",
          ]}
          typeSpeed={50}
          backSpeed={30}
          loop
          className="font-semibold text-2xl text-primary font-local_edu_vic_wa_nt_beginner"
        />
      </p>
    </div>
  );
}
