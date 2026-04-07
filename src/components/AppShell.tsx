"use client";

import { useState, useMemo, type ReactNode } from "react";
import Navigation from "./Navigation";
import SearchModal from "./SearchModal";
import { modelAreas, chartTypes } from "@/data";

interface SearchItem {
  name: string;
  category: "dashboard" | "view" | "field" | "chart";
  parentContext?: string;
  href: string;
}

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  const searchIndex = useMemo(() => {
    const items: SearchItem[] = [];

    for (const model of modelAreas) {
      // Dashboards
      for (const dash of model.dashboards) {
        items.push({
          name: dash.name,
          category: "dashboard",
          parentContext: model.name,
          href: `/${model.id}/dashboards/${dash.id}`,
        });
      }

      // Views
      for (const view of model.views) {
        items.push({
          name: view.displayName,
          category: "view",
          parentContext: model.name,
          href: `/${model.id}#views`,
        });

        // Key fields: first 5 dimensions + first 5 measures
        const keyFields = [
          ...view.dimensions.slice(0, 5),
          ...view.measures.slice(0, 5),
        ];
        for (const field of keyFields) {
          items.push({
            name: field.displayName,
            category: "field",
            parentContext: view.displayName,
            href: `/${model.id}#views`,
          });
        }
      }
    }

    // Chart types
    for (const chart of chartTypes) {
      items.push({
        name: chart.name,
        category: "chart",
        href: `/chart-guide/${chart.id}`,
      });
    }

    return items;
  }, []);

  return (
    <>
      <Navigation onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        searchIndex={searchIndex}
      />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>
      <footer className="border-t border-hkm-border bg-hkm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-hkm-text-muted">
          Powered by Snowplow Analytics &middot; {new Date().getFullYear()}
        </div>
      </footer>
    </>
  );
}
