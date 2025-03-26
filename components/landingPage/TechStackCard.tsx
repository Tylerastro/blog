import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TechStackCardProps {
  technologies: string[];
  proficiencyPercentage: number;
}

export function TechStackCard({
  technologies,
  proficiencyPercentage,
}: TechStackCardProps) {
  return (
    <Card className="cyberpunk-card flex-[1]">
      <div className="card-reflection"></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-cyan-100">
          Tech Stack
        </CardTitle>
      </CardHeader>
      <CardContent className="cyberpunk-card-content">
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge
              key={tech}
              className="bg-[rgba(0,127,127,0.3)] border border-cyan-400/50 text-cyan-100 shadow-glow"
            >
              {tech}
            </Badge>
          ))}
        </div>
        <div className="mt-3">
          <div className="w-full bg-cyan-900/30 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-cyan-300 h-full rounded-full shimmer"
              style={{ width: `${proficiencyPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs mt-2 text-cyan-100">Full-stack proficiency</p>
        </div>
      </CardContent>
    </Card>
  );
}
