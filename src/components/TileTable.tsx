import {
  Hash,
  BarChart3,
  LineChart,
  PieChart,
  Table,
  type LucideIcon,
} from "lucide-react";

interface TileDetail {
  name: string;
  type: string;
  description: string;
  calculation?: string;
}

interface TileTableProps {
  tiles: TileDetail[];
}

const typeIconMap: Record<string, LucideIcon> = {
  kpi: Hash,
  bar: BarChart3,
  line: LineChart,
  pie: PieChart,
  table: Table,
  area: LineChart,
};

const typeColorMap: Record<string, string> = {
  kpi: "bg-hkm-gold/30 text-hkm-primary",
  bar: "bg-hkm-mauve/20 text-hkm-mauve",
  line: "bg-hkm-blush text-hkm-primary",
  pie: "bg-hkm-gold/20 text-hkm-primary",
  table: "bg-hkm-blush text-hkm-text-light",
  area: "bg-hkm-mauve/15 text-hkm-mauve",
};

export default function TileTable({ tiles }: TileTableProps) {
  if (tiles.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-hkm-border-light">
      <table className="w-full text-sm">
        <thead>
          <tr className="sticky top-0 bg-hkm-blush text-left">
            <th className="px-4 py-3 font-semibold text-hkm-primary">Tile Name</th>
            <th className="px-4 py-3 font-semibold text-hkm-primary">Type</th>
            <th className="px-4 py-3 font-semibold text-hkm-primary">Description</th>
            <th className="px-4 py-3 font-semibold text-hkm-primary">Calculation</th>
          </tr>
        </thead>
        <tbody>
          {tiles.map((tile, index) => {
            const typeLower = tile.type.toLowerCase();
            const Icon = typeIconMap[typeLower] ?? BarChart3;
            const colorClass =
              typeColorMap[typeLower] ?? "bg-hkm-blush text-hkm-text-light";

            return (
              <tr
                key={tile.name}
                className={index % 2 === 0 ? "bg-hkm-white" : "bg-hkm-blush/40"}
              >
                <td className="px-4 py-3 font-medium text-hkm-primary">
                  {tile.name}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-semibold rounded-full ${colorClass}`}
                  >
                    <Icon size={12} />
                    {tile.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-hkm-text-light max-w-sm">
                  {tile.description}
                </td>
                <td className="px-4 py-3">
                  {tile.calculation ? (
                    <code className="block text-xs font-mono bg-hkm-code-bg text-hkm-blush px-2 py-1.5 rounded whitespace-pre-wrap max-w-xs">
                      {tile.calculation}
                    </code>
                  ) : (
                    <span className="text-hkm-text-muted">&mdash;</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
