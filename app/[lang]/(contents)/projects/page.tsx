import { projects } from "./projects";
import ProjectCard from "@/components/projects/ProjectCard";
import styles from "./projects.module.css"; // Import the CSS module

import type { ProjectsPageProps } from "@/types";

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { lang } = await params;

  // Filter and sort projects
  const filteredProjects = projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="min-h-screen p-4 md:p-8 mx-auto max-w-7xl">
      <section className="text-center mb-12">
        <h1 className="mt-6 text-4xl font-bold">Projects</h1>
        <p className="mt-4 text-2xl text-muted-foreground max-w-2xl mx-auto">
          A collection of my work across various technologies and domains.
          Browse by category or explore all projects.
        </p>
      </section>

      <div className="mb-8">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${styles.projectsTransition}`}
        >
          {filteredProjects.map((project) => (
            <div key={project.id} className={styles.cardFadeIn}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
