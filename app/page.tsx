import BlackHole from "@/components/BlackHole";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <main className="bg-black-100 snap-mandatory snap-y h-screen overflow-y-scroll scroll-smooth">
      <section className="h-[100svh] flex flex-col snap-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <BlackHole />
        </div>
      </section>
      <section className="h-[100svh] flex flex-col snap-center relative overflow-hidden items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-2xl font-semibold text-white drop-shadow-lg">
            Still under construction...
          </h2>
          <p className="text-lg text-gray-300 mt-2 drop-shadow-lg">
            Come back soon to see what I've been working on!
          </p>
        </div>
      </section>
    </main>
  );
}
