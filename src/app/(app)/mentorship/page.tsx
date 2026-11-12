/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarPlus, Mail } from "lucide-react";
import { mentors } from "@/lib/mentors";
import { button } from "@/components/ui";
import { BookButton } from "@/components/mentorship/booking";
import { MentorshipHeader } from "@/components/mentorship/mentorship-header";

export const metadata: Metadata = {
  title: "Mentorship & Facilitators · Inclusive Succession",
};

export default function MentorshipPage() {
  return (
    <div>
      <MentorshipHeader
        active="mentors"
        description="Investors, lawyers, lenders, and operators who have been where you're going. Message them anytime or book a one-on-one."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {mentors.map((mentor) => (
          <article
            key={mentor.id}
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-navy">
              <img
                src={mentor.avatar}
                alt={`Headshot of ${mentor.name}`}
                className="h-full w-full object-cover object-top"
              />
              {mentor.advisor && (
                <span className="absolute left-3 top-3 rounded-full bg-teal px-2.5 py-1 text-[11px] font-black text-navy">
                  Your advisor
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-black text-navy">
                <Link
                  href={`/mentorship/${mentor.id}`}
                  className="hover:underline"
                >
                  {mentor.name}
                </Link>
              </h3>
              <p className="text-sm font-bold text-deepteal">
                {mentor.specialty}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {mentor.bio}
              </p>
              <ul
                className="mt-4 flex flex-wrap gap-1.5"
                aria-label="Areas of specialization"
              >
                {mentor.specializations.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-mist px-2.5 py-1 text-xs font-bold text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                <Link
                  href={mentor.messageHref}
                  aria-label={`Message ${mentor.name}`}
                  className={button("outline")}
                >
                  <Mail className="h-4 w-4" />
                  Message
                </Link>
                <BookButton mentor={mentor} className={button("dark")}>
                  <CalendarPlus className="h-4 w-4" />
                  Book
                </BookButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
