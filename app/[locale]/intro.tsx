import Positions from "./positions";

export default async function Intro() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            HI! I am
          </h1>
          <Positions />
        </div>
      </div>
    </section>
  );
}
