import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface DashboardCardProps {
  name: string;
  purpose: string;
  filters: string[];
  href: string;
}

export default function DashboardCard({
  name,
  purpose,
  filters,
  href,
}: DashboardCardProps) {
  return (
    <div className="group bg-hkm-white rounded-xl border border-hkm-border-light p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      {/* Name */}
      <h3 className="text-base font-bold text-hkm-primary mb-2">{name}</h3>

      {/* Purpose */}
      <p className="text-sm text-hkm-text-muted leading-relaxed mb-4">
        {purpose}
      </p>

      {/* Filter tags */}
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {filters.map((filter) => (
            <span
              key={filter}
              className="inline-block px-2 py-0.5 text-[11px] font-medium text-hkm-text-light bg-hkm-blush rounded-full"
            >
              {filter}
            </span>
          ))}
        </div>
      )}

      {/* View Details link */}
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-sm font-semibold text-hkm-primary hover:text-hkm-gold transition-colors"
      >
        View Details
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  );
}
