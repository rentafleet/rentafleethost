import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/fleet", label: "Fleet" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const isHome = useLocation().pathname === "/";
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY >= 90);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY >= 90);
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  // Transparent overlay header is desktop-only (≥1200px), matching the reference site; smaller screens get a solid bar always.
  const headerClass = isHome
    ? `fixed inset-x-0 top-0 z-50 border-b-0 bg-background min-[1200px]:transition-shadow min-[1200px]:duration-300 ${
        isScrolled
          ? "min-[1200px]:bg-background min-[1200px]:shadow-[0_2px_18px_rgba(0,0,0,0.28)]"
          : "min-[1200px]:bg-transparent min-[1200px]:shadow-none"
      }`
    : "sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur";

  return (
    <header className={headerClass}>
      {isHome && (
        <div className="hidden min-[1200px]:block">
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#161a03]/60 to-transparent transition-opacity duration-300 ${isScrolled ? "opacity-0" : "opacity-100"}`}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 z-0 bg-[#161a03] transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      )}
      <div className="relative z-10 flex w-full items-center justify-between px-6 py-2 sm:py-4 md:px-8">
        <NavLink to="/" className="flex items-center gap-2">
          <img src="/images/RENTAFLEETLOGO.svg" alt="RentAFleet" className="h-[60px] w-auto" />
        </NavLink>

        <nav className="hidden flex-1 items-center justify-center gap-6 font-heading text-[0.9375rem] font-medium uppercase tracking-[0.06em] md:flex md:gap-3 lg:gap-5 xl:gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `transition-colors hover:text-primary ${isActive ? "text-primary" : "text-foreground"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <a
          href="https://turo.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-[0.4rem] font-heading text-[0.85rem] font-semibold uppercase leading-[2] tracking-[0.075em] text-primary-foreground transition-opacity hover:opacity-90"
        >
          Book on Turo
        </a>
      </div>
    </header>
  );
}
