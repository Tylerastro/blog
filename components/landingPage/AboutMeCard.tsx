import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AboutMeCardProps {
  name: string;
  role: string;
  description: string;
  location: string;
  status: string;
  time: string;
}

export function AboutMeCard({
  name,
  role,
  description,
  location,
  status,
  time,
}: AboutMeCardProps) {
  return (
    <Card className="cyberpunk-card flex-[3]">
      <div className="card-reflection"></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-cyan-100">
          About Me
        </CardTitle>
      </CardHeader>
      <CardContent className="cyberpunk-card-content">
        <div className="flex flex-col space-y-3 mb-4">
          <div className="flex items-center">
            <User className="mr-3 text-cyan-300" />
            <span className="text-xl font-bold text-white">{name}</span>
          </div>
          <p className="text-cyan-200 text-base">{role}</p>
        </div>

        <div className="border border-cyan-400/50 p-3 rounded-lg mb-4 shadow-[inset_0_0_10px_rgba(0,255,255,0.1)] bg-[rgba(0,127,127,0.1)]">
          <p className="leading-relaxed text-cyan-100 text-sm">{description}</p>
        </div>

        <div className="mt-auto">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-cyan-200">Location:</span>
            <span className="text-white">{location}</span>
            <span className="text-cyan-200">Status:</span>
            <span className="flex items-center text-white">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 pulse-animation"></span>{" "}
              {status}
            </span>
            <span className="text-cyan-200">Time:</span>
            <span className="text-white">{time}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
