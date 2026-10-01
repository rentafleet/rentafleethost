import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Persistent two-button action bar on small screens only.
export default function MobileActionBar() {
  return (
    <div
      role="region"
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-[1030] flex shadow-[0_-2px_12px_rgba(0,0,0,0.18)] lg:hidden"
    >
      <Link
        to="/fleet"
        className="flex min-h-14 flex-1 items-center justify-center gap-1.5 bg-background text-base font-bold text-foreground no-underline"
      >
        View the Fleet
      </Link>
      <a
        href="https://turo.com"
        target="_blank"
        rel="noreferrer"
        className="flex min-h-14 flex-1 items-center justify-center gap-1.5 bg-primary text-base font-bold text-primary-foreground no-underline"
      >
        Book on Turo
        <ArrowRight aria-hidden="true" size={18} />
      </a>
    </div>
  );
}
