import type { Metadata } from "next";
import {
  BookOpen,
  Calculator,
  CalendarDays,
  ClipboardCheck,
  Clock,
  Download,
  Eye,
  FileText,
  Landmark,
  Route,
  type LucideIcon,
} from "lucide-react";
import { resourceGroups, type ResourceIcon } from "@/lib/resources";
import { button } from "@/components/ui";
import { ToastButton } from "@/components/toast-button";

export const metadata: Metadata = {
  title: "Program Resources · Inclusive Succession",
};

const icons: Record<ResourceIcon, LucideIcon> = {
  book: BookOpen,
  clock: Clock,
  calendar: CalendarDays,
  calculator: Calculator,
  file: FileText,
  clipboard: ClipboardCheck,
  route: Route,
  landmark: Landmark,
};

export default function ResourcesPage() {
  return (
    <div>
      <header className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-tight text-navy md:text-[32px] md:leading-tight">
            Program Resources
          </h1>
          <p className="mt-1.5 max-w-2xl text-[15px] text-ink-muted">
            Manuals, workbooks, and templates for every stage of the program.
            Updated for Cohort 1.
          </p>
        </div>
      </header>

      <div className="space-y-10">
        {resourceGroups.map((group) => {
          const headingId = `group-${group.title.toLowerCase().replace(/[^a-z]+/g, "-")}`;
          return (
            <section key={group.title} aria-labelledby={headingId}>
              <h2 id={headingId} className="mb-4 text-lg font-black text-navy">
                {group.title}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {group.items.map((resource) => {
                  const Icon = icons[resource.icon];
                  return (
                    <article
                      key={resource.title}
                      className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-teal">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="rounded-md bg-mist px-2 py-1 text-[11px] font-bold text-ink-muted">
                          {resource.meta}
                        </span>
                      </div>
                      <h3 className="mt-4 font-black leading-snug text-navy">
                        {resource.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-ink-muted">
                        {resource.description}
                      </p>
                      {resource.audience && (
                        <p className="mt-2 text-xs font-bold text-deepteal">
                          {resource.audience}
                        </p>
                      )}
                      <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                        <ToastButton
                          message={`Opening ${resource.title}`}
                          className={button("outline", "h-9 px-3")}
                        >
                          <Eye className="h-4 w-4" /> View
                        </ToastButton>
                        <ToastButton
                          success
                          message={`Downloading ${resource.title}`}
                          className={button("primary", "h-9 px-3")}
                        >
                          <Download className="h-4 w-4" /> Download
                        </ToastButton>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
