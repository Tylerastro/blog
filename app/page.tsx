import { BaseballScoreboardBanner } from "@/components/BaseballScoreboardBanner";
import Section2 from "@/components/Section2";

export default async function Home() {
  return (
    <>
      {/* Section 1: Original Layout */}
      <main className="min-h-screen grid grid-rows-[auto_1fr_1fr] md:grid-rows-[auto_1fr] md:grid-cols-2 gap-4 p-4 md:p-6">
        {/* First Row - Baseball Scoreboard Banner */}
        <div className="md:col-span-2">
          <BaseballScoreboardBanner />
        </div>

        {/* Bottom Left - Empty for now */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
          <p className="text-muted-foreground">Ape Coming Soon...</p>
        </div>

        {/* Bottom Right - About Me */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-lg p-6 flex flex-col justify-center">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl  text-foreground">About Me</h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="leading-relaxed">
                I'm a passionate developer who loves creating innovative
                solutions and sharing knowledge through code and writing.
              </p>
              <p className="leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open source, or writing about my latest
                discoveries.
              </p>
              <p className="leading-relaxed">
                Let's connect and build the future together!
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Section 2: Full 3D Canvas */}
      {/* <Section2 /> */}
    </>
  );
}
