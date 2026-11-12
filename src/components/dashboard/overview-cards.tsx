/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Eye,
  Pencil,
  Settings,
  Upload,
} from "lucide-react";
import { journey, user } from "@/lib/data";
import { ProgressBar, button, card, eyebrow } from "@/components/ui";

function ProfileCard() {
  return (
    <section
      aria-labelledby="profile-card"
      className={`${card} flex flex-col overflow-hidden`}
    >
      <div className="relative h-20 overflow-hidden bg-navy" aria-hidden="true">
        <p className="absolute right-5 top-4 text-[9px] font-black uppercase tracking-brand text-white/40">
          Inclusive <span className="text-teal/70">Succession</span>
        </p>
      </div>
      <div className="-mt-10 flex flex-1 flex-col px-6 pb-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="relative h-20 w-20 rounded-full object-cover ring-4 ring-white"
        />
        <h2 id="profile-card" className="mt-3 text-xl font-black text-navy">
          {user.name}
        </h2>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-navy px-2.5 py-0.5 text-xs font-bold text-white">
            {user.role}
          </span>
          <span className="text-ink-muted">
            {user.cohort} · {user.location}
          </span>
        </div>
        <div className="mt-5">
          <div className="mb-1.5 flex items-baseline justify-between text-sm">
            <span className="font-bold text-ink">Profile completion</span>
            <span className="font-black text-deepteal">
              {user.profileCompletion}%
            </span>
          </div>
          <ProgressBar
            value={user.profileCompletion}
            label="Profile completion"
          />
          <p className="mt-1.5 text-xs text-ink-muted">
            Add your LinkedIn and a short bio to reach 100%.
          </p>
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Link href="/profile" className={button("outline")}>
            <Pencil className="h-4 w-4" />
            Edit profile
          </Link>
          <Link href="/profile" className={button("outline")}>
            <Settings className="h-4 w-4" />
            Account
          </Link>
        </div>
      </div>
    </section>
  );
}

function JourneyCard() {
  const { stage, totalStages } = journey;
  return (
    <section
      aria-labelledby="journey-card"
      className="flex flex-col rounded-2xl bg-navy p-6 text-white shadow-card"
    >
      <div className="flex items-center justify-between">
        <h2 id="journey-card" className={`${eyebrow} text-teal`}>
          My Acquisition Journey
        </h2>
        <span className="text-xs text-white/60">
          Stage {stage} of {totalStages}
        </span>
      </div>
      <p className="mt-4 text-2xl font-black leading-tight">{journey.title}</p>
      <p className="mt-2 inline-flex items-center gap-2 text-sm text-white/80">
        <span className="h-2 w-2 rounded-full bg-teal" aria-hidden="true" />
        {journey.status}
      </p>
      <div
        className="mt-5 flex gap-1"
        role="img"
        aria-label={`Stage ${stage} of ${totalStages}`}
      >
        {Array.from({ length: totalStages }, (_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < stage - 1
                ? "bg-teal"
                : i === stage - 1
                  ? "bg-teal/50"
                  : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <dl className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
        {journey.facts.map((fact) => (
          <div
            key={fact.label}
            className="flex items-baseline justify-between gap-4 text-sm"
          >
            <dt className="text-white/60">{fact.label}</dt>
            <dd className="text-right font-bold">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <Link
        href="/journey"
        className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-teal transition-colors duration-150 hover:text-white"
      >
        View full journey
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}

function ThesisCard() {
  return (
    <section
      aria-labelledby="thesis-card"
      className={`${card} flex flex-col p-6`}
    >
      <h2 id="thesis-card" className={`${eyebrow} text-deepteal`}>
        My Acquisition Thesis
      </h2>
      <Link
        href="/thesis"
        aria-label="Open acquisition thesis"
        className="group relative mt-4 block aspect-[16/9] overflow-hidden rounded-xl bg-navy p-5 text-left ring-1 ring-navy"
      >
        <p className="text-[9px] font-black uppercase tracking-brand text-white">
          Inclusive <span className="text-teal">Succession</span>
        </p>
        <p className="mt-3 text-base font-black leading-tight text-white sm:text-lg">
          Acquisition Thesis
        </p>
        <p className="mt-1 text-xs text-teal">
          B2B Professional Services · Southern Ontario
        </p>
        <div className="mt-4 space-y-1.5" aria-hidden="true">
          <div className="h-1 w-4/5 rounded-full bg-white/15" />
          <div className="h-1 w-3/5 rounded-full bg-white/15" />
          <div className="h-1 w-2/3 rounded-full bg-white/15" />
        </div>
        <span className="absolute bottom-3 right-3 rounded-md bg-white/10 px-2 py-1 text-[10px] font-bold text-white/80">
          6 pages
        </span>
        <span className="absolute inset-0 grid place-items-center bg-navy/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
            <Eye className="h-4 w-4" /> Preview
          </span>
        </span>
      </Link>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between gap-3">
          <span className="text-ink-muted">Status</span>
          <span className="inline-flex items-center gap-1.5 font-bold text-deepteal">
            <CircleCheck className="h-4 w-4" />
            Approved by facilitator
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-ink-muted">Last updated</span>
          <span className="font-bold text-ink">Feb 12, 2027</span>
        </div>
      </div>
      <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
        <Link href="/thesis" className={button("dark")}>
          <Eye className="h-4 w-4" />
          View
        </Link>
        <button type="button" className={button("outline")}>
          <Upload className="h-4 w-4" />
          Upload
        </button>
      </div>
    </section>
  );
}

export function OverviewCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <ProfileCard />
      <JourneyCard />
      <ThesisCard />
    </div>
  );
}
