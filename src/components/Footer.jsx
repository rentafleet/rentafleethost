import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-start md:justify-between">
        <div>
          <img src="/images/RENTAFLEETLOGO.svg" alt="RentAFleet" className="h-8 w-auto" />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Premium vehicles, hosted on Turo. Book your next ride with RentAFleet.
          </p>
        </div>

        <div className="flex gap-12">
          <div>
            <h3 className="mb-3 text-sm font-heading">Site</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li><Link to="/fleet" className="hover:text-primary">Fleet</Link></li>
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-heading">Book</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://turo.com" target="_blank" rel="noreferrer" className="hover:text-primary">
                  Our Turo Page
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 py-4 text-center text-xs text-muted-foreground">
        &copy; {year} RentAFleet. All rights reserved.
      </div>
    </footer>
  );
}
