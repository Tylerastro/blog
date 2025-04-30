import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Github, BookText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/app/[lang]/(contents)/projects/projects";
import { cn } from "@/lib/utils";

export default function ProjectCard({ project }: { project: Project }) {
  const fallbackImageUrl =
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const imageUrl =
    project.image && project.image.trim() ? project.image : fallbackImageUrl;

  const { terminated, post } = project;

  return (
    <Card
      className={cn(
        "overflow-hidden flex flex-col h-full transition-all hover:shadow-lg",
        terminated &&
          "grayscale opacity-75 hover:shadow-none cursor-not-allowed"
      )}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        {terminated && (
          <Badge
            variant="destructive"
            className="absolute top-2 right-2 text-sm px-3 py-1"
          >
            Terminated
          </Badge>
        )}
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <Badge className="capitalize">{project.category}</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          {new Date(project.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          })}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">
          {project.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs select-none">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-4">
        <div
          className={cn(
            "flex gap-2 w-full",
            terminated && "pointer-events-none"
          )}
        >
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                Code
              </Link>
            </Button>
          )}
          {project.demoUrl && (
            <Button size="sm" asChild className="flex-1">
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Demo
              </Link>
            </Button>
          )}
          {post && (
            <Button variant="secondary" size="sm" asChild className="flex-1">
              <Link href={post} target="_blank" rel="noopener noreferrer">
                <BookText className="h-4 w-4 mr-2" />
                Post
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
