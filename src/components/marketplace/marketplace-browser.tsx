"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Search,
  SearchX,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  marketplaceFilters,
  opportunities,
  type Opportunity,
} from "@/lib/data";
import { button } from "@/components/ui";
import { OpportunityCard } from "@/components/opportunity-card";

type Tab = "all" | "saved";
type Sort = "fit" | "newest";

const emptyFilters = {
  industry: "",
  location: "",
  revenue: "",
  size: "",
  timeline: "",
};
type Filters = typeof emptyFilters;

const filterField: Record<keyof Filters, keyof Opportunity> = {
  industry: "industry",
  location: "region",
  revenue: "revenue",
  size: "employees",
  timeline: "transition",
};

function FilterSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
  className = "",
}: {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={`relative block ${className}`}>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-10 w-full appearance-none rounded-lg border bg-white pl-3 pr-9 text-sm font-bold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal/30 ${
          value ? "border-deepteal/40 text-deepteal" : "border-line text-ink"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
    </label>
  );
}

/**
 * The ?tab= query is only known at request time, so the All view is prerendered
 * and the URL-aware version takes over once it is available.
 */
export function MarketplaceView() {
  return (
    <Suspense
      fallback={<MarketplaceBrowser tab="all" onTabChange={() => {}} />}
    >
      <MarketplaceBrowserFromUrl />
    </Suspense>
  );
}

/** Reads and writes the active tab as `?tab=saved`, so the Saved view can be linked to. */
function MarketplaceBrowserFromUrl() {
  const pathname = usePathname();
  const tab: Tab = useSearchParams().get("tab") === "saved" ? "saved" : "all";

  return (
    <MarketplaceBrowser
      tab={tab}
      onTabChange={(next) =>
        window.history.replaceState(
          null,
          "",
          next === "saved" ? `${pathname}?tab=saved` : pathname,
        )
      }
    />
  );
}

function MarketplaceBrowser({
  tab,
  onTabChange,
}: {
  tab: Tab;
  onTabChange: (tab: Tab) => void;
}) {
  const [saved, setSaved] = useState(
    () => new Set(opportunities.filter((o) => o.saved).map((o) => o.id)),
  );
  const [sort, setSort] = useState<Sort>("fit");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [moreOpen, setMoreOpen] = useState(false);

  const setFilter = (key: keyof Filters) => (value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }));
  const clearAll = () => {
    setFilters(emptyFilters);
    setQuery("");
  };
  const toggleSaved = (id: string) =>
    setSaved((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  const activeFilters = (Object.keys(filters) as (keyof Filters)[]).filter(
    (key) => filters[key],
  );
  const needle = query.trim().toLowerCase();

  const results = opportunities
    .filter((opp) => tab === "all" || saved.has(opp.id))
    .filter((opp) =>
      activeFilters.every((key) => opp[filterField[key]] === filters[key]),
    )
    .filter(
      (opp) =>
        !needle ||
        [opp.title, opp.region, opp.industry, opp.summary].some((text) =>
          text.toLowerCase().includes(needle),
        ),
    )
    .sort((a, b) =>
      sort === "newest"
        ? b.number - a.number
        : b.match - a.match || a.number - b.number,
    );

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "all", label: "All opportunities", count: opportunities.length },
    { id: "saved", label: "Saved", count: saved.size },
  ];

  return (
    <>
      <div className="mb-4 flex items-end justify-between gap-4 border-b border-line">
        <div
          role="tablist"
          aria-label="Marketplace views"
          className="flex gap-1"
        >
          {tabs.map(({ id, label, count }) => {
            const active = id === tab;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onTabChange(id)}
                className={`flex shrink-0 items-center gap-2 border-b-2 px-3 pb-3 text-sm font-bold transition-colors duration-150 ${
                  active
                    ? "border-teal text-navy"
                    : "border-transparent text-ink-muted hover:text-navy"
                }`}
              >
                {label}
                <span
                  className={`rounded-full px-1.5 text-xs ${
                    active ? "bg-navy text-white" : "bg-line text-ink-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <label className="mb-2 flex items-center gap-2 text-sm text-ink-muted">
          <span className="hidden sm:inline">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-9 rounded-lg border border-line bg-white px-2 text-sm font-bold text-ink focus:outline-none focus:ring-2 focus:ring-teal/30"
          >
            <option value="fit">Best thesis match</option>
            <option value="newest">Newest</option>
          </select>
        </label>
      </div>

      <div className="rounded-2xl border border-line bg-white p-4 shadow-card">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Search businesses</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search businesses by industry, region, or keyword"
              className="h-10 w-full rounded-lg border border-line pl-9 pr-3 text-sm placeholder:text-ink-muted focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
            />
          </label>
          <div className="grid grid-cols-2 gap-3 sm:flex">
            <FilterSelect
              label="Industry"
              placeholder="All industries"
              options={marketplaceFilters.industries}
              value={filters.industry}
              onChange={setFilter("industry")}
              className="sm:w-48"
            />
            <FilterSelect
              label="Location"
              placeholder="All locations"
              options={marketplaceFilters.locations}
              value={filters.location}
              onChange={setFilter("location")}
              className="sm:w-48"
            />
            <button
              type="button"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((open) => !open)}
              className={button(
                "outline",
                "col-span-2 h-10 px-4 sm:col-span-1",
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              More filters
            </button>
          </div>
        </div>

        {moreOpen && (
          <div className="mt-3 grid gap-3 border-t border-line pt-3 sm:grid-cols-3">
            <FilterSelect
              label="Revenue range"
              placeholder="Any revenue"
              options={marketplaceFilters.revenues}
              value={filters.revenue}
              onChange={setFilter("revenue")}
            />
            <FilterSelect
              label="Business size"
              placeholder="Any team size"
              options={marketplaceFilters.sizes}
              value={filters.size}
              onChange={setFilter("size")}
            />
            <FilterSelect
              label="Transition timeline"
              placeholder="Any timeline"
              options={marketplaceFilters.timelines}
              value={filters.timeline}
              onChange={setFilter("timeline")}
            />
          </div>
        )}

        {activeFilters.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
            {activeFilters.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)("")}
                aria-label={`Remove filter ${filters[key]}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-deepteal hover:bg-teal-100"
              >
                {filters[key]}
                <X className="h-3 w-3" />
              </button>
            ))}
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-bold text-ink-muted hover:text-navy"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <p className="mb-4 mt-6 text-sm text-ink-muted" aria-live="polite">
        Showing <span className="font-bold text-navy">{results.length}</span>{" "}
        {results.length === 1 ? "opportunity" : "opportunities"}
      </p>

      {results.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {results.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              saved={saved.has(opp.id)}
              onToggleSaved={() => toggleSaved(opp.id)}
            />
          ))}
        </div>
      ) : (
        <div className="grid place-items-center rounded-2xl border border-dashed border-ink/15 bg-white px-6 py-16 text-center">
          <SearchX className="h-8 w-8 text-ink-muted" />
          <p className="mt-3 font-black text-navy">
            {tab === "saved"
              ? "No saved opportunities yet"
              : "No opportunities match these filters"}
          </p>
          <p className="mt-1 max-w-sm text-sm text-ink-muted">
            {tab === "saved"
              ? "Save businesses you want to score against your thesis."
              : "New owners join the marketplace every month. Try broadening your search."}
          </p>
          <button
            type="button"
            onClick={() => {
              clearAll();
              onTabChange("all");
            }}
            className={`${button("outline", "h-10 px-4")} mt-5`}
          >
            Browse all opportunities
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
}
