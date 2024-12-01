import React from "react";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="h-[80svh]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          name="Website Redesign"
          status="ongoing"
          startDate="2023-05-01"
          endDate="2023-07-31"
        />
        <ProjectCard
          name="Mobile App Development"
          status="pending"
          startDate="2023-08-01"
          endDate="2023-11-30"
        />
        <ProjectCard
          name="Data Analysis Project"
          status="ongoing"
          startDate="2023-04-15"
          endDate="2023-06-30"
        />
      </div>
    </section>
  );
}
