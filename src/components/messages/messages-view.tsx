"use client";

/* eslint-disable @next/next/no-img-element */
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Handshake,
  Lock,
  Megaphone,
  Send,
  type LucideIcon,
} from "lucide-react";
import {
  appNotifications,
  newThreads,
  notificationCategories,
  threads as baseThreads,
  type ChatMessage,
  type NotificationCategory,
  type Thread,
} from "@/lib/messages";
import { button, card } from "@/components/ui";
import { useNotifications } from "@/components/notifications-context";

type Tab = "messages" | "notifications";

type ViewProps = {
  /** Thread named in the URL, or null on /messages (where the first thread is previewed). */
  threadId: string | null;
  tab: Tab;
  /** Update the URL without a navigation, so sent messages and read state are kept. */
  onNavigate: (threadId: string | null, tab: Tab) => void;
};

const categoryIcons: Record<NotificationCategory, LucideIcon> = {
  Introductions: Handshake,
  Mentorship: Calendar,
  Learning: BookOpen,
  Announcements: Megaphone,
};

function Avatar({ avatar, size }: { avatar: Thread["avatar"]; size: string }) {
  return typeof avatar === "string" ? (
    <img
      src={avatar}
      alt=""
      className={`${size} shrink-0 rounded-full object-cover`}
    />
  ) : (
    <span
      className={`${size} grid shrink-0 place-items-center rounded-full bg-navy text-xs font-black text-teal`}
    >
      {avatar.initials}
    </span>
  );
}

