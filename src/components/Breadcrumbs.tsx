import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-hkm-text-muted">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-hkm-primary transition-colors"
      >
        <Home size={12} />
        <span>Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-1.5">
            <ChevronRight size={12} className="text-hkm-border" />
            {isLast || !item.href ? (
              <span className="text-hkm-text-light font-medium">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-hkm-primary transition-colors"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
