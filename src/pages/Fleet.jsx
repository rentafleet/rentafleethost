import { useEffect, useState } from "react";
import { ArrowUpRight, CarFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sanityClient, sanityImage } from "@/lib/sanity";

const vehicleQuery = `*[_type == "vehicle" && isActive == true] | order(sortOrder asc, title asc) {
  _id,
  title,
  make,
  model,
  year,
  description,
  image,
  turoUrl
}`;

export default function Fleet() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    sanityClient
      .fetch(vehicleQuery)
      .then((results) => {
        if (isCurrent) setVehicles(results);
      })
      .catch(() => {
        if (isCurrent) setHasError(true);
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-3xl md:text-4xl">The Fleet</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Every vehicle we list is maintained, detailed, and ready for your next
        trip. Full availability, pricing, and photos live on Turo.
      </p>

      {loading ? (
        <p className="mt-12 text-sm text-muted-foreground" role="status">
          Loading vehicles...
        </p>
      ) : hasError ? (
        <p className="mt-12 text-sm text-muted-foreground" role="status">
          Fleet details are temporarily unavailable. Please check back shortly.
        </p>
      ) : vehicles.length ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <article key={vehicle._id} className="overflow-hidden rounded-lg border border-border bg-card">
              {vehicle.image ? (
                <img
                  src={sanityImage(vehicle.image).width(900).height(600).fit("crop").url()}
                  alt={vehicle.image.alt || vehicle.title}
                  className="aspect-[3/2] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[3/2] items-center justify-center bg-secondary text-primary">
                  <CarFront aria-hidden="true" size={44} strokeWidth={1.25} />
                </div>
              )}
              <div className="p-6">
                <p className="font-heading text-sm uppercase text-primary">
                  {[vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ")}
                </p>
                <h2 className="mt-2 text-xl">{vehicle.title}</h2>
                {vehicle.description && (
                  <p className="mt-3 text-sm text-muted-foreground">{vehicle.description}</p>
                )}
                {vehicle.turoUrl && (
                  <a
                    href={vehicle.turoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 font-heading text-sm uppercase text-primary hover:underline"
                  >
                    View on Turo <ArrowUpRight aria-hidden="true" size={16} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-12 border-y border-border py-12 text-center">
          <p className="font-heading text-lg uppercase">New rides are on the way</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Check back soon for the latest vehicles in our fleet.
          </p>
        </div>
      )}

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
