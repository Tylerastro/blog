import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Project {
  title: string;
  year: string;
  tech: string;
  desc: string;
}

interface ProjectsCardProps {
  projects: Project[];
  lang?: string;
}

export function ProjectsCard({ projects, lang = "en-US" }: ProjectsCardProps) {
  return (
    <Card className="cyberpunk-card flex-[1]">
      <div className="card-reflection"></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-cyan-100">
          <Link
            href={`/${lang}/projects`}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Projects
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="cyberpunk-card-content">
        <div className="space-y-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border border-cyan-400/50 p-2 rounded-lg bg-[rgba(0,127,127,0.15)] shadow-[0_0_8px_rgba(0,255,255,0.2)] hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all hover:scale-[1.02] relative overflow-hidden"
            >
              <div className="card-reflection"></div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white text-sm">
                  {project.title}
                </span>
                <Badge className="bg-cyan-500/20 text-cyan-100 text-xs">
                  {project.year}
                </Badge>
              </div>
              <p className="text-xs text-cyan-300">{project.tech}</p>
              <p className="text-xs mt-1 text-cyan-100">{project.desc}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
