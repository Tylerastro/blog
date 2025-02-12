import { projects } from "./data/projects";
import ProjectList from "./components/ProjectList";

export default function ProjectPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Projects</h1>
      <ProjectList projects={projects} />
    </div>
  );
}
