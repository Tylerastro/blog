import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Me",
  description: "Get in touch with me",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Get in Touch</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side - reserved for threejs animation */}
          <div className="w-full h-[500px]" />
          
          {/* Right side - contact form */}
          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}