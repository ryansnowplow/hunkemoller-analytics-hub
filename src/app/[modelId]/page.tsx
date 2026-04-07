import { notFound } from "next/navigation";
import {
  Database,
  Server,
  Clock,
  LayoutDashboard,
  Eye,
  Compass,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import DashboardCard from "@/components/DashboardCard";
import MetadataPill from "@/components/MetadataPill";
import ViewAccordion from "@/components/ViewAccordion";
import { modelAreas } from "@/data";

export function generateStaticParams() {
  return [
    { modelId: "unified" },
    { modelId: "ecommerce" },
    { modelId: "attribution" },
  ];
}

const attributionModelsTable = [
  {
    model: "First Touch",
    description:
      "100% credit to the first campaign/channel in the conversion path.",
    bestFor: "Understanding which channels drive initial awareness.",
  },
  {
    model: "Last Touch",
    description:
      "100% credit to the last campaign/channel before conversion.",
    bestFor: "Understanding which channels close the sale.",
  },
  {
    model: "Linear",
    description:
      "Equal credit distributed across all touchpoints in the path.",
    bestFor: "Balanced view when all touchpoints are equally important.",
  },
  {
    model: "Position Based",
    description:
      "40% to first touch, 40% to last touch, 20% split among middle touchpoints.",
    bestFor:
      "Valuing both discovery and closing while acknowledging the middle.",
  },
];

interface PageProps {
  params: Promise<{ modelId: string }>;
}

export default async function ModelPage({ params }: PageProps) {
  const { modelId } = await params;
  const model = modelAreas.find((m) => m.id === modelId);

  if (!model) {
    return notFound();
  }

  const isAttribution = model.id === "attribution";

  const bannerImages: Record<string, string> = {
    unified:
      "https://s7g10.scene7.com/is/image/hunkemoller/2749705163-EA-Bra-Promo-3rd_free-Tiles_4-1-D:2-3?wid=1632&hei=2448&qlt=85&bfc=on&network=on",
    ecommerce:
      "https://s7g10.scene7.com/is/image/hunkemoller/2749705163-EA-Bra-Promo-3rd_free-Tiles_4-2-D:2-3?wid=1632&hei=2448&qlt=85&bfc=on&network=on",
    attribution:
      "https://s7g10.scene7.com/is/image/hunkemoller/2749705163-EA-Bra-Promo-3rd_free-Tiles_4-3-D:2-3?wid=1632&hei=2448&qlt=85&bfc=on&network=on",
  };

  const bannerImage = bannerImages[model.id];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: model.name }]} />

        {/* Model Overview Banner */}
        <section className="relative bg-hkm-blush rounded-xl p-6 sm:p-8 overflow-hidden">
          {/* Subtle background image on the right */}
          {bannerImage && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bannerImage}
                alt=""
                className="absolute right-0 top-0 h-full w-[30%] object-cover object-top rounded-r-xl"
              />
              <div className="absolute right-0 top-0 h-full w-[30%] bg-gradient-to-r from-hkm-blush via-hkm-blush/80 to-transparent rounded-r-xl" />
            </>
          )}

          {/* Content sits above the image */}
          <div className="relative z-10">
          <h1 className="text-2xl font-bold text-hkm-primary mb-2">
            {model.name}
          </h1>
          <p className="text-sm text-hkm-text-light leading-relaxed mb-5 max-w-3xl">
            {model.description}
          </p>

          {/* Metadata Pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            <MetadataPill
              label="Connection"
              value={model.connection}
              variant="default"
            />
            <MetadataPill
              label="Dataset"
              value={model.dataset}
              variant="gold"
            />
            {model.cache && (
              <MetadataPill
                label="Cache"
                value={model.cache}
                variant="blush"
              />
            )}
            <MetadataPill
              label="Dashboards"
              value={String(model.dashboardCount)}
              variant="mauve"
            />
            <MetadataPill
              label="Views"
              value={String(model.viewCount)}
              variant="mauve"
            />
          </div>

          {/* Explores */}
          {model.explores && model.explores.length > 0 && (
            <div className="mt-4 pt-4 border-t border-hkm-border">
              <h3 className="text-xs font-semibold text-hkm-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Compass size={13} />
                Explores
              </h3>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {model.explores.map((explore) => (
                  <div
                    key={explore.name}
                    className="bg-hkm-white rounded-lg px-4 py-3 border border-hkm-border-light"
                  >
                    <p className="text-sm font-semibold text-hkm-primary">
                      {explore.name}
                    </p>
                    <p className="text-xs text-hkm-text-muted mt-1 leading-relaxed">
                      {explore.description}
                    </p>
                    {explore.joins && (
                      <p className="text-[11px] text-hkm-text-muted mt-1.5 font-mono">
                        Joins: {explore.joins}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attribution Models Table */}
          {isAttribution && (
            <div className="mt-5 pt-4 border-t border-hkm-border">
              <h3 className="text-xs font-semibold text-hkm-text-muted uppercase tracking-wider mb-3">
                Attribution Models
              </h3>
              <div className="overflow-x-auto rounded-lg border border-hkm-border-light">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-hkm-white text-left">
                      <th className="px-4 py-2.5 font-semibold text-hkm-primary">
                        Model
                      </th>
                      <th className="px-4 py-2.5 font-semibold text-hkm-primary">
                        How It Works
                      </th>
                      <th className="px-4 py-2.5 font-semibold text-hkm-primary">
                        Best For
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributionModelsTable.map((row, i) => (
                      <tr
                        key={row.model}
                        className={
                          i % 2 === 0 ? "bg-hkm-white" : "bg-[#F6EDED]"
                        }
                      >
                        <td className="px-4 py-2.5 font-semibold text-hkm-primary whitespace-nowrap">
                          {row.model}
                        </td>
                        <td className="px-4 py-2.5 text-hkm-text-light">
                          {row.description}
                        </td>
                        <td className="px-4 py-2.5 text-hkm-text-muted">
                          {row.bestFor}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          </div>
        </section>

        {/* Dashboards Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <LayoutDashboard size={18} className="text-hkm-primary" />
            <h2 className="text-lg font-bold text-hkm-primary">Dashboards</h2>
            <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-hkm-primary bg-hkm-gold/20 rounded-full">
              {model.dashboards.length}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {model.dashboards.map((dash) => (
              <DashboardCard
                key={dash.id}
                name={dash.name}
                purpose={dash.purpose}
                filters={dash.filters.map((f) => f.name)}
                href={`/${model.id}/dashboards/${dash.id}`}
              />
            ))}
          </div>
        </section>

        {/* Views Section */}
        <section id="views">
          <div className="flex items-center gap-2 mb-4">
            <Eye size={18} className="text-hkm-primary" />
            <h2 className="text-lg font-bold text-hkm-primary">Views</h2>
            <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-hkm-primary bg-hkm-gold/20 rounded-full">
              {model.views.length}
            </span>
          </div>
          <div className="space-y-3">
            {model.views.map((view, index) => (
              <ViewAccordion key={view.id} view={view} index={index} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
