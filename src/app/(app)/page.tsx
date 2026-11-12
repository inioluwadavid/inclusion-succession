import Link from "next/link";
import { Play } from "lucide-react";
import { continueLessonHref, user } from "@/lib/data";
import { button } from "@/components/ui";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { LearningProgress } from "@/components/dashboard/learning-progress";
import { MarketplaceSpotlight } from "@/components/dashboard/marketplace-spotlight";
import {
  MentorshipNetwork,
  ProgramInformation,
  ProgramResources,
  RecentNotifications,
  UpcomingSessions,
} from "@/components/dashboard/side-panels";

export default function DashboardPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 inline-flex flex-wrap items-center gap-x-2 text-sm text-ink-muted">
            <span className="font-black text-deepteal">{user.cohort}</span>
            <span className="text-line" aria-hidden="true">
              |
            </span>
            <span>January 2027 – April 2027</span>
          </p>
          <h1 className="text-3xl font-black tracking-tight text-navy md:text-[40px] md:leading-[1.1]">
            Welcome back, {user.firstName}
          </h1>
          <p className="mt-2 max-w-xl text-[15px] text-ink-muted md:text-base">
            Your journey to business ownership is underway. Here&apos;s your progress.
          </p>
        </div>
        <Link href={continueLessonHref} className={button("primary", "h-11 self-start px-5 md:self-auto")}>
          <Play className="h-4 w-4" fill="currentColor" />
          Continue learning
        </Link>
      </header>

      <OverviewCards />
      <LearningProgress />
      <MarketplaceSpotlight />

      <div className="grid gap-5 xl:grid-cols-12">
        <div className="space-y-5 xl:col-span-8">
          <MentorshipNetwork />
          <ProgramResources />
        </div>
        <div className="space-y-5 xl:col-span-4">
          <UpcomingSessions />
          <RecentNotifications />
          <ProgramInformation />
        </div>
      </div>
    </div>
  );
}
