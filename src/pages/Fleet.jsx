import { Button } from "@/components/ui/button";

const cars = [
  {
    name: "Coming Soon",
    blurb: "Our first vehicle listings are being added. Check back soon or see our live availability on Turo.",
  },
];

export default function Fleet() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-3xl md:text-4xl">The Fleet</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Every vehicle we list is maintained, detailed, and ready for your next
        trip. Full availability, pricing, and photos live on Turo.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <div
            key={car.name}
            className="rounded-lg border border-border bg-card p-6"
          >
            <div className="mb-4 aspect-video rounded-md bg-secondary" />
            <h3 className="text-lg">{car.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{car.blurb}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button asChild size="lg">
          <a href="https://turo.com" target="_blank" rel="noreferrer">
            See Live Availability on Turo
          </a>
        </Button>
      </div>
    </section>
  );
}
