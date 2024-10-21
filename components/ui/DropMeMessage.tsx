"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function DropMeMessage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email using a backend service
    // For this example, we'll just log the data and show a success message
    console.log({ name, email, message });
    // Clear the form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section className="relative bg-background py-16 overflow-hidden">
      {/* Clipped background */}
      <div
        className="absolute inset-0 bg-primary/50"
        style={{
          clipPath:
            "polygon(18% 0, 80% 0%, 100% 0, 100% 80%, 79% 100%, 0 100%, 0% 80%, 0% 20%)",
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Me</h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto space-y-4 bg-background p-6 rounded-lg shadow-md"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Your message here..."
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}
