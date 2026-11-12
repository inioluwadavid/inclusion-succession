import type { Metadata } from "next";
import { milestones } from "@/lib/data";
import { JourneyTimeline } from "@/components/journey/journey-timeline";

export const metadata: Metadata = {
  title: "My Acquisition Journey · Inclusive Succession",
};

export default function JourneyPage() {
  return (
    <div className="space-y-6">
      <header className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-tight text-navy md:text-[32px] md:leading-tight">
            My Acquisition Journey
          </h1>
          <p className="mt-1.5 max-w-2xl text-[15px] text-ink-muted">
            Eight milestones from readiness to ownership. Select a milestone to
            see what it involves and who is supporting you.
          </p>
        </div>
      </header>

      <JourneyTimeline milestones={milestones} />
    </div>
  );
}
