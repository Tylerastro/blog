import { AboutAccordion } from "@/components/about/AboutAccordion";
import { SocialLinks } from "@/components/about/SocialLinks";

export default function AboutMe() {
  return (
    <main className="min-h-screen p-8 mx-auto md:max-w-5xl">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="mt-6 text-4xl font-bold">Tyler</h1>
        <p className="mt-2 text-xl text-muted-foreground">Software Engineer</p>
        <SocialLinks />
      </section>

      {/* About Section */}
      <section className="text-center mb-12">
        <h2 className="text-3xl font-semibold mb-4">About Me</h2>
        <p className="text-lg text-muted-foreground">
          I am a software engineer, an astronomer, and a physicist, strongly
          believe in by putting each one&apos;s effort, we can make a better
          world.
        </p>
      </section>

      {/* Details Section */}
      <section>
        <AboutAccordion />
      </section>
    </main>
  );
}
