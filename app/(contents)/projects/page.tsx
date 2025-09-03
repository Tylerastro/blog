"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "./projects";
import ProjectCard from "@/components/projects/ProjectCard";
import styles from "./projects.module.css"; // Import the CSS module

// Get unique categories from projects
const categories = [
  "all",
  ...Array.from(new Set(projects.map((project) => project.category))),
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter projects based on active category
  const filteredProjects = projects
    .filter(
      (project) =>
        activeCategory === "all" || project.category === activeCategory
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="min-h-screen p-4 md:p-8 mx-auto max-w-7xl">
      <section className="text-center mb-12">
        <h1 className="mt-6 text-4xl font-bold">Projects</h1>
        <p className="mt-4 text-2xl text-muted-foreground max-w-2xl mx-auto">
          A collection of my work across various technologies and domains.
          Browse by category or explore all projects.
        </p>
      </section>

      <Tabs defaultValue="all" className="mb-8">
        {/* <TabsList className="mb-8 flex flex-wrap justify-center">
          {categories.map((category) => (
            <div key={category}>
              <div className="text-hover-effect">
                <TabsTrigger
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="capitalize text-lg transition-colors hover:text-secondary-foreground"
                >
                  {category}
                </TabsTrigger>
              </div>
            </div>
          ))}
        </TabsList> */}

        <TabsContent value={activeCategory} className="mt-0">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${styles.projectsTransition}`}
          >
            {filteredProjects.map((project) => (
              <div key={project.id} className={styles.cardFadeIn}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
