"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Search, X, LayoutDashboard, Eye, Hash, BarChart3 } from "lucide-react";
import Link from "next/link";

interface SearchItem {
  name: string;
  category: "dashboard" | "view" | "field" | "chart";
  parentContext?: string;
  href: string;
}

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  searchIndex: SearchItem[];
}

const categoryConfig = {
  dashboard: { label: "Dashboards", icon: LayoutDashboard, color: "bg-hkm-gold/25 text-hkm-primary" },
  view: { label: "Views", icon: Eye, color: "bg-hkm-mauve/20 text-hkm-mauve" },
  field: { label: "Fields", icon: Hash, color: "bg-hkm-blush text-hkm-text-light" },
  chart: { label: "Chart Types", icon: BarChart3, color: "bg-hkm-gold/15 text-hkm-primary" },
};

export default function SearchModal({
  open,
  onClose,
  searchIndex,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchIndex.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.parentContext?.toLowerCase().includes(q)
    );
  }, [query, searchIndex]);

  const grouped = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {};
    for (const item of filtered) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return groups;
  }, [filtered]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-hkm-primary/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-hkm-white rounded-2xl shadow-2xl border border-hkm-border-light overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-hkm-border-light">
          <Search size={20} className="text-hkm-text-muted shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dashboards, views, fields, charts..."
            className="flex-1 text-base text-hkm-text bg-transparent outline-none placeholder:text-hkm-text-muted"
          />
          <button
            onClick={onClose}
            className="p-1 text-hkm-text-muted hover:text-hkm-primary transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() && filtered.length === 0 && (
            <div className="px-5 py-10 text-center text-sm text-hkm-text-muted">
              No results for &ldquo;{query}&rdquo;
            </div>
          )}

          {!query.trim() && (
            <div className="px-5 py-10 text-center text-sm text-hkm-text-muted">
              Start typing to search across all analytics content
            </div>
          )}

          {Object.entries(grouped).map(([category, items]) => {
            const config = categoryConfig[category as keyof typeof categoryConfig];
            if (!config) return null;

            return (
              <div key={category}>
                <div className="px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-hkm-text-muted bg-hkm-blush/50">
                  {config.label}
                </div>
                {items.slice(0, 8).map((item) => {
                  const Icon = config.icon;
                  return (
                    <Link
                      key={`${item.category}-${item.name}`}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-hkm-blush transition-colors"
                    >
                      <span
                        className={`flex items-center justify-center w-7 h-7 rounded-lg ${config.color}`}
                      >
                        <Icon size={14} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-hkm-primary truncate">
                          {item.name}
                        </div>
                        {item.parentContext && (
                          <div className="text-[11px] text-hkm-text-muted truncate">
                            {item.parentContext}
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-2.5 text-[11px] text-hkm-text-muted border-t border-hkm-border-light bg-hkm-blush/30 flex items-center gap-4">
          <span>
            <kbd className="px-1 py-0.5 font-mono text-[10px] bg-hkm-white border border-hkm-border rounded">
              ESC
            </kbd>{" "}
            to close
          </span>
          <span>
            <kbd className="px-1 py-0.5 font-mono text-[10px] bg-hkm-white border border-hkm-border rounded">
              Enter
            </kbd>{" "}
            to select
          </span>
        </div>
      </div>
    </div>
  );
}
