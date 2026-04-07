import { Globe, ShoppingCart, GitBranch, BarChart3, LayoutDashboard, ArrowRight } from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import ModelCard from "@/components/ModelCard";
import { modelAreas } from "@/data";

const iconMap: Record<string, typeof Globe> = {
  Globe,
  ShoppingCart,
  GitBranch,
};

export default function HomePage() {
  return (
    <AppShell>
      {/* Hero */}
      <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 -mt-8 overflow-hidden">
        {/* Background image, flipped horizontally */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://s7g10.scene7.com/is/image/hunkemoller/2749701028-EA_Bra_Promo-3rd_free_or_2nd_50_off-Retina-D:3-1?wid=1920&hei=640&qlt=85&bfc=on&network=on"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ transform: "scaleX(-1)" }}
        />
        {/* Gradient overlay for text readability on the right */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/40 to-transparent" />

        <div className="relative flex items-center justify-end min-h-[280px] sm:min-h-[340px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-md lg:max-w-lg text-right py-10 sm:py-14 mr-0 sm:mr-8 lg:mr-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://eu-images.contentstack.com/v3/assets/bltfd5061d1d103c767/bltd13b4e919339e08f/696f5b722d05b953b744a5a7/logoHKM.svg?width=1920&quality=85&auto=webp"
              alt="Hunkemöller"
              className="h-6 sm:h-7 w-auto ml-auto mb-3 brightness-0 invert"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
              Analytics Hub
            </h1>
            <p className="text-sm sm:text-base text-white font-bold leading-relaxed">
              Your guide to the dashboards, views, and data models powering
              your analytics.
            </p>
          </div>
        </div>
      </section>

      {/* Model Cards */}
      <section className="mt-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modelAreas.map((model) => {
            const Icon = iconMap[model.icon] ?? Globe;
            return (
              <ModelCard
                key={model.id}
                name={model.name}
                tagline={model.tagline}
                icon={Icon}
                dashboardCount={model.dashboardCount}
                viewCount={model.viewCount}
                href={`/${model.id}`}
              />
            );
          })}
        </div>
      </section>

      {/* Chart Guide */}
      <section className="mt-16 rounded-xl border border-hkm-border bg-hkm-white p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-hkm-blush flex items-center justify-center shrink-0">
            <BarChart3 size={24} className="text-hkm-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-hkm-primary mb-2">
              Chart Guide
            </h2>
            <p className="text-sm text-hkm-text-muted leading-relaxed mb-4">
              Not sure which visualisation to use? The chart guide explains when
              to use bar charts, line charts, funnels, and more, with
              step-by-step Looker instructions and real examples from
              your dashboards.
            </p>
            <Link
              href="/chart-guide"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-hkm-primary hover:text-hkm-gold transition-colors"
            >
              Browse the chart guide
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Guide */}
      <section className="mt-6 rounded-xl border border-hkm-border bg-hkm-white p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-hkm-blush flex items-center justify-center shrink-0">
            <LayoutDashboard size={24} className="text-hkm-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-hkm-primary mb-2">
              Dashboard Guide
            </h2>
            <p className="text-sm text-hkm-text-muted leading-relaxed mb-4">
              Learn how to create, edit, and configure dashboards in Looker,
              from adding your first tile to setting up filters and optimising
              performance.
            </p>
            <Link
              href="/dashboard-guide"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-hkm-primary hover:text-hkm-gold transition-colors"
            >
              Read the dashboard guide
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
