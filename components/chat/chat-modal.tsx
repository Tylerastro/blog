"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ChatInterface from "@/components/chat/chat-interface";

export default function ChatModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[900px] h-[700px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Let's chat</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden h-full">
          <ChatInterface onClose={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
