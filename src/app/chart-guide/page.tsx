import AppShell from "@/components/AppShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import ChartTypeCard from "@/components/ChartTypeCard";
import ChartDecisionTree from "@/components/ChartDecisionTree";
import { chartTypes } from "@/data/charts";
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Hash,
  Table,
  CircleDot,
  AreaChart,
  Filter,
  Circle,
  BarChart,
  BarChart2,
  Map,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  BarChart3,
  TrendingUp,
  PieChart,
  Hash,
  Table,
  CircleDot,
  AreaChart,
  Filter,
  Circle,
  BarChart,
  BarChart2,
  Map,
};

export default function ChartGuidePage() {
  return (
    <AppShell>
      <Breadcrumbs items={[{ label: "Chart Guide" }]} />

      {/* Hero banner */}
      <section className="relative mt-6 rounded-2xl bg-hkm-blush px-8 py-10 sm:px-12 sm:py-14 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://s7g10.scene7.com/is/image/hunkemoller/2613773856-HB_Small-Affordable_Comfort-Q1-2026-HB_Retina-D:3-1?wid=1920&hei=640&qlt=85&bfc=on&network=on"
          alt=""
          className="absolute right-0 top-0 h-full w-[45%] object-cover object-center rounded-r-2xl"
        />
        <div className="absolute right-0 top-0 h-full w-[45%] bg-gradient-to-r from-hkm-blush via-hkm-blush/80 to-transparent rounded-r-2xl" />

        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-hkm-primary mb-3">
            Looker Chart Builder Guide
          </h1>
          <p className="text-sm sm:text-base text-hkm-text leading-relaxed max-w-2xl">
            A practical cookbook for building visualisations in Looker. Select a
            chart type to see when to use it, step-by-step setup instructions, and
            ready-to-use LookML config.
          </p>
        </div>
      </section>

      {/* Decision Tree */}
      <section className="mt-10">
        <h2 className="text-lg font-bold text-hkm-primary mb-4">
          Which chart should I use?
        </h2>
        <p className="text-sm text-hkm-text-muted mb-6">
          Answer a few questions about your data and we&apos;ll recommend the right Looker chart type.
        </p>
        <ChartDecisionTree />
      </section>

      {/* Standard charts */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-hkm-primary mb-4">
          Standard Charts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chartTypes
            .filter((c) => !c.requiresConfigEditor)
            .map((chart) => {
              const Icon = iconMap[chart.icon] ?? BarChart3;
              return (
                <ChartTypeCard
                  key={chart.id}
                  name={chart.name}
                  icon={Icon}
                  bestFor={chart.bestFor}
                  href={`/chart-guide/${chart.id}`}
                />
              );
            })}
        </div>
      </section>

      {/* Config Editor charts */}
      <section className="mt-12">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-bold text-hkm-primary">
            Chart Config Editor
          </h2>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-hkm-mauve bg-hkm-mauve/15 px-2 py-0.5 rounded-full">
            Requires can_override_vis_config
          </span>
        </div>
        <p className="text-sm text-hkm-text-muted mb-4">
          These chart types require the Chart Config Editor permission in Looker.
          Ask your Looker admin to enable <code>can_override_vis_config</code> on your role.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chartTypes
            .filter((c) => c.requiresConfigEditor)
            .map((chart) => {
              const Icon = iconMap[chart.icon] ?? BarChart3;
              return (
                <ChartTypeCard
                  key={chart.id}
                  name={chart.name}
                  icon={Icon}
                  bestFor={chart.bestFor}
                  href={`/chart-guide/${chart.id}`}
                  requiresConfigEditor
                />
              );
            })}
        </div>
      </section>
    </AppShell>
  );
}
