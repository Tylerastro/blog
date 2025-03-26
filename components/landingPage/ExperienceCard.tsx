import { Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Job {
  role: string;
  company: string;
  period: string;
  desc: string;
}

interface ExperienceCardProps {
  jobs: Job[];
  yearsOfExperience: string;
}

export function ExperienceCard({
  jobs,
  yearsOfExperience,
}: ExperienceCardProps) {
  return (
    <Card className="cyberpunk-card flex-[1]">
      <div className="card-reflection"></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-cyan-100">
          Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="cyberpunk-card-content">
        <div className="space-y-2">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="border-l-2 border-cyan-400/50 pl-3 relative"
            >
              <div className="absolute w-2.5 h-2.5 bg-cyan-400 rounded-full -left-[6px] top-1 shadow-[0_0_8px_rgba(0,255,255,0.5)]"></div>
              <h3 className="text-white font-bold text-sm">{job.role}</h3>
              <div className="flex justify-between text-xs">
                <span className="text-cyan-300">{job.company}</span>
                <span className="text-cyan-400/70">{job.period}</span>
              </div>
              <p className="text-xs mt-1 text-cyan-100">{job.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-cyan-500/30">
          <div className="flex items-center text-xs text-cyan-300">
            <Briefcase className="h-3 w-3 mr-1" />
            <span>{yearsOfExperience}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
