import BlackHole from "@/components/BlackHole";
import TechStackSection from "@/components/sections/TechStackSection";
import PersonalSection from "@/components/sections/PersonalSection";
import RecentPostsSection from "@/components/sections/RecentPostsSection";
import UnderConstructionSection from "@/components/sections/UnderConstructionSection";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <main className="bg-black-100 snap-mandatory snap-y h-screen overflow-y-scroll scroll-smooth">
      <section className="h-[100svh] flex flex-col snap-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <BlackHole />
        </div>
      </section>
      <PersonalSection />
      <TechStackSection />
      <RecentPostsSection />
      <UnderConstructionSection />
    </main>
  );
}
