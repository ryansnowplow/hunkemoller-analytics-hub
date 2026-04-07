import Link from "next/link";
import { type LucideIcon } from "lucide-react";

interface ChartTypeCardProps {
  name: string;
  icon: LucideIcon;
  bestFor: string;
  href: string;
  requiresConfigEditor?: boolean;
}

export default function ChartTypeCard({
  name,
  icon: Icon,
  bestFor,
  href,
  requiresConfigEditor,
}: ChartTypeCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="bg-hkm-white rounded-xl border border-hkm-border-light p-5 transition-all duration-200 hover:shadow-md hover:border-hkm-gold hover:-translate-y-0.5">
        <div className="flex items-start justify-between mb-3">
          {/* Icon area */}
          <div className="w-12 h-12 rounded-lg bg-hkm-blush flex items-center justify-center group-hover:bg-hkm-gold/20 transition-colors">
            <Icon size={24} className="text-hkm-primary" />
          </div>
          {requiresConfigEditor && (
            <span className="text-[9px] font-semibold uppercase tracking-wider text-hkm-mauve bg-hkm-mauve/15 px-2 py-0.5 rounded-full">
              Config Editor
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-sm font-bold text-hkm-primary mb-1">{name}</h3>

        {/* Best for */}
        <p className="text-xs text-hkm-text-muted leading-relaxed">
          {bestFor}
        </p>
      </div>
    </Link>
  );
}
