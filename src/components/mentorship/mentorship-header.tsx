import Link from "next/link";
import type { ReactNode } from "react";

const tabs = [
  { id: "mentors", label: "Mentors & facilitators", href: "/mentorship" },
  { id: "sessions", label: "My sessions", href: "/mentorship/sessions" },
] as const;

export function MentorshipHeader({
  active,
  description,
  action,
}: {
  active: (typeof tabs)[number]["id"];
  description: string;
  action?: ReactNode;
}) {
  return (
    <>
      <header className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-tight text-navy md:text-[32px] md:leading-tight">
            Your Mentorship Network
          </h1>
          <p className="mt-1.5 max-w-2xl text-[15px] text-ink-muted">
            {description}
          </p>
        </div>
        {action && (
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {action}
          </div>
        )}
      </header>

      <nav
        aria-label="Mentorship"
        className="mb-6 flex gap-1 border-b border-line"
      >
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            aria-current={tab.id === active ? "page" : undefined}
            className={`border-b-2 px-3 pb-3 text-sm font-bold transition-colors duration-150 ${
              tab.id === active
                ? "border-teal text-navy"
                : "border-transparent text-ink-muted hover:text-navy"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
