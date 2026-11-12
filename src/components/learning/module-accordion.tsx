"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import type { Module } from "@/lib/data";
import { ProgressBar, StatusPill, button } from "@/components/ui";

const badgeStyles = {
  completed: "bg-teal text-navy",
  "in-progress": "bg-navy text-teal",
  "not-started": "bg-mist text-ink-muted",
};

function ModulePanel({ module }: { module: Module }) {
  const count = module.facilitators.length;

  return (
    <div className="grid gap-6 border-t border-line p-5 md:p-6 lg:grid-cols-[1fr_280px]">
      <ol className="divide-y divide-line rounded-xl border border-line">
        {module.schedule.map((week) => (
          <li key={week.number}>
            <Link
              href={`/learning/${module.slug}/week/${week.number}`}
              className="flex items-center gap-4 px-4 py-3.5 transition-colors duration-150 hover:bg-mist"
            >
              <span className="w-14 shrink-0 text-xs font-bold uppercase tracking-wider text-ink-muted">
                Week {week.number}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-navy">{week.title}</span>
                <span className="block text-xs text-ink-muted">
                  {week.date} · {week.lessonsDone}/{week.lessonsTotal} lessons
                </span>
              </span>
              <StatusPill
                status={week.status}
                className="hidden sm:inline-flex"
              />
            </Link>
          </li>
        ))}
      </ol>

      <div className="flex flex-col">
        <p className="text-sm font-bold text-navy">What you&apos;ll cover</p>
        <ul className="mt-2 space-y-1.5">
          {module.covers.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-ink-muted">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center gap-3">
          <div className="flex -space-x-2">
            {module.facilitators.map((person) => (
              <img
                key={person.name}
                src={person.avatar}
                alt={person.name}
                title={`${person.name} · ${person.specialty}`}
                className="h-7 w-7 rounded-full object-cover ring-2 ring-white"
              />
            ))}
          </div>
          <span className="text-xs text-ink-muted">
            {count} {count === 1 ? "facilitator" : "facilitators"}
          </span>
        </div>
        <Link
          href={`/learning/${module.slug}`}
          className={button("dark", "mt-6 h-10 w-full px-4 lg:mt-auto")}
        >
          View Module
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export function ModuleAccordion({ modules }: { modules: Module[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(
    () => modules.find((m) => m.status === "in-progress")?.slug ?? null,
  );

  return (
    <div className="space-y-4">
      {modules.map((module) => {
        const open = module.slug === openSlug;
        const percent = Math.round(
          (module.lessonsDone / module.lessonsTotal) * 100,
        );
        const panelId = `module-panel-${module.slug}`;

        return (
          <article
            key={module.slug}
            className={`overflow-hidden rounded-2xl border bg-white shadow-card ${
              open ? "border-teal/60" : "border-line"
            }`}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenSlug(open ? null : module.slug)}
              className="flex w-full flex-col gap-4 p-5 text-left transition-colors duration-150 hover:bg-mist/60 md:flex-row md:items-center md:gap-6 md:p-6"
            >
              <div
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl text-xl font-black ${badgeStyles[module.status]}`}
                aria-hidden="true"
              >
                {module.status === "completed" ? (
                  <Check className="h-6 w-6" strokeWidth={3} />
                ) : (
                  module.number
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                  Module {module.number} · {module.weeks} · {module.mode}
                </p>
                <h2 className="mt-1 text-xl font-black text-navy">
                  {module.title}
                </h2>
                <p className="mt-0.5 text-sm text-ink-muted">
                  {module.summary}
                </p>
              </div>
              <div className="flex items-center gap-5 md:w-[340px] md:shrink-0">
                <div className="flex-1">
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <StatusPill status={module.status} />
                    <span className="text-sm font-black text-navy">
                      {percent}%
                    </span>
                  </div>
                  <ProgressBar
                    value={percent}
                    label={`${module.title} progress`}
                  />
                </div>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-ink-muted transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            <div
              id={panelId}
              inert={!open}
              className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                open
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <ModulePanel module={module} />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
