import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const rentalSteps = [
  {
    title: "Choose your car",
    description: "Browse our current lineup and find the vehicle that matches your trip.",
  },
  {
    title: "Book on Turo",
    description: "Choose your dates and complete your reservation through Turo.",
  },
  {
    title: "Pick up and go",
    description: "Follow your host's pickup instructions, then enjoy the drive.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-6 py-16 text-center md:items-end md:py-0">
        <img
          src="/images/homepage.png"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-gradient-to-r from-[#161a03]/45 via-[#161a03]/20 to-[#161a03]/5"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl text-left md:pb-[14vh]">
          <h1 className="text-[1.6rem] font-medium leading-[1.1] tracking-[0.08em] md:text-[2.4rem]">
            Drive something <span className="text-primary">different.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[0.95rem] text-muted-foreground md:text-[1.12rem]">
            Premium cars, ready for your next trip.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-start gap-[0.9rem]">
            <Button asChild size="lg" className="rounded-lg px-[1.9rem] font-bold">
              <a href="https://turo.com" target="_blank" rel="noreferrer">
                Book on Turo
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-lg border-2 border-white/80 bg-white/10 px-[1.9rem] font-bold text-white hover:bg-white hover:text-background"
            >
              <Link to="/fleet">View the Fleet</Link>
            </Button>
          </div>
          {/* Reserves the trust-row height for when review data is wired up via API; hidden until then */}
          <p
            aria-hidden="true"
            className="invisible mt-[1.4rem] flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.98rem]"
          >
            <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span>5.0 &middot; 0 5-star reviews &middot; Serving Charlotte, NC</span>
          </p>
        </div>
        <button
          type="button"
          aria-label="Scroll to how it works"
          title="Scroll to how it works"
          onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-20 left-1/2 z-20 flex size-12 -translate-x-1/2 items-center justify-center text-white/90 drop-shadow-[0_1px_5px_rgba(0,0,0,0.5)] transition-opacity hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hero-scroll-cue lg:bottom-6"
        >
          <ChevronDown aria-hidden="true" size={40} strokeWidth={2} />
        </button>
      </section>

      <section id="how-it-works" className="scroll-mt-20 border-t border-border bg-white px-6 py-14 text-[#161a03]">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8 text-center">
            <p className="mb-1 font-heading text-[0.8rem] font-semibold uppercase tracking-[2px] text-[#8a7000]">
              How it works
            </p>
            <h2 className="font-heading text-3xl font-bold normal-case tracking-normal text-[#161a03] md:text-5xl">
              Your next ride in three steps
            </h2>
          </header>
          <ol className="m-0 grid list-none gap-6 p-0 lg:grid-cols-3 lg:gap-6">
            {rentalSteps.map((step, index) => (
              <li
                key={step.title}
                className="flex items-start gap-4 text-left lg:flex-col lg:items-center lg:px-4 lg:text-center"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#161a03] font-heading text-lg font-bold text-primary lg:mb-4 lg:size-[52px] lg:text-xl">
                  {index + 1}
                </span>
                <div className="pt-0.5 lg:pt-0">
                  <h3 className="mb-1 font-heading text-xl font-bold normal-case tracking-normal text-[#161a03]">
                    {step.title}
                  </h3>
                  <p className="m-0 text-base leading-relaxed text-[#5f636a] md:text-lg">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-[#dfe2d2] bg-[#eef0e5] px-6 py-16 text-[#161a03]">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-sm uppercase tracking-[0.2em] text-[#8a7000]">
              The RentAFleet Journal
            </p>
            <h2 className="mt-2 text-2xl text-[#161a03] md:text-3xl">Stories from behind the wheel</h2>
            <p className="mt-3 max-w-xl text-sm text-[#535649]">
              Meet the people and care behind every vehicle in the fleet.
            </p>
          </div>
          <Button asChild variant="outline" size="lg" className="border-[#161a03] text-[#161a03] hover:bg-[#161a03] hover:text-white">
            <Link to="/blog">Read the Blog</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
