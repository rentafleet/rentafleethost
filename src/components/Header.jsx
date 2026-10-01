import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/fleet", label: "Fleet" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2">
          <img src="/images/RENTAFLEETLOGO.svg" alt="RentAFleet" className="h-9 w-auto" />
        </NavLink>

        <nav className="hidden items-center gap-8 font-heading text-sm uppercase tracking-wide md:flex">
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
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 font-heading text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
        >
          Book on Turo
        </a>
      </div>
    </header>
  );
}
