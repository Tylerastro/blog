export default function UnderConstructionSection() {
  return (
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
  );
}
