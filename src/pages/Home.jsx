import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-background px-6 py-24 text-center md:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 font-heading text-sm uppercase tracking-[0.3em] text-primary">
            Charlotte, NC
          </p>
          <h1 className="text-4xl leading-tight md:text-6xl">
            Drive something <span className="text-primary">different.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            RentAFleet puts you behind the wheel of hand-picked vehicles,
            booked entirely through Turo. No dealerships, no hassle &mdash;
            just a ride that fits the moment.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <a href="https://turo.com" target="_blank" rel="noreferrer">
                Book on Turo
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/fleet">View the Fleet</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-8 text-center md:grid-cols-3">
          <div>
            <h2 className="text-xl text-primary">01</h2>
            <h3 className="mt-2 text-lg">Browse the Fleet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Check out our current lineup and find the vehicle that matches
              your trip.
            </p>
          </div>
          <div>
            <h2 className="text-xl text-primary">02</h2>
            <h3 className="mt-2 text-lg">Book on Turo</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              All reservations, messaging, and payment run through Turo's
              secure platform.
            </p>
          </div>
          <div>
            <h2 className="text-xl text-primary">03</h2>
            <h3 className="mt-2 text-lg">Pick Up &amp; Go</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Meet us for a quick handoff and hit the road in a car that's
              ready for anything.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
