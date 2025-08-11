import Squares from "@/components/Squares";

export default function PersonalSection() {
  return (
    <section className="h-[100svh] flex flex-col snap-center relative overflow-hidden items-center justify-center p-8 transition-opacity duration-1000">
      {/* Canvas Background Layer */}
      <div className="absolute inset-0 z-0">
        <Squares
          direction="diagonal"
          speed={0.2}
          borderColor="#333"
          squareSize={108}
          hoverFillColor="#1a1a1a"
        />
      </div>

      {/* Content Layer */}
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-6xl font-bold mb-8">Tyler Lin</h1>

        <div className="text-lg text-gray-300 mb-8">
          <p className="mb-6">
            Hey! I'm Tyler Lin (Tylerastro), a software engineer, astronomer,
            and baseball player.
          </p>

          <div className="mb-4">
            <span className="text-gray-400">Working at</span>
            <span className="ml-2">🏢 Pactson (Backend Engineer)</span>
          </div>

          <div className="mb-4">
            <span className="text-gray-400">Background</span>
            <span className="ml-2">🎓 Physics BSc & Astronomy Master's</span>
            <span className="mx-2">
              📝 Two first-author papers in AJ & MNRAS
            </span>
          </div>

          <div className="mb-4">
            <span className="text-gray-400">Tech Stack</span>
            <span className="ml-2">🐍 Python</span>
            <span className="mx-2">⚛️ React/Next.js</span>
            <span className="mx-2">🗄️ SQL</span>
            <span className="mx-2">🔧 Django/FastAPI</span>
            <span className="mx-2">👁️ OpenCV</span>
          </div>

          <div className="mb-8">
            <span className="text-gray-400">Interests</span>
            <span className="ml-2">🌟 VTuber Industry</span>
            <span className="mx-2">⚾ Baseball/Softball</span>
            <span className="mx-2">👨‍⚖️ Umpiring (3 years)</span>
            <span className="mx-2">🇫🇷 Learning French & Japanese</span>
          </div>

          <p className="mb-6">
            I'm passionate about creating solutions that make a real impact.
            Currently developing scalable APIs and integrating AI solutions at
            Pactson, while working on VTuber and ACG-related side projects. I
            love rapid prototyping and iterating quickly - inspired by Elon
            Musk's approach to innovation.
          </p>

          <p className="mb-6">
            My average bug fix time is under 15 minutes, and I'm proud of my
            first-principle problem-solving approach. I've led critical projects
            and enjoy mentoring junior developers while keeping teams passionate
            about what they do.
          </p>

          <p className="mb-6">
            In my free time, I work on side projects while listening to VTuber
            streams - the perfect way to relax and recharge. I'm also an active
            baseball/softball player and certified umpire with leadership
            experience from being team captain.
          </p>

          <div className="flex items-center text-sm">
            <span className="bg-gray-700 px-2 py-1 rounded text-xs mr-3">
              Taipei, Taiwan
            </span>
            <span>
              Looking to collaborate with passionate teams. Feel free to reach
              out at hantanglin70036440@gmail.com
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
