"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CalendarPlus,
  Check,
  FileText,
  MessageSquare,
} from "lucide-react";
import type { Milestone, MilestoneStatus } from "@/lib/data";
import { ProgressBar, button, card, eyebrow } from "@/components/ui";

const circleStyles: Record<MilestoneStatus, string> = {
  completed: "bg-teal text-navy",
  "in-progress": "bg-navy text-teal",
  upcoming: "border-2 border-line bg-white text-ink-muted",
};

const pillStyles: Record<
  MilestoneStatus,
  { className: string; label: string }
> = {
  completed: { className: "bg-teal-50 text-deepteal", label: "Completed" },
  "in-progress": {
    className: "bg-signal-soft text-signal-ink",
    label: "In Progress",
  },
  upcoming: { className: "bg-mist text-ink-muted", label: "Upcoming" },
};

function Circle({
  milestone,
  selected,
}: {
  milestone: Milestone;
  selected: boolean;
}) {
  return (
    <span
      className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-black transition-shadow duration-150 ${
        circleStyles[milestone.status]
      } ${selected ? "ring-4 ring-teal/30" : ""}`}
    >
      {milestone.status === "completed" ? (
        <Check className="h-4 w-4" strokeWidth={3} />
      ) : (
        milestone.number
      )}
    </span>
  );
}

function MilestoneDetail({
  milestone,
  total,
}: {
  milestone: Milestone;
  total: number;
}) {
  const pill = pillStyles[milestone.status];
  const { advisor } = milestone;

  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <section className={`${card} p-6 md:p-8 lg:col-span-8`}>
        <div className="flex flex-wrap items-center gap-3">
          <p className={`${eyebrow} text-ink-muted`}>
            Milestone {milestone.number} of {total}
          </p>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${pill.className}`}
          >
            {pill.label}
          </span>
          <span className="text-xs font-bold text-ink-muted">
            {milestone.date}
          </span>
        </div>
        <h2 className="mt-3 text-2xl font-black text-navy md:text-3xl">
          {milestone.title}
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink">
          {milestone.description}
        </p>

        <h3 className="mt-8 text-sm font-black text-navy">Next steps</h3>
        <ul className="mt-3 space-y-2">
          {milestone.nextSteps.map((step, i) => (
            <li
              key={step}
              className="flex items-start gap-3 rounded-lg bg-mist px-4 py-3 text-sm text-ink"
            >
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy text-[11px] font-black text-teal">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-6">
          {milestone.actions.map((action, i) => (
            <Link
              key={action.label}
              href={action.href}
              className={button(i === 0 ? "primary" : "outline", "h-10 px-4")}
            >
              {action.label}
              {i === 0 && <ArrowRight className="h-4 w-4" />}
            </Link>
          ))}
        </div>
      </section>

      <div className="space-y-5 lg:col-span-4">
        <section className={`${card} p-6`}>
          <p className={`${eyebrow} text-deepteal`}>Assigned advisor</p>
          <Link
            href={advisor.profileHref}
            className="group mt-3 flex items-center gap-3"
          >
            <img
              src={advisor.avatar}
              alt=""
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="font-bold text-navy group-hover:underline">
                {advisor.name}
              </p>
              <p className="text-sm text-ink-muted">{advisor.specialty}</p>
            </div>
          </Link>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link href={advisor.messageHref} className={button("outline")}>
              <MessageSquare className="h-4 w-4" /> Message
            </Link>
            <Link
              href={`${advisor.profileHref}?book=1`}
              className={button("dark")}
            >
              <CalendarPlus className="h-4 w-4" /> Book
            </Link>
          </div>
        </section>

        <section className={`${card} p-6`}>
          <p className={`${eyebrow} text-deepteal`}>Related resources</p>
          <ul className="mt-3 space-y-1">
            {milestone.resources.map((resource) => (
              <li key={resource}>
                <Link
                  href="/resources"
                  className="group -mx-2 flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-bold text-navy hover:bg-mist"
                >
                  <FileText className="h-4 w-4 text-deepteal" />
                  <span className="flex-1">{resource}</span>
                  <ArrowRight className="h-4 w-4 text-ink-muted group-hover:text-navy" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export function JourneyTimeline({ milestones }: { milestones: Milestone[] }) {
  const total = milestones.length;
  const done = milestones.filter((m) => m.status === "completed").length;
  const [selectedNumber, setSelectedNumber] = useState(
    () => milestones.find((m) => m.status === "in-progress")?.number ?? 1,
  );
  const selected =
    milestones.find((m) => m.number === selectedNumber) ?? milestones[0];

  const stepProps = (milestone: Milestone) => ({
    type: "button" as const,
    onClick: () => setSelectedNumber(milestone.number),
    "aria-current":
      milestone.number === selectedNumber ? ("step" as const) : undefined,
  });
  // The connector after a milestone is teal once that milestone is complete.
  const connector = (milestone: Milestone) =>
    milestone.status === "completed" ? "bg-teal" : "bg-line";

  return (
    <>
      <section className={`${card} p-6 md:p-8`} aria-label="Milestone timeline">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <p className="text-sm text-ink-muted">
            <span className="text-2xl font-black text-navy">{done}</span> of{" "}
            {total} milestones complete
          </p>
          <ProgressBar
            value={Math.round((done / total) * 100)}
            label="Journey progress"
            className="h-1.5 sm:max-w-xs"
          />
        </div>

        {/* Horizontal stepper on wide screens */}
        <ol className="hidden grid-cols-8 xl:grid" aria-label="Milestones">
          {milestones.map((milestone, i) => {
            const isSelected = milestone.number === selectedNumber;
            return (
              <li key={milestone.number} className="relative">
                {i < total - 1 && (
                  <span
                    className={`absolute left-1/2 top-[18px] h-0.5 w-full ${connector(milestone)}`}
                    aria-hidden="true"
                  />
                )}
                <button
                  {...stepProps(milestone)}
                  className="group flex w-full flex-col items-center px-1 text-center"
                >
                  <Circle milestone={milestone} selected={isSelected} />
                  <span
                    className={`mt-3 text-sm font-bold leading-snug ${
                      isSelected
                        ? "text-navy"
                        : "text-ink-muted group-hover:text-navy"
                    }`}
                  >
                    {milestone.short}
                  </span>
                  <span className="mt-1 text-xs text-ink-muted">
                    {milestone.date}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Vertical list on smaller screens */}
        <ol className="xl:hidden" aria-label="Milestones">
          {milestones.map((milestone, i) => {
            const isSelected = milestone.number === selectedNumber;
            return (
              <li key={milestone.number} className="relative pb-2 last:pb-0">
                {i < total - 1 && (
                  <span
                    className={`absolute left-[17px] top-9 h-[calc(100%-28px)] w-0.5 ${connector(milestone)}`}
                    aria-hidden="true"
                  />
                )}
                <button
                  {...stepProps(milestone)}
                  className={`flex w-full items-center gap-4 rounded-xl p-0 pr-3 text-left ${
                    isSelected ? "bg-mist" : ""
                  }`}
                >
                  <Circle milestone={milestone} selected={isSelected} />
                  <span className="flex-1 py-2">
                    <span
                      className={`block font-bold ${isSelected ? "text-navy" : "text-ink"}`}
                    >
                      {milestone.title}
                    </span>
                    <span className="block text-xs text-ink-muted">
                      {milestone.date}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </section>

      <div key={selected.number} className="fade-up">
        <MilestoneDetail milestone={selected} total={total} />
      </div>
    </>
  );
}
