"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Table2 } from "lucide-react";
import FieldTable from "./FieldTable";
import type { View } from "@/data/types";

interface ViewAccordionProps {
  view: View;
  defaultOpen?: boolean;
  index: number;
}

function mapFields(fields: View["dimensions"] | View["measures"]) {
  return fields.map((f) => ({
    name: f.name,
    displayName: f.displayName,
    type: f.fieldType ?? f.type,
    fieldType: f.type as "dimension" | "measure",
    description: f.description,
    sql: f.sql,
  }));
}

export default function ViewAccordion({
  view,
  defaultOpen = false,
  index,
}: ViewAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(
    defaultOpen ? undefined : 0
  );

  useEffect(() => {
    if (open) {
      const el = contentRef.current;
      if (el) {
        setHeight(el.scrollHeight);
        const timer = setTimeout(() => setHeight(undefined), 300);
        return () => clearTimeout(timer);
      }
    } else {
      const el = contentRef.current;
      if (el) {
        setHeight(el.scrollHeight);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setHeight(0));
        });
      }
    }
  }, [open]);

  const isEven = index % 2 === 0;

  return (
    <div
      className={`rounded-xl border border-hkm-border-light overflow-hidden ${
        isEven ? "bg-hkm-white" : "bg-hkm-blush/30"
      }`}
    >
      {/* Summary / Toggle */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-hkm-blush/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Table2 size={16} className="text-hkm-primary flex-shrink-0" />
          <div>
            <span className="text-sm font-bold text-hkm-primary">
              {view.displayName}
            </span>
            <span className="block text-xs text-hkm-text-muted font-mono mt-0.5">
              {view.sourceTable}
            </span>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`text-hkm-text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expandable Content */}
      <div
        ref={contentRef}
        style={{
          height: height !== undefined ? `${height}px` : "auto",
          overflow: "hidden",
          transition: "height 300ms ease",
        }}
      >
        <div className="px-5 pb-5 space-y-5">
          {/* Description */}
          {view.description && (
            <p className="text-sm text-hkm-text-light leading-relaxed border-l-2 border-hkm-gold pl-3">
              {view.description}
            </p>
          )}

          {/* Dimensions */}
          {view.dimensions.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-hkm-text-muted uppercase tracking-wider mb-2">
                Dimensions ({view.dimensions.length})
              </h4>
              <FieldTable fields={mapFields(view.dimensions)} />
            </div>
          )}

          {/* Measures */}
          {view.measures.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-hkm-text-muted uppercase tracking-wider mb-2">
                Measures ({view.measures.length})
              </h4>
              <FieldTable fields={mapFields(view.measures)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
