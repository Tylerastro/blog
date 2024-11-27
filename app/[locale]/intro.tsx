import SocialLinks from "@/components/SocialLinks";
import AskMeAnything from "@/components/ui/Ask";
import Positions from "./positions";

export default function Intro() {
  return (
    <section className="w-full h-[80svh] py-12 md:py-12 lg:py-16 xl:py-18">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center pb-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Hi! I am
          </h1>
          <Positions />
        </div>
        <SocialLinks />
      </div>
      <AskMeAnything />
    </section>
  );
}
