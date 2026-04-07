import { notFound } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import CodeBlock from "@/components/CodeBlock";
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
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
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

export function generateStaticParams() {
  return chartTypes.map((chart) => ({ chartId: chart.id }));
}

interface PageProps {
  params: Promise<{ chartId: string }>;
}

export default async function ChartDetailPage({ params }: PageProps) {
  const { chartId } = await params;
  const chart = chartTypes.find((c) => c.id === chartId);

  if (!chart) {
    notFound();
  }

  const Icon = iconMap[chart.icon] ?? BarChart3;

  return (
    <AppShell>
      <Breadcrumbs
        items={[
          { label: "Chart Guide", href: "/chart-guide" },
          { label: chart.name },
        ]}
      />

      {/* Back link */}
      <Link
        href="/chart-guide"
        className="inline-flex items-center gap-1.5 text-xs text-hkm-text-muted hover:text-hkm-primary transition-colors mt-4"
      >
        <ArrowLeft size={14} />
        Back to Chart Guide
      </Link>

      {/* Header */}
      <section className="mt-4 rounded-2xl bg-hkm-blush px-8 py-10 flex items-center gap-6">
        <div className="w-16 h-16 rounded-xl bg-white/60 flex items-center justify-center shrink-0">
          <Icon size={32} className="text-hkm-primary" />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-hkm-primary">
              {chart.name}
            </h1>
            {chart.requiresConfigEditor && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-hkm-mauve bg-hkm-mauve/15 px-2.5 py-1 rounded-full">
                Requires Config Editor
              </span>
            )}
          </div>
          <p className="text-sm text-hkm-text mt-1">{chart.bestFor}</p>
        </div>
      </section>

      {/* When to Use */}
      <section className="mt-8">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 size={18} className="text-green-600" />
          <h2 className="text-lg font-bold text-hkm-primary">When to Use</h2>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 px-6 py-4">
          <p className="text-sm text-hkm-text leading-relaxed">
            {chart.whenToUse}
          </p>
        </div>
      </section>

      {/* When NOT to Use */}
      <section className="mt-8">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={18} className="text-amber-600" />
          <h2 className="text-lg font-bold text-hkm-primary">
            When NOT to Use
          </h2>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-6 py-4">
          <p className="text-sm text-hkm-text leading-relaxed">
            {chart.whenNotToUse}
          </p>
        </div>
      </section>

      {/* Looker Setup Steps */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-hkm-primary mb-4">
          Looker Setup Steps
        </h2>
        <ol className="space-y-0 rounded-xl overflow-hidden border border-hkm-border-light">
          {chart.lookerSteps.map((step, index) => (
            <li
              key={index}
              className={`flex items-start gap-4 px-6 py-4 ${
                index % 2 === 0 ? "bg-hkm-white" : "bg-hkm-bg"
              } ${
                index < chart.lookerSteps.length - 1
                  ? "border-b border-hkm-border-light"
                  : ""
              }`}
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-hkm-primary text-white text-xs font-bold shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-sm text-hkm-text leading-relaxed pt-1">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* LookML Config */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-hkm-primary mb-4">
          LookML Config
        </h2>
        <CodeBlock
          code={chart.configYaml}
          language="yaml"
          title="Dashboard Element YAML"
        />
      </section>

      {/* Real Example */}
      <section className="mt-8 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={18} className="text-hkm-gold" />
          <h2 className="text-lg font-bold text-hkm-primary">Real Example</h2>
        </div>
        <div className="rounded-xl border border-hkm-gold bg-hkm-gold/10 px-6 py-5">
          <p className="text-xs font-semibold text-hkm-gold uppercase tracking-wide mb-2">
            {chart.realExample.dashboard}
          </p>
          <p className="text-sm text-hkm-text leading-relaxed">
            {chart.realExample.description}
          </p>
        </div>
      </section>
    </AppShell>
  );
}
