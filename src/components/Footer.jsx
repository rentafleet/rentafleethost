import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok } from "react-icons/fa6";

const QUICK_LINKS = [
  ["/", "Home"],
  ["/fleet", "Fleet"],
  ["/about", "About"],
  ["/blog", "Blog"],
  ["/contact", "Contact"],
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0c1001] text-muted-foreground">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-[clamp(30px,4vw,56px)] px-[clamp(18px,4vw,56px)] pt-16 pb-[30px] text-center md:grid-cols-[1.3fr_1.4fr_0.8fr] md:text-left">
        {/* Column 1: brand, description, contact, socials */}
        <div>
          <img
            src="/images/RENTAFLEETLOGO.svg"
            alt="RentAFleet"
            className="mx-auto mb-[22px] h-12 w-auto md:mx-0"
          />
          <p className="mx-auto max-w-xs text-sm text-muted-foreground md:mx-0">
            Premium vehicles, hosted on Turo. Book your next ride with RentAFleet.
          </p>
          <a
            href="mailto:turo@rentafleet.host"
            className="mt-2 inline-block text-[13.5px] text-muted-foreground hover:text-foreground"
          >
            turo@rentafleet.host
          </a>
          <div className="mt-5 flex justify-center gap-[18px] md:justify-start">
            <a
              href="https://www.instagram.com/renta_fleet"
              target="_blank"
              rel="noreferrer"
              aria-label="RentAFleet on Instagram"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <FaInstagram aria-hidden="true" size={22} />
            </a>
            <a
              href="https://www.tiktok.com/@renta_fleet"
              target="_blank"
              rel="noreferrer"
              aria-label="RentAFleet on TikTok"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <FaTiktok aria-hidden="true" size={20} />
            </a>
          </div>
        </div>

        {/* Column 2: reserved for future service-area coverage */}
        <div />

        {/* Column 3: quick links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="mb-4 w-full border-b border-white/[0.16] pb-3 font-heading text-[11.5px] font-semibold uppercase tracking-[0.2em] text-primary">
            Quick Links
          </h3>
          {QUICK_LINKS.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className="py-[5.5px] font-heading text-[13.5px] font-medium uppercase tracking-[0.06em] text-muted-foreground hover:text-primary"
            >
              {label}
            </Link>
          ))}
          <a
            href="https://turo.com"
            target="_blank"
            rel="noreferrer"
            className="py-[5.5px] font-heading text-[13.5px] font-medium uppercase tracking-[0.06em] text-muted-foreground hover:text-primary"
          >
            Our Turo Page
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-wrap justify-center gap-4 border-t border-white/[0.14] px-[clamp(18px,4vw,56px)] py-4 text-center text-[11.5px] text-muted-foreground md:justify-between md:text-left">
        <span>&copy; {year} RentAFleet. All rights reserved.</span>
        <span>
          Charlotte, NC &middot; Icons by{" "}
          <a
            href="https://icons8.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            Icons8
          </a>
        </span>
      </div>
    </footer>
  );
}
