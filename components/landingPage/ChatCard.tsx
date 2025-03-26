"use client";

import { Send, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

interface ChatCardProps {
  lang?: string;
}

export function ChatCard({ lang = "en-US" }: ChatCardProps) {
  const [message, setMessage] = useState("");

  return (
    <Card className="cyberpunk-card flex-[2]">
      <div className="card-reflection"></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-cyan-100">
          <Link
            href={`/${lang}/chat`}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Ask Me Anything
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="cyberpunk-card-content">
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="w-32 h-32 rounded-full border-2 border-cyan-400 overflow-hidden mb-3 shadow-[0_0_15px_rgba(0,255,255,0.5)]">
            <div className="w-full h-full bg-gradient-to-br from-cyan-500/30 to-cyan-700/30 flex items-center justify-center">
              <User className="h-16 w-16 text-cyan-300" strokeWidth={1.5} />
            </div>
          </div>
          <div className="text-center mb-3">
            <p className="text-cyan-100 text-sm">
              Future AI Assistant Integration
            </p>
            <p className="text-xs text-cyan-300 mt-1">
              Ask me any question about my work or experience
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-auto">
          <Input
            placeholder="Type your message..."
            className="bg-[rgba(0,127,127,0.2)] border-cyan-400/50 text-white"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button size="icon" className="bg-cyan-600 hover:bg-cyan-500">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
