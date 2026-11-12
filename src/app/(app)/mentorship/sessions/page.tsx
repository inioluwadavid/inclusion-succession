/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarPlus, MessageSquare, Users, Video } from "lucide-react";
import {
  assignedAdvisors,
  pastSessions,
  upcomingSessions,
} from "@/lib/mentors";
import { button, card } from "@/components/ui";
import { BookButton } from "@/components/mentorship/booking";
import { ToastButton } from "@/components/toast-button";
import { MentorshipHeader } from "@/components/mentorship/mentorship-header";

export const metadata: Metadata = {
  title: "My sessions · Inclusive Succession",
};

export default function SessionsPage() {
  return (
    <div>
      <MentorshipHeader
        active="sessions"
        description="Upcoming sessions, past conversations, and the advisors assigned to you."
        action={
          <BookButton
            mentor={assignedAdvisors[0]}
            className={button("primary", "h-11 px-5")}
          >
            <CalendarPlus className="h-4 w-4" />
            Book a session
          </BookButton>
        }
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <section aria-labelledby="upcoming" className={`${card} p-6`}>
            <h2 id="upcoming" className="text-lg font-black text-navy">
              Upcoming
            </h2>
            <ul className="mt-4 space-y-3">
              {upcomingSessions.map((session, i) => {
                // The next session is highlighted and can be joined.
                const next = i === 0;
                const FormatIcon = session.group ? Users : Video;
                return (
                  <li
                    key={session.title}
                    className={`flex flex-col gap-4 rounded-xl p-4 sm:flex-row sm:items-center ${
                      next ? "bg-navy text-white" : "border border-line"
                    }`}
                  >
                    <div
                      className={`flex w-16 shrink-0 flex-col items-center rounded-lg py-2 ${
                        next ? "bg-white/10" : "bg-mist"
                      }`}
                    >
                      <span
                        className={`text-[11px] font-bold uppercase ${
                          next ? "text-teal" : "text-ink-muted"
                        }`}
                      >
                        {session.month}
                      </span>
                      <span
                        className={`text-2xl font-black leading-none ${
                          next ? "text-white" : "text-navy"
                        }`}
                      >
                        {session.day}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`font-bold ${next ? "text-white" : "text-navy"}`}
                      >
                        {session.title}
                      </p>
                      <p
                        className={`mt-0.5 flex flex-wrap items-center gap-x-2 text-sm ${
                          next ? "text-white/70" : "text-ink-muted"
                        }`}
                      >
                        <span className="inline-flex items-center gap-1">
                          <FormatIcon className="h-3.5 w-3.5" />
                          {session.format}
                        </span>
                        · {session.time} · with {session.host}
                      </p>
                      <p
                        className={`mt-1 text-xs ${next ? "text-white/60" : "text-ink-muted"}`}
                      >
                        {session.note}
                      </p>
                    </div>
                    {next ? (
                      <ToastButton
                        message="Joining opens 10 minutes before the session."
                        className={button("primary", "h-9 shrink-0 px-3")}
                      >
                        Join call
                      </ToastButton>
                    ) : (
                      <ToastButton
                        message="Added to your calendar"
                        className={button("outline", "h-9 shrink-0 px-3")}
                      >
                        Add to calendar
                      </ToastButton>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="past" className={`${card} p-6`}>
            <h2 id="past" className="text-lg font-black text-navy">
              Past sessions
            </h2>
            <ul className="mt-3 divide-y divide-line">
              {pastSessions.map((session) => (
                <li
                  key={session.title}
                  className="flex items-start gap-4 py-3.5"
                >
                  <img
                    src={session.avatar}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-navy">{session.title}</p>
                    <p className="text-xs text-ink-muted">{session.meta}</p>
                    <p className="mt-1 text-sm text-ink">{session.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:col-span-4">
          <section aria-labelledby="assigned" className={`${card} p-6`}>
            <h2 id="assigned" className="text-lg font-black text-navy">
              Assigned advisors
            </h2>
            <ul className="mt-4 space-y-5">
              {assignedAdvisors.map((advisor) => (
                <li key={advisor.id}>
                  <div className="flex items-center gap-3">
                    <img
                      src={advisor.avatar}
                      alt=""
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-navy">{advisor.name}</p>
                      <p className="text-sm text-ink-muted">
                        {advisor.specialty}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Link
                      href={advisor.messageHref}
                      className={button("outline", "h-9 px-3")}
                    >
                      <MessageSquare className="h-4 w-4" /> Message
                    </Link>
                    <BookButton
                      mentor={advisor}
                      className={button("dark", "h-9 px-3")}
                    >
                      <CalendarPlus className="h-4 w-4" /> Book
                    </BookButton>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
