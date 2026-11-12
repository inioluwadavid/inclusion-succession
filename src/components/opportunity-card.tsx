/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  ArrowUpRight,
  Bookmark,
  Clock,
  Lock,
  MapPin,
  Target,
} from "lucide-react";
import type { Opportunity } from "@/lib/data";
import { button } from "@/components/ui";

export function OpportunityCard({
  opportunity: opp,
  saved,
  onToggleSaved,
}: {
  opportunity: Opportunity;
  saved: boolean;
  onToggleSaved: () => void;
}) {
  const href = `/marketplace/${opp.id}`;
  const facts = [
    { label: "Annual revenue", value: opp.revenue },
    { label: "Established", value: opp.established },
    { label: "Employees", value: opp.employees },
    { label: "Transition", value: opp.transition },
  ];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow duration-200 hover:shadow-lift">
      <div className="relative aspect-[16/9] overflow-hidden bg-navy">
        <Link href={href} tabIndex={-1} aria-hidden="true">
          <img
            src={opp.image}
            alt=""
            className="h-full w-full object-cover opacity-90 transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
        </Link>
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-navy/85 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
            <Lock className="h-3 w-3 text-teal" />
            {opp.code}
          </span>
          <button
            type="button"
            onClick={onToggleSaved}
            aria-label={
              saved ? `Remove ${opp.code} from saved` : `Save ${opp.code}`
            }
            aria-pressed={saved}
            className={`pointer-events-auto grid h-8 w-8 place-items-center rounded-md backdrop-blur transition-colors duration-150 ${
              saved
                ? "bg-teal text-navy"
                : "bg-navy/70 text-white hover:bg-navy"
            }`}
          >
            <Bookmark
              className="h-4 w-4"
              fill={saved ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-bold ${
              opp.ready ? "bg-teal-50 text-deepteal" : "bg-mist text-ink-muted"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${opp.ready ? "bg-teal" : "bg-ink-subtle"}`}
            />
            {opp.readiness}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-bold ${
              opp.match >= 4 ? "bg-navy text-white" : "bg-mist text-ink-muted"
            }`}
          >
            <Target className="h-3 w-3" />
            {opp.match}/5 thesis match
          </span>
        </div>

        <h3 className="mt-3 text-lg font-black leading-snug text-navy">
          <Link href={href} className="hover:underline">
            {opp.title}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
          <MapPin className="h-3.5 w-3.5" />
          {opp.region} · {opp.industry}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-line py-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                {fact.label}
              </dt>
              <dd className="mt-0.5 text-sm font-bold text-ink">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 line-clamp-2 text-sm text-ink-muted">
          {opp.summary}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-5">
          <Link href={href} className={button("outline", "h-10 flex-1 px-3")}>
            View profile
          </Link>
          {opp.dealRoomHref ? (
            <Link
              href={opp.dealRoomHref}
              className={button("dark", "h-10 flex-1 px-3")}
            >
              Deal room
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : opp.ownerReviewing ? (
            <Link
              href="/marketplace/requests"
              className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-signal-soft px-3 text-sm font-bold text-signal-ink transition-colors duration-150 hover:bg-signal-soft/70"
            >
              <Clock className="h-4 w-4" />
              Owner reviewing
            </Link>
          ) : (
            <Link
              href={`${href}/request`}
              className={button("primary", "h-10 flex-1 px-3")}
            >
              Request intro
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
