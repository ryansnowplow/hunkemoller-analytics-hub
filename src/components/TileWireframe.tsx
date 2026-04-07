"use client";

import { useState } from "react";
import {
  Hash,
  BarChart3,
  LineChart,
  PieChart,
  Table,
  MapPin,
  Columns3,
  Filter,
  type LucideIcon,
} from "lucide-react";

interface Tile {
  name: string;
  type: string;
  description?: string;
  calculation?: string;
}

interface TileWireframeProps {
  tiles: Tile[];
}

const tileIconMap: Record<string, LucideIcon> = {
  kpi: Hash,
  bar: BarChart3,
  line: LineChart,
  pie: PieChart,
  table: Table,
  area: LineChart,
  scatter: PieChart,
  map: MapPin,
  column: Columns3,
  funnel: Filter,
};

const typeLabels: Record<string, string> = {
  kpi: "KPI / Single Value",
  bar: "Bar Chart",
  line: "Line Chart",
  pie: "Pie Chart",
  table: "Table",
  area: "Area Chart",
  scatter: "Scatter Plot",
  map: "Map",
  column: "Column Chart",
  funnel: "Funnel",
};

/* ------------------------------------------------------------------ */
/*  Mini chart SVGs                                                    */
/* ------------------------------------------------------------------ */

const c1 = "#6A0438"; // primary
const c2 = "#B0798E"; // mauve
const c3 = "#CCB497"; // gold
const cM = "#A67D8F"; // muted

function MiniBar({ active }: { active: boolean }) {
  const o = active ? 1 : 0.45;
  return (
    <svg viewBox="0 0 80 40" className="w-full h-full" style={{ opacity: o }}>
      <rect x="4" y="20" width="10" height="20" rx="2" fill={c2} />
      <rect x="18" y="8" width="10" height="32" rx="2" fill={c1} />
      <rect x="32" y="14" width="10" height="26" rx="2" fill={c3} />
      <rect x="46" y="22" width="10" height="18" rx="2" fill={c2} />
      <rect x="60" y="4" width="10" height="36" rx="2" fill={c1} />
    </svg>
  );
}

function MiniLine({ active }: { active: boolean }) {
  const o = active ? 1 : 0.45;
  return (
    <svg viewBox="0 0 80 40" className="w-full h-full" style={{ opacity: o }}>
      <polyline
        points="4,32 16,24 28,28 40,14 52,18 64,8 76,12"
        fill="none"
        stroke={c1}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="4,34 16,30 28,32 40,22 52,26 64,20 76,24"
        fill="none"
        stroke={c3}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="3 2"
      />
    </svg>
  );
}

function MiniArea({ active }: { active: boolean }) {
  const o = active ? 1 : 0.45;
  return (
    <svg viewBox="0 0 80 40" className="w-full h-full" style={{ opacity: o }}>
      <path
        d="M4,36 L16,28 L28,30 L40,18 L52,22 L64,12 L76,16 L76,40 L4,40 Z"
        fill={c1}
        fillOpacity="0.2"
      />
      <polyline
        points="4,36 16,28 28,30 40,18 52,22 64,12 76,16"
        fill="none"
        stroke={c1}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MiniPie({ active }: { active: boolean }) {
  const o = active ? 1 : 0.45;
  return (
    <svg viewBox="0 0 40 40" className="w-full h-full" style={{ opacity: o }}>
      {/* 75% slice */}
      <circle cx="20" cy="20" r="16" fill={c2} />
      <path
        d="M20,20 L20,4 A16,16 0 1,1 4.58,28 Z"
        fill={c1}
      />
      {/* 25% slice is the remaining c2 */}
    </svg>
  );
}

function MiniKpi({ active, label }: { active: boolean; label: string }) {
  const o = active ? 1 : 0.45;
  // Generate a plausible number from the tile name
  const seed = label.length;
  const displays = ["12.4K", "68.3%", "€24.7K", "3.2", "847", "72%", "€156K", "4.8K"];
  const display = displays[seed % displays.length];
  return (
    <div className="flex flex-col items-center justify-center h-full" style={{ opacity: o }}>
      <span className="text-lg font-extrabold text-hkm-primary leading-none">
        {display}
      </span>
    </div>
  );
}

function MiniTable({ active }: { active: boolean }) {
  const o = active ? 1 : 0.45;
  return (
    <svg viewBox="0 0 100 36" className="w-full h-full" style={{ opacity: o }}>
      {/* Header */}
      <rect x="2" y="2" width="96" height="8" rx="2" fill={c1} fillOpacity="0.15" />
      <rect x="4" y="4" width="16" height="4" rx="1" fill={c1} fillOpacity="0.5" />
      <rect x="26" y="4" width="20" height="4" rx="1" fill={c1} fillOpacity="0.5" />
      <rect x="52" y="4" width="18" height="4" rx="1" fill={c1} fillOpacity="0.5" />
      <rect x="76" y="4" width="18" height="4" rx="1" fill={c1} fillOpacity="0.5" />
      {/* Rows */}
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <rect x="2" y={12 + r * 8} width="96" height="7" rx="1" fill={r % 2 === 0 ? "#F2E3E3" : "white"} fillOpacity="0.6" />
          <rect x="4" y={14 + r * 8} width="14" height="3" rx="1" fill={cM} fillOpacity="0.5" />
          <rect x="26" y={14 + r * 8} width={18 - r * 3} height="3" rx="1" fill={c3} />
          <rect x="52" y={14 + r * 8} width={16 - r * 2} height="3" rx="1" fill={c2} />
          <rect x="76" y={14 + r * 8} width={14 - r * 2} height="3" rx="1" fill={cM} fillOpacity="0.4" />
        </g>
      ))}
    </svg>
  );
}

