import { unstable_setRequestLocale } from "next-intl/server";
import Intro from "./intro";
import DropMeMessage from "@/components/ui/DropMeMessage";
import ProjectCard from "@/components/ProjectCard";
import Projects from "./projects";

export default async function Home(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  unstable_setRequestLocale(params.locale);
  return (
    <main className="flex-1">
      <Intro />
      <Projects />
      <DropMeMessage />
    </main>
  );
}
