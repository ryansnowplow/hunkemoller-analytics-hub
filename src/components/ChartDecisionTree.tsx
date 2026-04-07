"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Hash,
  Table,
  CircleDot,
  AreaChart,
  Map,
  BarChart,
  BarChart2,
  Layers,
  GitBranch,
  Activity,
  Target,
  Gauge,
  type LucideIcon,
  RotateCcw,
  ChevronRight,
  ArrowRight,
  Shield,
  Globe,
  AlignLeft,
  LayoutList,
  Clock,
  Cloud,
  BoxSelect,
  ScatterChart,
  Network,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ChartRecommendation {
  name: string;
  icon: LucideIcon;
  description: string;
  requiresConfigEditor: boolean;
  chartGuideId?: string; // links to /chart-guide/[id] if exists
}

interface OptionCard {
  label: string;
  subtitle: string;
  icon: LucideIcon;
  nextStepId?: string; // go to another step
  recommendations?: ChartRecommendation[]; // terminal,show these charts
}

interface Step {
  id: string;
  question: string;
  options: OptionCard[];
}

interface BreadcrumbEntry {
  stepId: string;
  question: string;
  answer: string;
}

/* ------------------------------------------------------------------ */
/*  Chart recommendation data                                          */
/* ------------------------------------------------------------------ */

const CHARTS = {
  column: {
    name: "Column Chart",
    icon: BarChart2,
    description: "Vertical bars for comparing a small number of categories side-by-side.",
    requiresConfigEditor: false,
    chartGuideId: "bar",
  },
  bar: {
    name: "Bar Chart",
    icon: BarChart3,
    description: "Horizontal bars,ideal when category labels are long or you have many items.",
    requiresConfigEditor: false,
    chartGuideId: "bar",
  },
  stackedBar: {
    name: "Stacked Bar",
    icon: Layers,
    description: "Bars split into coloured segments to show sub-group contribution.",
    requiresConfigEditor: false,
    chartGuideId: "stacked-bar",
  },
  groupedBar: {
    name: "Grouped Bar",
    icon: BarChart,
    description: "Bars placed side-by-side within each category for direct comparison.",
    requiresConfigEditor: false,
    chartGuideId: "grouped-bar",
  },
  stackedBar100: {
    name: "Stacked Bar (100%)",
    icon: Layers,
    description: "Each bar fills 100%,shows proportional composition over time.",
    requiresConfigEditor: false,
    chartGuideId: "stacked-bar",
  },
  table: {
    name: "Table",
    icon: Table,
    description: "Rows and columns for detailed, sortable data exploration.",
    requiresConfigEditor: false,
    chartGuideId: "table",
  },
  line: {
    name: "Line Chart",
    icon: TrendingUp,
    description: "Connect data points over time to reveal trends and patterns.",
    requiresConfigEditor: false,
    chartGuideId: "line",
  },
  lineMulti: {
    name: "Line (multi-series)",
    icon: TrendingUp,
    description: "Multiple lines on one chart to compare series over time.",
    requiresConfigEditor: false,
    chartGuideId: "line",
  },
  area: {
    name: "Area Chart",
    icon: AreaChart,
    description: "Filled area beneath a line,great for cumulative or stacked totals.",
    requiresConfigEditor: false,
    chartGuideId: "area",
  },
  areaStacked: {
    name: "Area (stacked)",
    icon: AreaChart,
    description: "Stacked filled areas showing how composition changes over time.",
    requiresConfigEditor: false,
    chartGuideId: "area",
  },
  areaStacked100: {
    name: "Area (stacked %)",
    icon: AreaChart,
    description: "100% stacked area to show proportional shifts over time.",
    requiresConfigEditor: false,
    chartGuideId: "area",
  },
  pie: {
    name: "Pie Chart",
    icon: PieChart,
    description: "Classic circle divided into slices for simple part-to-whole comparisons.",
    requiresConfigEditor: false,
    chartGuideId: "pie",
  },
  donut: {
    name: "Donut Multiples",
    icon: CircleDot,
    description: "Multiple donut rings for comparing composition across groups.",
    requiresConfigEditor: false,
    chartGuideId: "donut",
  },
  waterfall: {
    name: "Waterfall",
    icon: Activity,
    description: "Shows how an initial value is affected by sequential positive or negative values.",
    requiresConfigEditor: false,
  },
  boxplot: {
    name: "Boxplot",
    icon: BoxSelect,
    description: "Displays median, quartiles, and outliers for numeric distributions.",
    requiresConfigEditor: false,
  },
  columnFreq: {
    name: "Column (frequency)",
    icon: BarChart2,
    description: "Histogram-style columns showing frequency distribution of values.",
    requiresConfigEditor: false,
    chartGuideId: "bar",
  },
  wordCloud: {
    name: "Word Cloud",
    icon: Cloud,
    description: "Visual emphasis on frequently occurring text values.",
    requiresConfigEditor: false,
  },
  scatter: {
    name: "Scatterplot",
    icon: ScatterChart,
    description: "Plot two numeric variables to spot correlations and clusters.",
    requiresConfigEditor: false,
    chartGuideId: "scatter",
  },
  sankey: {
    name: "Sankey",
    icon: GitBranch,
    description: "Flow diagram showing how values move between stages or categories.",
    requiresConfigEditor: true,
  },
  venn: {
    name: "Venn Diagram",
    icon: Network,
    description: "Overlapping circles showing shared and unique values between sets.",
    requiresConfigEditor: true,
  },
  mapRegions: {
    name: "Static Map (Regions)",
    icon: Map,
    description: "Choropleth map coloured by country or region values.",
    requiresConfigEditor: false,
    chartGuideId: "map",
  },
  mapPoints: {
    name: "Static Map (Points)",
    icon: Map,
    description: "Plot individual locations as dots on a map.",
    requiresConfigEditor: false,
    chartGuideId: "map",
  },
  googleMaps: {
    name: "Google Maps",
    icon: Globe,
    description: "Interactive Google Maps layer with pan, zoom, and satellite view.",
    requiresConfigEditor: false,
  },
  singleValue: {
    name: "Single Value",
    icon: Hash,
    description: "One big number front and centre,perfect for KPI tiles.",
    requiresConfigEditor: false,
    chartGuideId: "single-value",
  },
  bullet: {
    name: "Bullet Chart",
    icon: Target,
    description: "Compact bar with a target marker,ideal for goal tracking.",
    requiresConfigEditor: true,
  },
  solidGauge: {
    name: "Solid Gauge",
    icon: Gauge,
    description: "Arc-shaped gauge showing progress toward a target.",
    requiresConfigEditor: true,
  },
  singleRecord: {
    name: "Single Record",
    icon: AlignLeft,
    description: "Detail view of one row,key-value pairs for a selected record.",
    requiresConfigEditor: false,
  },
  timeline: {
    name: "Timeline",
    icon: Clock,
    description: "Chronological event list,great for activity logs or audit trails.",
    requiresConfigEditor: false,
  },
  funnel: {
    name: "Funnel",
    icon: LayoutList,
    description: "Show progressive drop-off through stages of a process.",
    requiresConfigEditor: false,
    chartGuideId: undefined,
  },
} satisfies Record<string, ChartRecommendation>;

