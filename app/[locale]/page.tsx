import Intro from "./intro";
import DropMeMessage from "@/components/ui/DropMeMessage";
import Projects from "./projects";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang;
  return (
    <main className="flex-1">
      <Intro />
      <Projects />
      <DropMeMessage />
    </main>
  );
}
