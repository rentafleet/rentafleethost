import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="text-3xl md:text-4xl">Get In Touch</h1>
      <p className="mt-6 text-muted-foreground">
        All bookings and messaging happen through Turo. Reach out there for
        fastest response, or email us directly below.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button asChild size="lg">
          <a href="https://turo.com" target="_blank" rel="noreferrer">
            Message on Turo
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="mailto:hello@rentafleet.host">Email Us</a>
        </Button>
      </div>
    </section>
  );
}