function MiniColumn({ active }: { active: boolean }) {
  const o = active ? 1 : 0.45;
  return (
    <svg viewBox="0 0 80 40" className="w-full h-full" style={{ opacity: o }}>
      <rect x="8" y="22" width="8" height="16" rx="1" fill={c1} />
      <rect x="18" y="28" width="8" height="10" rx="1" fill={c2} />
      <rect x="30" y="10" width="8" height="28" rx="1" fill={c1} />
      <rect x="40" y="18" width="8" height="20" rx="1" fill={c2} />
      <rect x="52" y="16" width="8" height="22" rx="1" fill={c1} />
      <rect x="62" y="24" width="8" height="14" rx="1" fill={c2} />
    </svg>
  );
}

function MiniFunnel({ active }: { active: boolean }) {
  const o = active ? 1 : 0.45;
  return (
    <svg viewBox="0 0 80 40" className="w-full h-full" style={{ opacity: o }}>
      <rect x="4" y="2" width="72" height="8" rx="2" fill={c1} />
      <rect x="12" y="12" width="56" height="8" rx="2" fill={c2} />
      <rect x="20" y="22" width="40" height="8" rx="2" fill={c3} />
      <rect x="28" y="32" width="24" height="7" rx="2" fill={cM} />
    </svg>
  );
}

function MiniMap({ active }: { active: boolean }) {
  const o = active ? 1 : 0.45;
  return (
    <svg viewBox="0 0 80 40" className="w-full h-full" style={{ opacity: o }}>
      {/* Simplified map shapes */}
      <rect x="2" y="2" width="76" height="36" rx="4" fill="#F2E3E3" />
      <ellipse cx="28" cy="16" rx="12" ry="8" fill={c2} fillOpacity="0.4" />
      <ellipse cx="55" cy="22" rx="10" ry="7" fill={c1} fillOpacity="0.3" />
      <circle cx="24" cy="14" r="3" fill={c1} />
      <circle cx="52" cy="20" r="2.5" fill={c1} fillOpacity="0.7" />
      <circle cx="40" cy="28" r="2" fill={c3} />
      <circle cx="62" cy="12" r="1.5" fill={c2} />
    </svg>
  );
}

function MiniScatter({ active }: { active: boolean }) {
  const o = active ? 1 : 0.45;
  return (
    <svg viewBox="0 0 80 40" className="w-full h-full" style={{ opacity: o }}>
      <circle cx="12" cy="28" r="3" fill={c1} />
      <circle cx="22" cy="22" r="2.5" fill={c2} />
      <circle cx="30" cy="30" r="2" fill={c3} />
      <circle cx="38" cy="16" r="3.5" fill={c1} />
      <circle cx="48" cy="20" r="2" fill={c2} />
      <circle cx="56" cy="10" r="3" fill={c1} />
      <circle cx="64" cy="14" r="2.5" fill={c3} />
      <circle cx="72" cy="8" r="2" fill={c2} />
    </svg>
  );
}

