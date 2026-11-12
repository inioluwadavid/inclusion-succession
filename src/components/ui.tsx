import { Check } from "lucide-react";
import type { ModuleStatus } from "@/lib/data";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const buttonVariants = {
  primary: "bg-teal text-navy hover:bg-teal-600",
  dark: "bg-navy text-white hover:bg-navy-700",
  outline:
    "border border-line bg-white text-ink hover:bg-mist hover:border-ink/20",
};

/** Class string for a button or link styled as a button. Pass size classes (h-10 px-3 …) via `extra`. */
export function button(
  variant: keyof typeof buttonVariants,
  extra = "h-10 px-3",
) {
  return `${buttonBase} ${buttonVariants[variant]} ${extra}`;
}

export const card = "bg-white rounded-2xl border border-line shadow-card";

export const eyebrow = "text-[11px] font-bold uppercase tracking-[0.18em]";

export function ProgressBar({
  value,
  label,
  className = "h-1.5",
  track = "bg-mist",
}: {
  value: number;
  label: string;
  className?: string;
  track?: string;
}) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={`w-full overflow-hidden rounded-full ${track} ${className}`}
    >
      <div
        className="h-full rounded-full bg-teal"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function Brand({ className = "" }: { className?: string }) {
  return (
    <p className={`font-black uppercase tracking-brand ${className}`}>
      Inclusive <span className="text-teal">Succession</span>
    </p>
  );
}

export function StatusPill({
  status,
  className = "inline-flex",
}: {
  status: ModuleStatus;
  className?: string;
}) {
  const base = `${className} items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold`;
  if (status === "completed") {
    return (
      <span className={`${base} bg-teal-50 text-deepteal`}>
        <Check className="h-3 w-3" strokeWidth={3} />
        Completed
      </span>
    );
  }
  if (status === "in-progress") {
    return (
      <span className={`${base} bg-signal-soft text-signal-ink`}>
        <span
          className="h-1.5 w-1.5 rounded-full bg-signal"
          aria-hidden="true"
        />
        In Progress
      </span>
    );
  }
  return (
    <span className={`${base} bg-mist text-ink-muted`}>
      <span
        className="h-1.5 w-1.5 rounded-full bg-ink-subtle"
        aria-hidden="true"
      />
      Not Started
    </span>
  );
}
