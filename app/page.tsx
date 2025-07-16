import BlackHoleSection from "@/components/sections/BlackHoleSection";
import TechStackSection from "@/components/sections/TechStackSection";
import PersonalSection from "@/components/sections/PersonalSection";
import RecentPostsSection from "@/components/sections/RecentPostsSection";
import UnderConstructionSection from "@/components/sections/UnderConstructionSection";

export default function Home() {
  return (
    <main className="bg-black-100 snap-mandatory snap-y scroll-smooth">
      <BlackHoleSection />
      <PersonalSection />
      {/* <TechStackSection />
      <RecentPostsSection />
      <UnderConstructionSection /> */}
    </main>
  );
}
