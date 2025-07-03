export default async function PersonalSection() {
  return (
    <section className="h-[100svh] flex flex-col snap-center relative overflow-hidden items-center justify-center p-8">
      {/* Floating Card */}
      <div className="flex flex-col items-center justify-center text-center p-8 relative z-10 max-w-4xl w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl">
        {/* Background decoration for card */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)] rounded-3xl" />

        <div className="relative z-10 w-full">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white drop-shadow-2xl">
              ABOUT
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 -mt-4 drop-shadow-lg">
              Tyler
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mx-auto">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-purple-300 mb-3">
                  Who I Am
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  A passionate developer crafting digital experiences with
                  creativity and precision. I believe in the power of clean code
                  and beautiful design.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-purple-300 mb-3">
                  What I Do
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Full-stack development, UI/UX design, and turning complex
                  problems into elegant solutions.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-purple-300 mb-3">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Node.js",
                    "Python",
                    "Design",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-purple-300 mb-3">
                  Location
                </h3>
                <p className="text-lg text-gray-300">
                  📍 Based in the digital realm, working globally
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Highlight */}
          <div className="mt-12">
            <p className="text-xl font-semibold text-white/80 italic">
              "Code is poetry in motion"
            </p>
          </div>
        </div>

        {/* Floating elements inside card */}
        <div className="absolute top-6 left-6 w-2 h-2 bg-purple-400 rounded-full opacity-60" />
        <div className="absolute bottom-6 right-6 w-3 h-3 bg-white/40 rounded-full" />
        <div className="absolute top-1/2 left-4 w-1 h-1 bg-purple-300 rounded-full" />
      </div>
    </section>
  );
}