/* ------------------------------------------------------------------ */
/*  Decision tree steps                                                */
/* ------------------------------------------------------------------ */

const STEPS: Step[] = [
  // ── Step 1 ──
  {
    id: "start",
    question: "What do you want to show?",
    options: [
      {
        label: "Comparison",
        subtitle: "Compare values across categories or groups",
        icon: BarChart3,
        nextStepId: "comparison",
      },
      {
        label: "Trend",
        subtitle: "Show how something changes over time",
        icon: TrendingUp,
        nextStepId: "trend",
      },
      {
        label: "Composition",
        subtitle: "Show parts of a whole",
        icon: PieChart,
        nextStepId: "composition",
      },
      {
        label: "Distribution",
        subtitle: "Show spread or frequency of values",
        icon: Activity,
        nextStepId: "distribution",
      },
      {
        label: "Relationship",
        subtitle: "Show connections between variables",
        icon: GitBranch,
        nextStepId: "relationship",
      },
      {
        label: "Geographic",
        subtitle: "Show data on a map",
        icon: Globe,
        nextStepId: "geographic",
      },
      {
        label: "Single metric",
        subtitle: "Highlight one key number",
        icon: Hash,
        nextStepId: "single-metric",
      },
      {
        label: "Detailed data",
        subtitle: "Show raw or tabular data",
        icon: Table,
        nextStepId: "detailed-data",
      },
    ],
  },

  // ── Comparison ──
  {
    id: "comparison",
    question: "How many categories are you comparing?",
    options: [
      {
        label: "Few (2–5)",
        subtitle: "A handful of items to compare directly",
        icon: BarChart2,
        recommendations: [CHARTS.column, CHARTS.bar],
      },
      {
        label: "Many (6–20)",
        subtitle: "Longer list where horizontal bars shine",
        icon: BarChart3,
        recommendations: [CHARTS.bar],
      },
      {
        label: "Very many (20+)",
        subtitle: "Too many for a chart,use a sortable table",
        icon: Table,
        recommendations: [CHARTS.table],
      },
      {
        label: "Across groups",
        subtitle: "Compare sub-groups within each category",
        icon: Layers,
        recommendations: [CHARTS.stackedBar, CHARTS.groupedBar],
      },
    ],
  },

  // ── Trend ──
  {
    id: "trend",
    question: "How many data series?",
    options: [
      {
        label: "One series",
        subtitle: "A single metric over time",
        icon: TrendingUp,
        recommendations: [CHARTS.line],
      },
      {
        label: "Multiple series",
        subtitle: "Compare several metrics or segments over time",
        icon: TrendingUp,
        recommendations: [CHARTS.lineMulti, CHARTS.areaStacked],
      },
      {
        label: "Cumulative total",
        subtitle: "Running total building over time",
        icon: AreaChart,
        recommendations: [CHARTS.area],
      },
    ],
  },

  // ── Composition ──
  {
    id: "composition",
    question: "How many segments, and does it change over time?",
    options: [
      {
        label: "2–5 segments (static)",
        subtitle: "Simple snapshot of parts of a whole",
        icon: PieChart,
        recommendations: [CHARTS.pie, CHARTS.donut],
      },
      {
        label: "6+ segments (static)",
        subtitle: "Too many slices for a pie,use bars",
        icon: Layers,
        recommendations: [CHARTS.stackedBar, CHARTS.waterfall],
      },
      {
        label: "Over time",
        subtitle: "See how composition shifts across periods",
        icon: AreaChart,
        recommendations: [CHARTS.stackedBar100, CHARTS.areaStacked100],
      },
    ],
  },

  // ── Distribution ──
  {
    id: "distribution",
    question: "What type of distribution?",
    options: [
      {
        label: "Numeric ranges",
        subtitle: "Spread, quartiles, and outliers of a metric",
        icon: BoxSelect,
        recommendations: [CHARTS.boxplot],
      },
      {
        label: "Frequency",
        subtitle: "How often each value or bucket occurs",
        icon: BarChart2,
        recommendations: [CHARTS.columnFreq],
      },
      {
        label: "Text frequency",
        subtitle: "Most common words or labels",
        icon: Cloud,
        recommendations: [CHARTS.wordCloud],
      },
    ],
  },

  // ── Relationship ──
  {
    id: "relationship",
    question: "What type of relationship?",
    options: [
      {
        label: "Two numeric variables",
        subtitle: "Correlation between two measures",
        icon: ScatterChart,
        recommendations: [CHARTS.scatter],
      },
      {
        label: "Flow / path",
        subtitle: "How values move between stages",
        icon: GitBranch,
        recommendations: [CHARTS.sankey],
      },
      {
        label: "Overlap",
        subtitle: "Shared and unique items between sets",
        icon: Network,
        recommendations: [CHARTS.venn],
      },
    ],
  },

  // ── Geographic ──
  {
    id: "geographic",
    question: "What level of geographic detail?",
    options: [
      {
        label: "Country / Region",
        subtitle: "Colour regions on a map by value",
        icon: Map,
        recommendations: [CHARTS.mapRegions],
      },
      {
        label: "Points / addresses",
        subtitle: "Plot individual locations",
        icon: Globe,
        recommendations: [CHARTS.mapPoints, CHARTS.googleMaps],
      },
    ],
  },

  // ── Single metric ──
  {
    id: "single-metric",
    question: "Do you need to show a target or just the number?",
    options: [
      {
        label: "Just the number",
        subtitle: "A single KPI front and centre",
        icon: Hash,
        recommendations: [CHARTS.singleValue],
      },
      {
        label: "With a target",
        subtitle: "Show progress against a goal",
        icon: Target,
        recommendations: [CHARTS.bullet, CHARTS.solidGauge],
      },
    ],
  },

  // ── Detailed data ──
  {
    id: "detailed-data",
    question: "What format works best?",
    options: [
      {
        label: "Rows and columns",
        subtitle: "Sortable, filterable tabular data",
        icon: Table,
        recommendations: [CHARTS.table],
      },
      {
        label: "Single record",
        subtitle: "Key-value detail view for one item",
        icon: AlignLeft,
        recommendations: [CHARTS.singleRecord],
      },
      {
        label: "Timeline",
        subtitle: "Chronological list of events",
        icon: Clock,
        recommendations: [CHARTS.timeline],
      },
    ],
  },
];

