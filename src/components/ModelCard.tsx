import Link from "next/link";
import { type LucideIcon, LayoutDashboard, Eye } from "lucide-react";

interface ModelCardProps {
  name: string;
  tagline: string;
  icon: LucideIcon;
  dashboardCount: number;
  viewCount: number;
  href: string;
}

export default function ModelCard({
  name,
  tagline,
  icon: Icon,
  dashboardCount,
  viewCount,
  href,
}: ModelCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="bg-hkm-white rounded-xl border border-hkm-border-light p-6 shadow-sm transition-all duration-200 group-hover:shadow-md group-hover:border-hkm-gold group-hover:-translate-y-1">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-hkm-blush flex items-center justify-center mb-4">
          <Icon size={28} className="text-hkm-primary" />
        </div>

        {/* Name & tagline */}
        <h3 className="text-lg font-bold text-hkm-primary mb-1">{name}</h3>
        <p className="text-sm text-hkm-text-muted leading-relaxed mb-5">
          {tagline}
        </p>

        {/* Count badges */}
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-hkm-text-light bg-hkm-blush rounded-full">
            <LayoutDashboard size={12} />
            {dashboardCount} dashboards
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-hkm-text-light bg-hkm-blush rounded-full">
            <Eye size={12} />
            {viewCount} views
          </span>
        </div>
      </div>
    </Link>
  );
}