function MiniChart({ type, active, label }: { type: string; active: boolean; label: string }) {
  switch (type) {
    case "kpi":
      return <MiniKpi active={active} label={label} />;
    case "bar":
      return <MiniBar active={active} />;
    case "line":
      return <MiniLine active={active} />;
    case "area":
      return <MiniArea active={active} />;
    case "pie":
      return <MiniPie active={active} />;
    case "table":
      return <MiniTable active={active} />;
    case "column":
      return <MiniColumn active={active} />;
    case "funnel":
      return <MiniFunnel active={active} />;
    case "map":
      return <MiniMap active={active} />;
    case "scatter":
      return <MiniScatter active={active} />;
    default:
      return <MiniBar active={active} />;
  }
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function TileWireframe({ tiles }: TileWireframeProps) {
  const kpis = tiles.filter((t) => t.type === "kpi");
  const charts = tiles.filter(
    (t) => !["kpi", "table"].includes(t.type)
  );
  const tables = tiles.filter((t) => t.type === "table");

  return (
    <div className="bg-hkm-blush rounded-xl border border-hkm-border-light p-4 space-y-3">
      {/* KPI row */}
      {kpis.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {kpis.map((tile, i) => (
            <TilePlaceholder key={i} tile={tile} className="h-[72px]" />
          ))}
        </div>
      )}

      {/* Charts grid */}
      {charts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {charts.map((tile, i) => (
            <TilePlaceholder key={i} tile={tile} className="h-36" />
          ))}
        </div>
      )}

      {/* Tables full-width */}
      {tables.length > 0 && (
        <div className="space-y-2">
          {tables.map((tile, i) => (
            <TilePlaceholder key={i} tile={tile} className="h-24" />
          ))}
        </div>
      )}
    </div>
  );
}

function TilePlaceholder({
  tile,
  className = "",
}: {
  tile: Tile;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = tileIconMap[tile.type] ?? BarChart3;
  const hasDetails = tile.description || tile.calculation;

  return (
    <div
      className={`relative flex flex-col bg-hkm-white border rounded-lg overflow-hidden transition-all duration-150 ${
        hovered
          ? "border-hkm-gold shadow-md ring-1 ring-hkm-gold/30 z-10"
          : "border-hkm-border"
      } ${hasDetails ? "cursor-pointer" : ""} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Chart visual */}
      <div className="flex-1 flex items-center justify-center px-4 py-1">
        <div className={`${tile.type === "kpi" ? "w-full h-full" : "w-3/4 h-3/4"}`}>
          <MiniChart type={tile.type} active={hovered} label={tile.name} />
        </div>
      </div>

      {/* Label bar */}
      <div className={`px-2 py-1 text-center border-t transition-colors duration-150 ${
        hovered ? "border-hkm-gold/30 bg-hkm-blush" : "border-hkm-border-light bg-hkm-bg"
      }`}>
        <span
          className={`text-[9px] font-semibold leading-tight line-clamp-1 transition-colors duration-150 ${
            hovered ? "text-hkm-primary" : "text-hkm-text-muted"
          }`}
        >
          {tile.name}
        </span>
      </div>

      {/* Hover tooltip */}
      {hovered && hasDetails && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 sm:w-80 bg-hkm-white border border-hkm-border rounded-xl shadow-xl p-4 z-50 pointer-events-none">
          {/* Arrow */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-hkm-border" />
          <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-[1px] w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-hkm-white" />

          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-hkm-blush">
              <Icon size={13} className="text-hkm-primary" />
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-hkm-primary truncate">
                {tile.name}
              </h4>
              <span className="text-[10px] text-hkm-text-muted">
                {typeLabels[tile.type] ?? tile.type}
              </span>
            </div>
          </div>

          {/* Description */}
          {tile.description && (
            <div className="mb-2">
              <p className="text-[11px] text-hkm-text-light leading-relaxed">
                {tile.description}
              </p>
            </div>
          )}

          {/* Calculation */}
          {tile.calculation && (() => {
            const parts = tile.calculation.split(': ');
            const hasMeasureName = parts.length > 1;
            const measureName = hasMeasureName ? parts[0] : null;
            const calcText = hasMeasureName ? parts.slice(1).join(': ') : tile.calculation;
            return (
              <div className="bg-hkm-code-bg rounded-md px-3 py-2">
                <span className="text-[9px] font-semibold text-hkm-gold uppercase tracking-wider block mb-1">
                  How it&apos;s calculated
                </span>
                <p className="text-[11px] text-hkm-blush leading-relaxed">
                  {calcText}
                </p>
                {measureName && (
                  <p className="text-[9px] text-hkm-text-muted mt-1.5 font-mono">
                    Looker field: {measureName}
                  </p>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
