/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  BookOpen,
  Calculator,
  Calendar,
  CalendarPlus,
  ClipboardCheck,
  Download,
  FileText,
  Handshake,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import {
  mentors,
  notifications,
  programInfo,
  resources,
  sessions,
} from "@/lib/data";
import { card, eyebrow } from "@/components/ui";

const icons: Record<string, LucideIcon> = {
  book: BookOpen,
  calculator: Calculator,
  file: FileText,
  clipboard: ClipboardCheck,
  handshake: Handshake,
  calendar: Calendar,
};

function PanelHeader({
  id,
  title,
  linkLabel,
  href,
  children,
}: {
  id: string;
  title: string;
  linkLabel: string;
  href: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2
        id={id}
        className="flex items-center gap-2 text-lg font-black text-navy"
      >
        {title}
        {children}
      </h2>
      <Link
        href={href}
        className="text-sm font-bold text-deepteal hover:underline"
      >
        {linkLabel}
      </Link>
    </div>
  );
}

const iconLink =
  "grid h-9 w-9 place-items-center rounded-lg border border-line text-ink-muted transition-colors duration-150 hover:bg-mist hover:text-navy";

export function MentorshipNetwork() {
  return (
    <section aria-labelledby="mentorship-preview" className={`${card} p-6`}>
      <PanelHeader
        id="mentorship-preview"
        title="Your Mentorship Network"
        linkLabel="View all"
        href="/mentorship"
      />
      <ul className="mt-4 divide-y divide-line">
        {mentors.map((mentor) => (
          <li
            key={mentor.name}
            className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
          >
            <img
              src={mentor.avatar}
              alt=""
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 font-bold text-navy">
                {mentor.name}
                {mentor.advisor && (
                  <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-deepteal">
                    Your advisor
                  </span>
                )}
              </p>
              <p className="truncate text-sm text-ink-muted">
                {mentor.specialty}
              </p>
            </div>
            <div className="flex gap-1">
              <Link
                href="/messages"
                className={iconLink}
                aria-label={`Message ${mentor.name}`}
              >
                <MessageSquare className="h-4 w-4" />
              </Link>
              <Link
                href="/mentorship"
                className={iconLink}
                aria-label={`Book a meeting with ${mentor.name}`}
              >
                <CalendarPlus className="h-4 w-4" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProgramResources() {
  return (
    <section aria-labelledby="resources-preview" className={`${card} p-6`}>
      <PanelHeader
        id="resources-preview"
        title="Program resources"
        linkLabel="All resources"
        href="/resources"
      />
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {resources.map((resource) => {
          const Icon = icons[resource.icon];
          return (
            <li key={resource.title}>
              <button
                type="button"
                className="group flex w-full items-center gap-3 rounded-xl border border-line p-3 text-left transition-colors duration-150 hover:border-teal hover:bg-teal-50/40"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-teal-50 text-deepteal">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-navy">
                    {resource.title}
                  </span>
                  <span className="block text-xs text-ink-muted">
                    {resource.meta}
                  </span>
                </span>
                <Download className="h-4 w-4 shrink-0 text-ink-muted group-hover:text-deepteal" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function UpcomingSessions() {
  return (
    <section aria-labelledby="upcoming-sessions" className={`${card} p-6`}>
      <PanelHeader
        id="upcoming-sessions"
        title="Upcoming sessions"
        linkLabel="Calendar"
        href="/mentorship/sessions"
      />
      <ul className="mt-4 space-y-3">
        {sessions.map((session, i) => (
          <li key={session.title} className="flex gap-3">
            <div
              className={`flex w-12 shrink-0 flex-col items-center justify-center rounded-lg py-1.5 ${
                i === 0 ? "bg-navy text-white" : "bg-mist text-navy"
              }`}
            >
              <span
                className={`text-[10px] font-bold uppercase ${i === 0 ? "text-teal" : "text-ink-muted"}`}
              >
                {session.month}
              </span>
              <span className="text-lg font-black leading-none">
                {session.day}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold leading-snug text-navy">
                {session.title}
              </p>
              <p className="text-xs text-ink-muted">{session.meta}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RecentNotifications() {
  return (
    <section aria-labelledby="recent-notifications" className={`${card} p-6`}>
      <PanelHeader
        id="recent-notifications"
        title="Notifications"
        linkLabel="View all"
        href="/messages?tab=notifications"
      >
        <span className="rounded-full bg-teal px-2 py-0.5 text-xs font-black text-navy">
          3 new
        </span>
      </PanelHeader>
      <ul className="-mx-2 mt-3">
        {notifications.map((notification) => {
          const Icon = icons[notification.icon];
          return (
            <li key={notification.title}>
              <button
                type="button"
                className="flex w-full gap-3 rounded-lg px-2 py-2.5 text-left transition-colors duration-150 hover:bg-mist"
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-deepteal" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold leading-snug text-navy">
                    {notification.title}
                  </span>
                  <span className="block text-xs text-ink-muted">
                    {notification.time}
                  </span>
                </span>
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal"
                  aria-label="Unread"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function ProgramInformation() {
  return (
    <section aria-labelledby="program-info" className={`${card} p-6`}>
      <p className={`${eyebrow} text-deepteal`}>Program information</p>
      <h2 id="program-info" className="mt-1 text-lg font-black text-navy">
        Inclusive Succession – Cohort 1
      </h2>
      <dl className="mt-4 divide-y divide-line text-sm">
        {programInfo.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
          >
            <dt className="text-ink-muted">{row.label}</dt>
            <dd
              className={`text-right font-bold ${row.highlight ? "text-deepteal" : "text-ink"}`}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
