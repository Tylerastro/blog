import { Github, Linkedin, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactCard() {
  return (
    <Card className="cyberpunk-card flex-[1]">
      <div className="card-reflection"></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-cyan-100">
          Contact Me
        </CardTitle>
      </CardHeader>
      <CardContent className="cyberpunk-card-content">
        <div className="flex space-x-4">
          <a
            href="#"
            className="flex items-center text-cyan-300 hover:text-cyan-100 transition-colors"
          >
            <Mail className="mr-1 h-4 w-4" />
            <span className="text-sm">Email</span>
          </a>
          <a
            href="#"
            className="flex items-center text-cyan-300 hover:text-cyan-100 transition-colors"
          >
            <Github className="mr-1 h-4 w-4" />
            <span className="text-sm">GitHub</span>
          </a>
          <a
            href="#"
            className="flex items-center text-cyan-300 hover:text-cyan-100 transition-colors"
          >
            <Linkedin className="mr-1 h-4 w-4" />
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>
        <div className="mt-3 text-sm text-cyan-400/70 border-t border-cyan-500/30 pt-2">
          <p>Let's build something amazing together</p>
        </div>
      </CardContent>
    </Card>
  );
}