const stepMap: Record<string, Step> = {};
for (const s of STEPS) {
  stepMap[s.id] = s;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ChartDecisionTree() {
  const [currentStepId, setCurrentStepId] = useState("start");
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbEntry[]>([]);
  const [results, setResults] = useState<ChartRecommendation[] | null>(null);
  const [animating, setAnimating] = useState(false);

  const currentStep = stepMap[currentStepId];

  const reset = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentStepId("start");
      setBreadcrumbs([]);
      setResults(null);
      setAnimating(false);
    }, 150);
  }, []);

  const handleOption = useCallback(
    (option: OptionCard) => {
      setAnimating(true);

      const newCrumb: BreadcrumbEntry = {
        stepId: currentStepId,
        question: currentStep.question,
        answer: option.label,
      };

      setTimeout(() => {
        setBreadcrumbs((prev) => [...prev, newCrumb]);

        if (option.recommendations) {
          setResults(option.recommendations);
        } else if (option.nextStepId) {
          setCurrentStepId(option.nextStepId);
          setResults(null);
        }

        setAnimating(false);
      }, 150);
    },
    [currentStepId, currentStep],
  );

  // Jump back to a specific point in the breadcrumb trail
  const goBack = useCallback(
    (toIndex: number) => {
      setAnimating(true);
      setTimeout(() => {
        if (toIndex === 0) {
          setBreadcrumbs([]);
          setCurrentStepId("start");
        } else {
          const kept = breadcrumbs.slice(0, toIndex);
          setBreadcrumbs(kept);
          // The last kept breadcrumb answered a question which led to
          // the next step. We need to figure out which step that was.
          const lastKept = kept[kept.length - 1];
          const lastStep = stepMap[lastKept.stepId];
          const chosenOption = lastStep.options.find(
            (o) => o.label === lastKept.answer,
          );
          if (chosenOption?.nextStepId) {
            setCurrentStepId(chosenOption.nextStepId);
            setResults(null);
          }
        }
        setAnimating(false);
      }, 150);
    },
    [breadcrumbs],
  );

  return (
    <div className="space-y-6">
      {/* ── Breadcrumb trail ── */}
      {breadcrumbs.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => goBack(0)}
            className="text-hkm-gold hover:text-hkm-primary font-medium transition-colors"
          >
            Start
          </button>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight size={12} className="text-hkm-text-muted" />
              <button
                onClick={() => goBack(i + 1)}
                className="text-hkm-gold hover:text-hkm-primary font-medium transition-colors"
              >
                {crumb.answer}
              </button>
            </span>
          ))}
        </div>
      )}

      {/* ── Active question or results ── */}
      <div
        className={`transition-opacity duration-150 ${animating ? "opacity-0" : "opacity-100"}`}
      >
        {results ? (
          /* ── Results ── */
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-hkm-primary">
                Recommended chart{results.length > 1 ? "s" : ""}
              </h3>
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-hkm-gold hover:text-hkm-primary transition-colors"
              >
                <RotateCcw size={13} />
                Start over
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {results.map((chart) => (
                <div
                  key={chart.name}
                  className="bg-hkm-white rounded-xl border border-hkm-border-light p-5 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-lg bg-hkm-blush flex items-center justify-center">
                      <chart.icon size={22} className="text-hkm-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-hkm-primary">
                          {chart.name}
                        </h4>
                        {chart.requiresConfigEditor && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-hkm-mauve/20 text-hkm-mauve">
                            <Shield size={10} />
                            Requires Config Editor
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-hkm-text-muted leading-relaxed">
                        {chart.description}
                      </p>
                      {chart.chartGuideId && (
                        <Link
                          href={`/chart-guide/${chart.chartGuideId}`}
                          className="inline-flex items-center gap-1 mt-2.5 text-xs font-medium text-hkm-gold hover:text-hkm-primary transition-colors"
                        >
                          View guide
                          <ArrowRight size={12} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ── Question step ── */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-hkm-primary">
                {currentStep.question}
              </h3>
              {currentStepId !== "start" && (
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-hkm-gold hover:text-hkm-primary transition-colors"
                >
                  <RotateCcw size={13} />
                  Start over
                </button>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {currentStep.options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleOption(option)}
                  className="group text-left bg-hkm-white rounded-xl border border-hkm-border-light p-4 transition-all duration-200 hover:shadow-md hover:border-hkm-gold hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-hkm-blush flex items-center justify-center group-hover:bg-hkm-gold/20 transition-colors">
                      <option.icon
                        size={20}
                        className="text-hkm-primary"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-hkm-primary">
                        {option.label}
                      </h4>
                      <p className="mt-0.5 text-xs text-hkm-text-muted leading-relaxed">
                        {option.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