function Conversations({
  threadId,
  onNavigate,
}: Pick<ViewProps, "threadId" | "onNavigate">) {
  const [sent, setSent] = useState<Record<string, ChatMessage[]>>({});
  const [readIds, setReadIds] = useState<ReadonlySet<string>>(new Set());
  const [draft, setDraft] = useState("");

  // A "new" conversation only appears in the list while it is open or has messages.
  const extra = newThreads.filter(
    (t) => t.id === threadId || sent[t.id]?.length,
  );
  const threads = [...extra, ...baseThreads];
  const active = threads.find((t) => t.id === threadId) ?? baseThreads[0];
  const messages = [...active.messages, ...(sent[active.id] ?? [])];

  const open = (id: string) => {
    setReadIds((prev) => new Set(prev).add(id));
    setDraft("");
    onNavigate(id, "messages");
  };

  const send = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setSent((prev) => ({
      ...prev,
      [active.id]: [
        ...(prev[active.id] ?? []),
        { from: "me", text, time: "Just now" },
      ],
    }));
    setDraft("");
  };

  return (
    <div className="grid h-[calc(100vh-260px)] min-h-[520px] overflow-hidden rounded-2xl border border-line bg-white shadow-card md:grid-cols-[320px_1fr]">
      {/* On small screens the list and the conversation take turns. */}
      <ul
        className={`scroll-thin overflow-y-auto border-r border-line ${
          threadId ? "hidden md:block" : ""
        }`}
        aria-label="Conversations"
      >
        {threads.map((thread) => {
          const isActive = thread.id === active.id;
          const unread = isActive || readIds.has(thread.id) ? 0 : thread.unread;
          const all = [...thread.messages, ...(sent[thread.id] ?? [])];
          return (
            <li key={thread.id}>
              <button
                type="button"
                onClick={() => open(thread.id)}
                aria-current={isActive ? "true" : undefined}
                className={`flex w-full gap-3 border-b border-line px-4 py-3.5 text-left transition-colors duration-150 ${
                  isActive ? "bg-mist" : "hover:bg-mist/60"
                }`}
              >
                <Avatar avatar={thread.avatar} size="h-10 w-10" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span
                      className={`truncate text-sm ${
                        unread ? "font-black text-navy" : "font-bold text-ink"
                      }`}
                    >
                      {thread.name}
                    </span>
                    <span className="shrink-0 text-[11px] text-ink-muted">
                      {thread.listTime}
                    </span>
                  </span>
                  <span className="block truncate text-xs text-ink-muted">
                    {thread.subtitle}
                  </span>
                  <span className="mt-0.5 flex items-center gap-2">
                    <span className="block flex-1 truncate text-xs text-ink-muted">
                      {all.at(-1)?.text ?? "No messages yet"}
                    </span>
                    {unread > 0 && (
                      <span className="rounded-full bg-teal px-1.5 text-[10px] font-black text-navy">
                        {unread}
                      </span>
                    )}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <section
        className={`min-h-0 flex-col ${threadId ? "flex" : "hidden md:flex"}`}
        aria-label={`Conversation with ${active.name}`}
      >
        <header className="flex items-center gap-3 border-b border-line px-4 py-3 md:px-6">
          <button
            type="button"
            onClick={() => onNavigate(null, "messages")}
            className="rounded-lg p-1.5 text-ink-muted hover:bg-mist md:hidden"
            aria-label="Back to conversations"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <Avatar avatar={active.avatar} size="h-9 w-9" />
          <div className="min-w-0 flex-1">
            <p className="font-bold text-navy">{active.name}</p>
            <p className="truncate text-xs text-ink-muted">{active.subtitle}</p>
          </div>
          {active.consentApproved && (
            <span className="hidden items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-bold text-deepteal sm:inline-flex">
              <Lock className="h-3 w-3" /> Consent-approved match
            </span>
          )}
        </header>

        <ol className="scroll-thin flex-1 space-y-4 overflow-y-auto bg-mist/50 px-4 py-6 md:px-6">
          {messages.map((message, i) => {
            const mine = message.from === "me";
            return (
              <li
                key={i}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-2.5 ${
                    mine
                      ? "rounded-br-md bg-navy text-white"
                      : "rounded-bl-md border border-line bg-white text-ink"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`mt-1 text-[10px] ${mine ? "text-white/60" : "text-ink-muted"}`}
                  >
                    {message.time}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {active.readOnly ? (
          <p className="border-t border-line px-6 py-4 text-center text-xs text-ink-muted">
            Announcements are read-only. Message a facilitator for questions.
          </p>
        ) : (
          <form
            className="flex gap-2 border-t border-line p-3 md:p-4"
            onSubmit={send}
          >
            <label htmlFor="composer" className="sr-only">
              Write a message
            </label>
            <input
              id="composer"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Message ${active.firstName}…`}
              autoComplete="off"
              className="h-11 flex-1 rounded-lg border border-line px-3 text-sm placeholder:text-ink-muted focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="grid h-11 w-11 place-items-center rounded-lg bg-teal text-navy transition-colors duration-150 hover:bg-teal-600 disabled:opacity-50"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

function NotificationCentre() {
  const router = useRouter();
  const { unreadIds, markRead, markAllRead } = useNotifications();
  const [filter, setFilter] = useState<NotificationCategory | "All">("All");

  const unreadIn = (category: NotificationCategory | "All") =>
    appNotifications.filter(
      (n) =>
        unreadIds.has(n.id) && (category === "All" || n.category === category),
    ).length;
  const visible = appNotifications.filter(
    (n) => filter === "All" || n.category === filter,
  );

  return (
    <section
      className={`${card} overflow-hidden`}
      aria-label="Notification centre"
    >
      <div className="flex flex-col gap-3 border-b border-line p-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="scroll-thin flex gap-2 overflow-x-auto">
          {(["All", ...notificationCategories] as const).map((category) => {
            const selected = category === filter;
            const count = unreadIn(category);
            return (
              <button
                key={category}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(category)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold transition-colors duration-150 ${
                  selected
                    ? "bg-navy text-white"
                    : "bg-mist text-ink hover:bg-line"
                }`}
              >
                {category}
                {count > 0 && (
                  <span
                    className={`rounded-full px-1.5 text-[10px] font-black ${
                      selected
                        ? "bg-teal text-navy"
                        : "bg-teal-100 text-deepteal"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={markAllRead}
          disabled={unreadIds.size === 0}
          className={button("outline", "h-9 shrink-0 px-3")}
        >
          Mark all as read
        </button>
      </div>

      <ul className="divide-y divide-line">
        {visible.map((notification) => {
          const unread = unreadIds.has(notification.id);
          const Icon = categoryIcons[notification.category];
          return (
            <li key={notification.id}>
              <button
                type="button"
                onClick={() => {
                  markRead(notification.id);
                  router.push(notification.href);
                }}
                className={`flex w-full gap-4 px-4 py-4 text-left transition-colors duration-150 hover:bg-mist md:px-6 ${
                  unread ? "bg-teal-50/40" : ""
                }`}
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                    unread ? "bg-navy text-teal" : "bg-mist text-ink-muted"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-3">
                    <span
                      className={`text-[15px] ${
                        unread ? "font-black text-navy" : "font-bold text-ink"
                      }`}
                    >
                      {notification.title}
                    </span>
                    <span className="flex shrink-0 items-center gap-2 text-xs text-ink-muted">
                      {notification.time}
                      {unread && (
                        <span
                          className="h-2 w-2 rounded-full bg-teal"
                          aria-label="Unread"
                        />
                      )}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-sm text-ink-muted">
                    {notification.body}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function MessagesTabs({ threadId, tab, onNavigate }: ViewProps) {
  const { unreadIds } = useNotifications();
  const unreadMessages = baseThreads.reduce(
    (sum, thread) => sum + thread.unread,
    0,
  );

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "messages", label: "Messages", count: unreadMessages },
    { id: "notifications", label: "Notifications", count: unreadIds.size },
  ];

  return (
    <>
      <div role="tablist" className="mb-5 flex gap-1 border-b border-line">
        {tabs.map(({ id, label, count }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={id === tab}
            onClick={() => onNavigate(threadId, id)}
            className={`flex items-center gap-2 border-b-2 px-3 pb-3 text-sm font-bold transition-colors duration-150 ${
              id === tab
                ? "border-teal text-navy"
                : "border-transparent text-ink-muted hover:text-navy"
            }`}
          >
            {label}
            {count > 0 && (
              <span className="rounded-full bg-teal px-1.5 text-[11px] font-black text-navy">
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Both panels stay mounted so drafts and sent messages survive switching tabs. */}
      <div hidden={tab !== "messages"}>
        <Conversations threadId={threadId} onNavigate={onNavigate} />
      </div>
      {tab === "notifications" && <NotificationCentre />}
    </>
  );
}

/** Keeps the open thread and tab in the URL: /messages/t2, ?tab=notifications. */
function MessagesFromUrl() {
  const pathname = usePathname();
  const tab: Tab =
    useSearchParams().get("tab") === "notifications"
      ? "notifications"
      : "messages";
  const threadId = pathname.split("/")[2] ?? null;

  return (
    <MessagesTabs
      threadId={threadId}
      tab={tab}
      onNavigate={(nextThread, nextTab) =>
        window.history.pushState(
          null,
          "",
          `/messages${nextThread ? `/${nextThread}` : ""}${
            nextTab === "notifications" ? "?tab=notifications" : ""
          }`,
        )
      }
    />
  );
}

export function MessagesView({ threadId }: { threadId: string | null }) {
  return (
    <div>
      <header className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-tight text-navy md:text-[32px] md:leading-tight">
            Messages
          </h1>
          <p className="mt-1.5 max-w-2xl text-[15px] text-ink-muted">
            Conversations with facilitators and approved matches, plus every
            program update in one place.
          </p>
        </div>
      </header>

      {/* The path and ?tab= are only known at request time, so the default view is
          prerendered and the URL-aware version takes over once they are available. */}
      <Suspense
        fallback={
          <MessagesTabs
            threadId={threadId}
            tab="messages"
            onNavigate={() => {}}
          />
        }
      >
        <MessagesFromUrl />
      </Suspense>
    </div>
  );
}
