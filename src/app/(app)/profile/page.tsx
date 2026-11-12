/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Check, Pencil } from "lucide-react";
import { user } from "@/lib/data";
import { ProgressBar, button, card } from "@/components/ui";
import { ToastButton } from "@/components/toast-button";

export const metadata: Metadata = {
  title: "My Profile · Inclusive Succession",
};

export default function ProfilePage() {
  return (
    <div>
      <header className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-tight text-navy md:text-[32px] md:leading-tight">
            My Profile
          </h1>
          <p className="mt-1.5 max-w-2xl text-[15px] text-ink-muted">
            How you appear to facilitators, mentors, and approved matches.
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <section
            className={`${card} flex flex-col gap-5 p-6 sm:flex-row sm:items-center`}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="h-24 w-24 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-black text-navy">{user.name}</h2>
              <p className="text-sm text-ink-muted">
                {user.role} · {user.cohort} · {user.location}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{user.email}</p>
            </div>
            <ToastButton
              message="Editing is disabled in this prototype."
              className={button("outline", "h-10 px-4")}
            >
              <Pencil className="h-4 w-4" /> Edit profile
            </ToastButton>
          </section>

          <section aria-labelledby="details" className={`${card} p-6`}>
            <h2 id="details" className="text-lg font-black text-navy">
              Acquisition criteria
            </h2>
            <dl className="mt-4 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {user.criteria.map((item) => (
                <div key={item.label} className="bg-white p-4">
                  <dt className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                    {item.label}
                  </dt>
                  <dd className="mt-0.5 font-bold text-navy">{item.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-ink-muted">
              Thesis on file:{" "}
              <span className="font-bold text-navy">{user.thesisFile}</span> ·
              Updated {user.thesisUpdated}
            </p>
          </section>
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <section aria-labelledby="completion" className={`${card} p-6`}>
            <div className="flex items-baseline justify-between">
              <h2 id="completion" className="text-lg font-black text-navy">
                Profile completion
              </h2>
              <span className="font-black text-deepteal">
                {user.profileCompletion}%
              </span>
            </div>
            <ProgressBar
              value={user.profileCompletion}
              label="Profile completion"
              className="mt-3 h-1.5"
            />
            <ul className="mt-4 space-y-2.5">
              {user.completionSteps.map((step) => (
                <li
                  key={step.label}
                  className="flex items-center gap-3 text-sm"
                >
                  {step.done ? (
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-teal text-navy">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="grid h-5 w-5 place-items-center rounded-full border border-ink/20" />
                  )}
                  <span
                    className={
                      step.done ? "text-ink-muted" : "font-bold text-navy"
                    }
                  >
                    {step.label}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
