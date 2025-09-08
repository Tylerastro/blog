import { SocialLinks } from "@/components/about/SocialLinks";
import { Skills } from "@/components/about/Skills";
import { Education } from "@/components/about/Education";
import { Publications } from "@/components/about/Publications";

export default async function AboutMe() {
  return (
    <main className="min-h-screen p-8 mx-auto md:max-w-2xl">
      <header className="text-center mb-16">
        <h1 className="mt-6 text-primary text-5xl font-bold">Tyler</h1>
        <p className="mt-4 text-xl text-primary">Software Engineer</p>
        <SocialLinks />
      </header>

      <div className="space-y-16">
        <section>
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-lg leading-relaxed">
            I am a software engineer, an astronomer, and a physicist, who
            strongly believes that by putting in our collective effort, we can
            make the world a better place.
          </p>
        </section>

        <Skills />
        <Publications />
        <Education />
      </div>
    </main>
  );
}
