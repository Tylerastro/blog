import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Cpu, Database, Cloud, Globe } from "lucide-react";

export const AboutAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      <AccordionItem value="skills">
        <AccordionTrigger className="text-xl">Skills</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-2">
            {["React", "Nextjs", "Python", "AWS", "Docker", "MongoDB"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="expertise">
        <AccordionTrigger className="text-xl">
          Areas of Expertise
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Cpu className="h-5 w-5 mr-2 text-primary" />
              <span>Backend Development</span>
            </div>
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-primary" />
              <span>Frontend Development</span>
            </div>
            <div className="flex items-center">
              <Database className="h-5 w-5 mr-2 text-primary" />
              <span>Database Design</span>
            </div>
            <div className="flex items-center">
              <Cloud className="h-5 w-5 mr-2 text-primary" />
              <span>Cloud Architecture</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="projects">
        <AccordionTrigger className="text-xl">Publications</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>...</li>
            <li>...</li>
            <li>...</li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="education">
        <AccordionTrigger className="text-xl">Education</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div>
              <strong className="text-lg">
                Master of Science in Astronomy
              </strong>
              <p className="text-muted-foreground">
                National Central University, 2019-2021
              </p>
            </div>
            <div>
              <strong className="text-lg">
                Bachelor of Science in Physics
              </strong>
              <p className="text-muted-foreground">
                National Sun Yat-sen University, 2015-2019
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
