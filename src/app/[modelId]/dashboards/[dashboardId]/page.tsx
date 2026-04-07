import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Filter, BookOpen, Search } from "lucide-react";
import { modelAreas } from "@/data";
import AppShell from "@/components/AppShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import TileWireframe from "@/components/TileWireframe";
import TileTable from "@/components/TileTable";
import MetadataPill from "@/components/MetadataPill";

export function generateStaticParams() {
  const params: { modelId: string; dashboardId: string }[] = [];

  for (const model of modelAreas) {
    for (const dashboard of model.dashboards) {
      params.push({
        modelId: model.id,
        dashboardId: dashboard.id,
      });
    }
  }

  return params;
}

interface DashboardPageProps {
  params: Promise<{
    modelId: string;
    dashboardId: string;
  }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { modelId, dashboardId } = await params;

  const model = modelAreas.find((m) => m.id === modelId);
  if (!model) return notFound();

  const dashboard = model.dashboards.find((d) => d.id === dashboardId);
  if (!dashboard) return notFound();

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: model.name, href: `/${model.id}` },
            { label: "Dashboards", href: `/${model.id}#dashboards` },
            { label: dashboard.name },
          ]}
        />

        {/* Back link */}
        <Link
          href={`/${model.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-hkm-text-muted hover:text-hkm-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to {model.name}
        </Link>

        {/* Dashboard Header */}
        <section className="bg-hkm-blush rounded-xl p-6 sm:p-8 space-y-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-hkm-primary">
            {dashboard.name}
          </h1>

          <p className="text-hkm-text-light leading-relaxed max-w-3xl">
            {dashboard.purpose}
          </p>

          {/* Filters */}
          {dashboard.filters.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-hkm-text-muted uppercase tracking-wider">
                <Filter size={12} />
                Filters
              </div>
              <div className="flex flex-wrap gap-2">
                {dashboard.filters.map((filter) => (
                  <MetadataPill
                    key={filter.name}
                    label={filter.name}
                    value={filter.default ?? "Any"}
                    variant="gold"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Explore Name */}
          {dashboard.exploreName && (
            <div className="flex items-center gap-2">
              <Search size={14} className="text-hkm-text-muted" />
              <span className="text-xs text-hkm-text-muted">Explore:</span>
              <span className="text-sm font-medium text-hkm-primary">
                {dashboard.exploreName}
              </span>
            </div>
          )}

          {/* How to Read */}
          {dashboard.howToRead && (
            <div className="bg-hkm-gold/10 border-l-4 border-hkm-gold rounded-r-lg p-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-hkm-primary mb-2">
                <BookOpen size={13} />
                How to Read This Dashboard
              </div>
              <p className="text-sm text-hkm-text-light leading-relaxed">
                {dashboard.howToRead}
              </p>
            </div>
          )}
        </section>

        {/* Dashboard Wireframe */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-hkm-primary">
            Dashboard Layout
          </h2>
          <TileWireframe tiles={dashboard.tiles} />
        </section>

        {/* Tile Details */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-hkm-primary">
            Tile Details
          </h2>
          <TileTable tiles={dashboard.tiles} />
        </section>

        {/* Bottom back link */}
        <Link
          href={`/${model.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-hkm-text-muted hover:text-hkm-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to {model.name}
        </Link>
      </div>
    </AppShell>
  );
}
