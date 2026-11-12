/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight, CirclePlay } from "lucide-react";
import { continueLessonHref, modules, type Module } from "@/lib/data";
import { ProgressBar, StatusPill, button, card } from "@/components/ui";

function ModuleCard({ module }: { module: Module }) {
  const current = module.status === "in-progress";
  const percent = Math.round((module.lessonsDone / module.lessonsTotal) * 100);

  return (
    <article
      className={`flex h-full flex-col rounded-xl border bg-white p-5 ${
        current ? "border-teal ring-1 ring-teal" : "border-line"
      }`}
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
        Module {module.number} · {module.weeks}
      </p>
      <h3 className="mt-2 text-lg font-black leading-snug text-navy">
        {module.title}
      </h3>
      <p className="mt-0.5 text-xs text-ink-muted">{module.delivery}</p>
      <div className="mt-4">
        <StatusPill status={module.status} />
      </div>
      <div className="mt-4">
        <div className="mb-1.5 flex items-baseline justify-between text-xs">
          <span className="text-ink-muted">
            {module.lessonsDone} of {module.lessonsTotal} lessons
          </span>
          <span className="font-black text-navy">{percent}%</span>
        </div>
        <ProgressBar value={percent} label={`${module.title} progress`} />
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
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
        <Link
          href={`/learning/${module.slug}`}
          aria-label={`View module ${module.number}: ${module.title}`}
          className={button(current ? "primary" : "outline", "h-9 px-3")}
        >
          View Module
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export function LearningProgress() {
  return (
    <section
      aria-labelledby="learning-progress"
      className={`${card} p-6 md:p-8`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2
            id="learning-progress"
            className="text-2xl font-black tracking-tight text-navy"
          >
            Your Learning Progress
          </h2>
          <p className="mt-1 text-[15px] text-ink-muted">
            Track your journey through the Inclusive Succession program.
          </p>
        </div>
        <div className="md:text-right">
          <p className="text-4xl font-black leading-none text-navy">
            35<span className="text-2xl text-deepteal">%</span>
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            17 of 48 lessons · Week 6 of 16
          </p>
        </div>
      </div>

      <ProgressBar
        value={35}
        label="Overall program completion"
        className="mt-5 h-3"
      />
      <div className="mt-2 grid grid-cols-4 text-[11px] font-bold uppercase tracking-wider text-ink-muted">
        <span>Month 1</span>
        <span>Month 2</span>
        <span>Month 3</span>
        <span>Month 4</span>
      </div>

      <Link
        href={continueLessonHref}
        className="group mt-6 flex items-center gap-4 rounded-xl bg-mist p-4 transition-colors duration-150 hover:bg-teal-50"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-teal">
          <CirclePlay className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-bold uppercase tracking-wider text-deepteal">
            Up next in the Learning Centre
          </span>
          <span className="block truncate font-bold text-navy">
            Week 6: Scoring targets against your thesis
          </span>
          <span className="block text-xs text-ink-muted">
            Thesis and Targets · 45 min
          </span>
        </span>
        <ArrowRight className="h-5 w-5 shrink-0 text-navy transition-transform duration-150 group-hover:translate-x-0.5" />
      </Link>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {modules.map((module) => (
          <ModuleCard key={module.slug} module={module} />
        ))}
      </div>
    </section>
  );
}
