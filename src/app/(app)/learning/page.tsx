import type { Metadata } from "next";
import Link from "next/link";
import { Play } from "lucide-react";
import { continueLessonHref, modules } from "@/lib/data";
import { ProgressBar, button } from "@/components/ui";
import { ModuleAccordion } from "@/components/learning/module-accordion";

export const metadata: Metadata = { title: "Learning Centre · Inclusive Succession" };

export default function LearningPage() {
  return (
    <div>
      <header className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-tight text-navy md:text-[32px] md:leading-tight">
            Learning Centre
          </h1>
          <p className="mt-1.5 max-w-2xl text-[15px] text-ink-muted">
            Sixteen weeks across four modules — three months online and one month alongside a
            matched seller.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Link href={continueLessonHref} className={button("primary", "h-11 px-5")}>
            <Play className="h-4 w-4" fill="currentColor" />
            Continue learning
          </Link>
        </div>
      </header>

      <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-navy p-5 text-white md:flex-row md:items-center md:gap-8 md:p-6">
        <div className="flex items-baseline gap-3">
          <p className="text-4xl font-black text-teal">35%</p>
          <p className="text-sm text-white/70">program complete</p>
        </div>
        <div className="flex-1">
          <ProgressBar
            value={35}
            label="Overall program completion"
            className="h-2"
            track="bg-white/10"
          />
          <p className="mt-2 text-xs text-white/60">
            17 of 48 lessons · Up next:{" "}
            <Link
              href={continueLessonHref}
              className="font-bold text-white underline-offset-2 hover:underline"
            >
              Week 6 — Scoring targets against your thesis
            </Link>
          </p>
        </div>
      </div>

      <ModuleAccordion modules={modules} />
    </div>
  );
}
