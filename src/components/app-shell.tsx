"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  Bell,
  BookOpen,
  ChevronDown,
  CircleUser,
  FolderLock,
  LayoutDashboard,
  Library,
  Menu,
  MessageSquare,
  Route,
  Search,
  Store,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { Toaster } from "sonner";
import { user } from "@/lib/data";
import {
  NotificationsProvider,
  useNotifications,
} from "@/components/notifications-context";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
};

const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "Program",
    items: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard },
      { label: "My Learning", href: "/learning", icon: BookOpen },
      { label: "My Acquisition Journey", href: "/journey", icon: Route },
    ],
  },
  {
    title: "Network",
    items: [
      { label: "Seller Marketplace", href: "/marketplace", icon: Store },
      { label: "Deal Rooms", href: "/deal-rooms", icon: FolderLock },
      { label: "Mentorship & Facilitators", href: "/mentorship", icon: Users },
    ],
  },
  {
    title: "Workspace",
    items: [
      { label: "Resources", href: "/resources", icon: Library },
      { label: "Messages", href: "/messages", icon: MessageSquare, badge: 3 },
      { label: "My Profile", href: "/profile", icon: CircleUser },
    ],
  },
];

function isActive(pathname: string | null, href: string) {
  if (pathname === null) return false;
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

type NavProps = { onNavigate?: () => void };

// The pathname is only known at request time, so the active state streams in
// behind Suspense while the rest of the shell is prerendered.
function ActiveNavGroups(props: NavProps) {
  return <NavGroups pathname={usePathname()} {...props} />;
}

function NavGroups({
  pathname,
  onNavigate,
}: NavProps & { pathname: string | null }) {
  return (
    <>
      {navGroups.map((group) => (
        <div key={group.title} className="mb-5">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            {group.title}
          </p>
          <ul className="space-y-0.5">
            {group.items.map(({ label, href, icon: Icon, badge }) => {
              const active = isActive(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={`group relative flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-bold transition-colors duration-150 ${
                      active
                        ? "bg-white/[0.08] text-white"
                        : "text-white/65 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {active && (
                      <span
                        className="absolute left-0 top-2 h-6 w-[3px] rounded-r bg-teal"
                        aria-hidden="true"
                      />
                    )}
                    <Icon
                      className={`h-[18px] w-[18px] shrink-0 ${active ? "text-teal" : "text-white/50"}`}
                    />
                    <span className="truncate">{label}</span>
                    {badge ? (
                      <span className="ml-auto rounded-full bg-teal px-1.5 py-0.5 text-[10px] font-black leading-none text-navy">
                        {badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}

function Sidebar({ onNavigate }: NavProps) {
  return (
    <div className="flex h-full flex-col bg-navy text-white">
      <div className="px-6 pb-6 pt-7">
        <div className="leading-none">
          <p className="text-[13px] font-black uppercase tracking-brand text-white">
            Inclusive <span className="text-teal">Succession</span>
          </p>
          <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
            A Pitch Better Program
          </p>
        </div>
      </div>

      <nav
        aria-label="Main"
        className="scroll-thin flex-1 overflow-y-auto px-3"
      >
        <Suspense
          fallback={<NavGroups pathname={null} onNavigate={onNavigate} />}
        >
          <ActiveNavGroups onNavigate={onNavigate} />
        </Suspense>
      </nav>

      <div className="m-3 rounded-xl bg-white/[0.05] p-4 ring-1 ring-white/10">
        <div className="flex items-baseline justify-between">
          <p className="text-xs font-bold text-white">Cohort 1</p>
          <p className="text-[11px] text-white/60">Week 6 of 16</p>
        </div>
        <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-teal"
            style={{ width: "38%" }}
          />
        </div>
        <p className="mt-2.5 text-[11px] text-white/60">
          Jan 11 – Apr 30, 2027
        </p>
      </div>
    </div>
  );
}

function Topbar({ onOpenNav }: { onOpenNav: () => void }) {
  const unread = useNotifications().unreadIds.size;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/95 px-4 backdrop-blur md:px-8">
      <button
        type="button"
        onClick={onOpenNav}
        className="grid h-10 w-10 place-items-center rounded-lg text-navy hover:bg-mist lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <form
        role="search"
        className="relative hidden max-w-md flex-1 sm:block"
        onSubmit={(e) => e.preventDefault()}
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
        <input
          placeholder="Search lessons, businesses, resources…"
          aria-label="Search"
          className="h-10 w-full rounded-lg border border-line bg-mist pl-9 pr-3 text-sm text-ink transition-colors duration-150 placeholder:text-ink-muted focus:border-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal/30"
        />
      </form>

      <div className="ml-auto flex items-center gap-1">
        <Link
          href="/messages"
          className="relative grid h-10 w-10 place-items-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-mist hover:text-navy"
          aria-label="Messages, 3 unread"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-teal ring-2 ring-white" />
        </Link>
        <div className="relative">
          <button
            type="button"
            className="relative grid h-10 w-10 place-items-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-mist hover:text-navy"
            aria-label={
              unread ? `Notifications, ${unread} unread` : "Notifications"
            }
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-teal px-1 text-[10px] font-black text-navy ring-2 ring-white">
                {unread}
              </span>
            )}
          </button>
        </div>
        <div
          className="mx-2 hidden h-6 w-px bg-line md:block"
          aria-hidden="true"
        />
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 transition-colors duration-150 hover:bg-mist"
            aria-haspopup="menu"
          >
            <img
              src={user.avatar}
              alt=""
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="hidden text-left leading-tight md:block">
              <span className="block text-sm font-bold text-navy">
                {user.name}
              </span>
              <span className="block text-[11px] text-ink-muted">
                {user.role} · {user.cohort}
              </span>
            </span>
            <ChevronDown className="hidden h-4 w-4 text-ink-muted md:block" />
          </button>
        </div>
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setNavOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen]);

  return (
    <NotificationsProvider>
      <div className="min-h-screen w-full bg-mist">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] lg:block">
          <Sidebar />
        </aside>

        {navOpen && (
          <div
            className="fixed inset-0 z-50 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <div
              className="absolute inset-0 bg-navy/60"
              onClick={() => setNavOpen(false)}
            />
            <div className="relative h-full w-[264px] max-w-[85vw]">
              <Sidebar onNavigate={() => setNavOpen(false)} />
              <button
                type="button"
                onClick={() => setNavOpen(false)}
                className="absolute left-full top-4 ml-2 grid h-9 w-9 place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        <div className="lg:pl-[264px]">
          <Topbar onOpenNav={() => setNavOpen(true)} />
          <main className="mx-auto w-full max-w-[1400px] px-4 py-6 md:px-8 md:py-8">
            {children}
          </main>
        </div>
        <Toaster />
      </div>
    </NotificationsProvider>
  );
}
