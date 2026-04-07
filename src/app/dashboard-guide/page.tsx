import AppShell from "@/components/AppShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import { dashboardGuideSections } from "@/data/dashboard-guide";
import {
  PlusCircle,
  LayoutGrid,
  Pencil,
  SlidersHorizontal,
  Settings,
  Zap,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  PlusCircle,
  LayoutGrid,
  Pencil,
  SlidersHorizontal,
  Settings,
  Zap,
};

export default function DashboardGuidePage() {
  return (
    <AppShell>
      <Breadcrumbs items={[{ label: "Dashboard Guide" }]} />

      {/* Hero */}
      <section className="relative mt-6 rounded-2xl bg-hkm-blush px-8 py-10 sm:px-12 sm:py-14 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://s7g10.scene7.com/is/image/hunkemoller/M25_Q2_LOYALTY_GROUP_205139_302703_300885_302444_0527DM:3-1?wid=1920&hei=640&qlt=85&bfc=on&network=on"
          alt=""
          className="absolute right-0 top-0 h-full w-[45%] object-cover object-right rounded-r-2xl"
        />
        <div className="absolute right-0 top-0 h-full w-[45%] bg-gradient-to-r from-hkm-blush via-hkm-blush/80 to-transparent rounded-r-2xl" />

        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-hkm-primary mb-3">
            Creating &amp; Editing Dashboards in Looker
          </h1>
          <p className="text-sm sm:text-base text-hkm-text leading-relaxed max-w-2xl">
            A step-by-step guide to building, editing, and configuring dashboards
            in Looker. Covers creating dashboards, adding tiles, working with
            filters, and performance best practices.
          </p>
        </div>
      </section>

      {/* Table of contents */}
      <nav className="mt-8 rounded-xl border border-hkm-border-light bg-hkm-white p-6">
        <h2 className="text-sm font-bold text-hkm-primary mb-3 uppercase tracking-wider">
          Contents
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {dashboardGuideSections.map((section) => {
            const Icon = iconMap[section.icon] ?? PlusCircle;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-hkm-text-light hover:text-hkm-primary hover:bg-hkm-blush rounded-lg transition-colors"
                >
                  <Icon size={14} className="text-hkm-text-muted shrink-0" />
                  {section.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sections */}
      {dashboardGuideSections.map((section) => {
        const Icon = iconMap[section.icon] ?? PlusCircle;
        return (
          <section key={section.id} id={section.id} className="mt-12 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-hkm-blush flex items-center justify-center">
                <Icon size={20} className="text-hkm-primary" />
              </div>
              <h2 className="text-xl font-bold text-hkm-primary">
                {section.title}
              </h2>
            </div>

            <div className="space-y-4">
              {section.steps.map((step, stepIndex) => (
                <div
                  key={stepIndex}
                  className="rounded-xl border border-hkm-border-light bg-hkm-white overflow-hidden"
                >
                  {/* Step header */}
                  <div className="px-6 py-4 border-b border-hkm-border-light bg-hkm-blush/30">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-hkm-primary text-white text-xs font-bold shrink-0">
                        {stepIndex + 1}
                      </span>
                      <h3 className="text-sm font-bold text-hkm-primary">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Step body */}
                  <div className="px-6 py-4">
                    <p className="text-sm text-hkm-text leading-relaxed">
                      {step.description}
                    </p>

                    {/* Substeps */}
                    {step.substeps && step.substeps.length > 0 && (
                      <ol className="mt-4 space-y-0 rounded-lg overflow-hidden border border-hkm-border-light">
                        {step.substeps.map((substep, subIndex) => (
                          <li
                            key={subIndex}
                            className={`flex items-start gap-3 px-4 py-3 text-sm ${
                              subIndex % 2 === 0 ? "bg-hkm-white" : "bg-hkm-bg"
                            } ${
                              subIndex < step.substeps!.length - 1
                                ? "border-b border-hkm-border-light"
                                : ""
                            }`}
                          >
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-hkm-gold/30 text-hkm-primary text-[10px] font-bold shrink-0 mt-0.5">
                              {subIndex + 1}
                            </span>
                            <span className="text-hkm-text">{substep}</span>
                          </li>
                        ))}
                      </ol>
                    )}

                    {/* Tip */}
                    {step.tip && (
                      <div className="mt-4 flex items-start gap-2 px-4 py-3 rounded-lg bg-hkm-gold/10 border border-hkm-gold/20">
                        <Lightbulb
                          size={14}
                          className="text-hkm-gold shrink-0 mt-0.5"
                        />
                        <p className="text-xs text-hkm-text leading-relaxed">
                          {step.tip}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Source attribution */}
      <div className="mt-12 mb-8 text-center text-xs text-hkm-text-muted">
        Based on the{" "}
        <a
          href="https://cloud.google.com/looker/docs/creating-user-defined-dashboards"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-hkm-primary transition-colors"
        >
          official Looker documentation
        </a>
      </div>
    </AppShell>
  );
}
