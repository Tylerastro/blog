import React from "react";
import Image from "next/image";
import TextRotation from "@/components/TextRotation";

export default function AboutMe() {
  return (
    <section className="flex flex-col items-center space-y-4 text-center pb-4">
      <Image
        src="/profile.JPG"
        alt="profile"
        width={200}
        height={200}
        className="rounded-full"
      />
      <div className="flex flex-col text-left text-3xl">
        <span>Hi I'm Tyler</span>
        <span className="flex gap-2">
          I am a
          <TextRotation
            texts={[
              "Astrophysicist",
              "Developer",
              "Otaku",
              "Baseball Player",
              "Softball Umpire",
            ]}
            staggerTime={10}
            duration={0.4}
          />
        </span>
      </div>
    </section>
  );
}
