"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, FileCode, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SocialLinks() {
  const { toast } = useToast();
  const email = "hantanglin70036440@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast({
        title: "Email copied!",
        description: "Email address has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-6 flex justify-center space-x-4">
      <Button variant="outline" size="icon" aria-label="GitHub Profile" asChild>
        <a
          href="https://github.com/Tylerastro"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="h-5 w-5" />
        </a>
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="LinkedIn Profile"
        asChild
      >
        <a
          href="https://linkedin.com/in/tylerastro"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="h-5 w-5" />
        </a>
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Copy Email Address"
        onClick={handleCopyEmail}
      >
        <Mail className="h-5 w-5" />
      </Button>
      <Button variant="outline" size="icon" aria-label="View CV" asChild>
        <a href="/Tyler_CV.pdf" target="_blank" rel="noopener noreferrer">
          <FileCode className="h-5 w-5" />
        </a>
      </Button>
    </div>
  );
}
