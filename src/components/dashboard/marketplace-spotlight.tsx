"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { featuredOpportunities, marketplaceStats } from "@/lib/data";
import { button, eyebrow } from "@/components/ui";
import { OpportunityCard } from "@/components/opportunity-card";

export function MarketplaceSpotlight() {
  const [saved, setSaved] = useState(
    () =>
      new Set(featuredOpportunities.filter((o) => o.saved).map((o) => o.id)),
  );
  const toggle = (id: string) =>
    setSaved((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  return (
    <section
      aria-labelledby="marketplace-spotlight"
      className="overflow-hidden rounded-2xl bg-navy text-white shadow-card"
    >
      <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <p className={`${eyebrow} text-teal`}>The Seller Marketplace</p>
          <h2
            id="marketplace-spotlight"
            className="mt-3 text-3xl font-black leading-[1.1] tracking-tight md:text-[40px]"
          >
            Discover businesses.
            <br />
            <span className="text-teal">Meet potential successors.</span>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75">
            Explore a curated network of established business owners who are
            preparing for their next chapter. Discover potential acquisition
            opportunities and build relationships with business owners.
          </p>
        </div>
        <div>
          <dl className="grid grid-cols-2 gap-y-5 border-t border-white/10 pt-5 sm:grid-cols-4 lg:grid-cols-2">
            {marketplaceStats.map((stat) => (
              <Link
                key={stat.label}
                href={stat.href}
                className="group flex flex-col-reverse"
              >
                <dt className="mt-0.5 text-xs text-white/60 group-hover:text-white">
                  {stat.label}
                </dt>
                <dd className="text-3xl font-black text-teal">{stat.value}</dd>
              </Link>
            ))}
          </dl>
        </div>
      </div>

      <div className="px-6 pb-6 md:px-10 md:pb-10">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredOpportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              saved={saved.has(opp.id)}
              onToggleSaved={() => toggle(opp.id)}
            />
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm text-white/80 ring-1 ring-white/10 md:max-w-xl">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
            <p>
              <span className="font-bold">
                Every introduction is consent-based.
              </span>{" "}
              Your information stays confidential throughout the process.
            </p>
          </div>
          <Link href="/marketplace" className={button("primary", "h-11 px-5")}>
            Explore all 6 opportunities
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
