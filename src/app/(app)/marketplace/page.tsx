import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { button } from "@/components/ui";
import { MarketplaceView } from "@/components/marketplace/marketplace-browser";

export const metadata: Metadata = {
  title: "Seller Marketplace · Inclusive Succession",
};

export default function MarketplacePage() {
  return (
    <div>
      <header className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-tight text-navy md:text-[32px] md:leading-tight">
            Seller Marketplace
          </h1>
          <p className="mt-1.5 max-w-2xl text-[15px] text-ink-muted">
            A curated, confidential network of established Ontario business
            owners preparing for their next chapter. Profiles stay anonymized
            until an owner approves your introduction.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Link
            href="/marketplace/requests"
            className={button("outline", "h-10 px-4")}
          >
            My introduction requests
            <span className="rounded-full bg-navy px-1.5 text-xs text-white">
              2
            </span>
          </Link>
        </div>
      </header>

      <div className="mb-5 flex items-start gap-3 rounded-xl bg-teal-50 px-4 py-3 text-sm text-navy ring-1 ring-teal-100">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-deepteal" />
        <p>
          <span className="font-bold">
            Every introduction is consent-based.
          </span>{" "}
          Your information stays confidential throughout the process.
        </p>
      </div>

      <MarketplaceView />
    </div>
  );
}
