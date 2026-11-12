"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import {
  Check,
  Download,
  File,
  FileSpreadsheet,
  FileText,
  FolderLock,
  Lock,
  ShieldCheck,
  Upload,
  Users,
} from "lucide-react";
import {
  dealRooms,
  openDealRoom as room,
  type DealRoomQuestion,
  type DealRoomSummary,
  type DiligenceItem,
} from "@/lib/deal-rooms";
import { button, card, eyebrow } from "@/components/ui";

const tabIds = ["documents", "diligence", "qa", "notes", "milestones"] as const;
type TabId = (typeof tabIds)[number];

const documentIcons = {
  text: FileText,
  spreadsheet: FileSpreadsheet,
  file: File,
};

function RoomNav({ activeId }: { activeId: string }) {
  return (
    <nav aria-label="Your deal rooms" className="lg:col-span-3">
      <ul className="flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
        {dealRooms.map((r) => {
          const active = r.id === activeId;
          const Icon = r.locked ? Lock : FolderLock;
          return (
            <li key={r.id} className="min-w-[240px] lg:min-w-0">
              <Link
                href={`/deal-rooms/${r.id}`}
                aria-current={active ? "true" : undefined}
                className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors duration-150 ${
                  active
                    ? "border-teal bg-white shadow-card"
                    : "border-line bg-white/60 hover:bg-white"
                }`}
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                    r.locked ? "bg-mist text-ink-muted" : "bg-navy text-teal"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted">
                    {r.code}
                  </span>
                  <span className="block truncate font-bold text-navy">
                    {r.name}
                  </span>
                  <span className="block text-xs text-ink-muted">
                    {r.status}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function LockedRoom({ room: locked }: { room: DealRoomSummary }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-ink/15 bg-white px-6 py-20 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-navy text-teal">
        <Lock className="h-6 w-6" />
      </span>
      <p className="mt-4 text-xl font-black text-navy">
        This deal room is locked
      </p>
      <p className="mt-2 max-w-md text-sm text-ink-muted">
        The owner of {locked.code} is reviewing your introduction request. If
        they approve, this room opens automatically and you&apos;ll be notified.
      </p>
      <Link
        href="/marketplace/requests"
        className={`${button("outline", "h-10 px-4")} mt-6`}
      >
        View request status
      </Link>
    </div>
  );
}

function RoomHeader() {
  // On two-column (mobile) layouts only the right-hand cells get a divider.
  const statBorders = [
    "",
    "border-l border-white/10",
    "md:border-l md:border-white/10",
    "border-l border-white/10",
  ];

  return (
    <section className="overflow-hidden rounded-2xl bg-navy text-white shadow-card">
      <div className="flex flex-col gap-5 p-6 md:flex-row md:items-start md:justify-between md:p-8">
        <div>
          <p className={`${eyebrow} text-teal`}>
            {room.code} · Private deal room
          </p>
          <h2 className="mt-2 text-2xl font-black md:text-3xl">{room.name}</h2>
          <p className="mt-1 text-sm text-white/70">{room.subtitle}</p>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal px-3 py-1 text-xs font-black text-navy">
            <Lock className="h-3.5 w-3.5" />
            Confidential
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-white/70">
            <ShieldCheck className="h-3.5 w-3.5 text-teal" />
            {room.nda}
          </span>
        </div>
      </div>

      <dl className="grid grid-cols-2 border-t border-white/10 md:grid-cols-4">
        {room.stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col-reverse px-6 py-4 md:px-8 ${statBorders[i]}`}
          >
            <dt className="text-xs text-white/60">{stat.label}</dt>
            <dd className="text-sm font-black md:text-base">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-3 border-t border-white/10 bg-navy-900/40 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {room.members.map((member) => (
              <img
                key={member.name}
                src={member.avatar}
                alt={`${member.name}, ${member.role}`}
                title={`${member.name} · ${member.role}`}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-navy"
              />
            ))}
          </div>
          <p className="text-xs text-white/70">
            <span className="font-bold text-white">
              {room.members.length} authorized members.
            </span>{" "}
            No one else can view this room.
          </p>
        </div>
        <p className="text-xs text-white/60">{room.note}</p>
      </div>
    </section>
  );
}

function DocumentsPanel() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">
          Every file is watermarked with the viewer&apos;s name.
        </p>
        <button type="button" className={button("dark", "h-9 px-3")}>
          <Upload className="h-4 w-4" /> Upload
        </button>
      </div>
      <ul className="divide-y divide-line rounded-xl border border-line">
        {room.documents.map((doc) => {
          const Icon = documentIcons[doc.icon];
          return (
            <li key={doc.title} className="flex items-center gap-3 px-4 py-3">
              <Icon className="h-5 w-5 shrink-0 text-deepteal" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-navy">
                  {doc.title}
                </p>
                <p className="text-xs text-ink-muted">{doc.meta}</p>
              </div>
              <span
                className={`hidden whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-bold sm:inline ${
                  doc.access === "Both parties"
                    ? "bg-teal-50 text-deepteal"
                    : "bg-signal-soft text-signal-ink"
                }`}
              >
                {doc.access}
              </span>
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-lg text-ink-muted hover:bg-mist hover:text-navy"
                aria-label={`Download ${doc.title}`}
              >
                <Download className="h-4 w-4" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DiligencePanel({
  items,
  onToggle,
}: {
  items: DiligenceItem[];
  onToggle: (index: number) => void;
}) {
  const done = items.filter((item) => item.done).length;

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-mist">
          <div
            className="h-full rounded-full bg-teal transition-[width] duration-300"
            style={{ width: `${(done / items.length) * 100}%` }}
          />
        </div>
        <p className="text-sm font-bold text-navy">
          {done} of {items.length} complete
        </p>
      </div>
      <ul className="divide-y divide-line rounded-xl border border-line">
        {items.map((item, i) => (
          <li key={item.label}>
            <label className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-mist/60">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={item.done}
                onChange={() => onToggle(i)}
              />
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-teal ${
                  item.done ? "border-teal bg-teal text-navy" : "border-ink/20"
                }`}
                aria-hidden="true"
              >
                {item.done && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </span>
              <span
                className={`flex-1 text-sm ${
                  item.done
                    ? "text-ink-muted line-through"
                    : "font-bold text-navy"
                }`}
              >
                {item.label}
              </span>
              <span className="hidden rounded-full bg-mist px-2 py-0.5 text-[11px] font-bold text-ink-muted sm:inline">
                {item.category}
              </span>
              <span className="w-14 text-right text-xs text-ink-muted">
                {item.owner}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuestionsPanel({
  questions,
  onAsk,
}: {
  questions: DealRoomQuestion[];
  onAsk: (question: string) => void;
}) {
  const [draft, setDraft] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    onAsk(draft.trim());
    setDraft("");
  };

  return (
    <div className="space-y-4">
      <form className="flex gap-2" onSubmit={submit}>
        <label htmlFor="new-question" className="sr-only">
          Ask a question
        </label>
        <input
          id="new-question"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask the other party a question…"
          className="h-10 flex-1 rounded-lg border border-line px-3 text-sm placeholder:text-ink-muted focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          className={button("primary", "h-10 px-4")}
        >
          Ask
        </button>
      </form>
      <ul className="space-y-3">
        {questions.map((q) => (
          <li key={q.question} className="rounded-xl border border-line p-4">
            <p className="font-bold text-navy">{q.question}</p>
            <p className="mt-0.5 text-xs text-ink-muted">{q.meta}</p>
            {q.answer ? (
              <p className="mt-3 rounded-lg bg-mist p-3 text-sm text-ink">
                <span className="font-bold text-deepteal">{q.answer.by}: </span>
                {q.answer.text}
              </p>
            ) : (
              <p className="mt-3 inline-flex rounded-full bg-signal-soft px-2.5 py-1 text-xs font-bold text-signal-ink">
                Awaiting response
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function NotesPanel() {
  return (
    <ul className="space-y-4">
      {room.meetings.map((meeting) => (
        <li key={meeting.title} className="rounded-xl border border-line p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-lg font-black text-navy">{meeting.title}</p>
            <p className="text-xs font-bold text-ink-muted">{meeting.date}</p>
          </div>
          <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-ink-muted">
            <Users className="h-3.5 w-3.5" /> {meeting.attendees}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink">
            {meeting.summary}
          </p>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-ink-muted">
            Action items
          </p>
          <ul className="mt-2 space-y-1.5">
            {meeting.actions.map((action) => (
              <li key={action} className="flex gap-2 text-sm text-ink">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                  aria-hidden="true"
                />
                {action}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

function MilestonesPanel() {
  return (
    <ol className="space-y-0">
      {room.milestones.map((milestone, i) => (
        <li
          key={milestone.label}
          className="relative flex gap-4 pb-6 last:pb-0"
        >
          {i < room.milestones.length - 1 && (
            <span
              className={`absolute left-[11px] top-6 h-[calc(100%-24px)] w-0.5 ${
                milestone.done ? "bg-teal" : "bg-line"
              }`}
              aria-hidden="true"
            />
          )}
          {milestone.done ? (
            <span className="relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal text-navy">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
          ) : (
            <span className="relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-line bg-white" />
          )}
          <div className="-mt-0.5 flex flex-1 items-baseline justify-between gap-4">
            <p
              className={`text-sm font-bold ${milestone.done ? "text-navy" : "text-ink-muted"}`}
            >
              {milestone.label}
            </p>
            <p className="text-xs text-ink-muted">{milestone.date}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function RoomWorkspace({
  tab,
  onTabChange,
}: {
  tab: TabId;
  onTabChange: (tab: TabId) => void;
}) {
  const [diligence, setDiligence] = useState(room.diligence);
  const [questions, setQuestions] = useState(room.questions);

  const tabs: { id: TabId; label: string; count?: string }[] = [
    {
      id: "documents",
      label: "Shared documents",
      count: String(room.documents.length),
    },
    {
      id: "diligence",
      label: "Due diligence",
      count: `${diligence.filter((item) => item.done).length}/${diligence.length}`,
    },
    { id: "qa", label: "Questions", count: String(questions.length) },
    { id: "notes", label: "Meeting notes" },
    { id: "milestones", label: "Milestones" },
  ];

  return (
    <section className={`${card} overflow-hidden`}>
      <div
        role="tablist"
        aria-label="Deal room sections"
        className="scroll-thin flex gap-1 overflow-x-auto border-b border-line px-4 md:px-6"
      >
        {tabs.map(({ id, label, count }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={id === tab}
            onClick={() => onTabChange(id)}
            className={`flex shrink-0 items-center gap-2 border-b-2 px-2 py-4 text-sm font-bold transition-colors duration-150 ${
              id === tab
                ? "border-teal text-navy"
                : "border-transparent text-ink-muted hover:text-navy"
            }`}
          >
            {label}
            {count && (
              <span className="rounded-full bg-mist px-1.5 text-xs text-ink-muted">
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="p-4 md:p-6" role="tabpanel">
        {tab === "documents" && <DocumentsPanel />}
        {tab === "diligence" && (
          <DiligencePanel
            items={diligence}
            onToggle={(index) =>
              setDiligence((prev) =>
                prev.map((item, i) =>
                  i === index ? { ...item, done: !item.done } : item,
                ),
              )
            }
          />
        )}
        {tab === "qa" && (
          <QuestionsPanel
            questions={questions}
            onAsk={(question) =>
              setQuestions((prev) => [
                { question, meta: "Amoye Henry · Just now" },
                ...prev,
              ])
            }
          />
        )}
        {tab === "notes" && <NotesPanel />}
        {tab === "milestones" && <MilestonesPanel />}
      </div>
    </section>
  );
}

/** Reads and writes the open section as `?tab=…`, so a section can be linked to. */
function RoomWorkspaceFromUrl() {
  const pathname = usePathname();
  const param = useSearchParams().get("tab");
  const tab = tabIds.find((id) => id === param) ?? "documents";

  return (
    <RoomWorkspace
      tab={tab}
      onTabChange={(next) =>
        window.history.replaceState(
          null,
          "",
          next === "documents" ? pathname : `${pathname}?tab=${next}`,
        )
      }
    />
  );
}

export function DealRoomsView({ roomId }: { roomId: string }) {
  const active = dealRooms.find((r) => r.id === roomId) ?? dealRooms[0];

  return (
    <div>
      <header className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-tight text-navy md:text-[32px] md:leading-tight">
            Deal Rooms
          </h1>
          <p className="mt-1.5 max-w-2xl text-[15px] text-ink-muted">
            Private workspaces that open only after an owner approves an
            introduction. Access is limited to the matched buyer, seller, and
            program advisors.
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-12">
        <RoomNav activeId={active.id} />
        <div className="space-y-6 lg:col-span-9">
          {active.locked ? (
            <LockedRoom room={active} />
          ) : (
            <>
              <RoomHeader />
              {/* The ?tab= query is only known at request time, so the documents view is
                  prerendered and the URL-aware version takes over once it is available. */}
              <Suspense
                fallback={
                  <RoomWorkspace tab="documents" onTabChange={() => {}} />
                }
              >
                <RoomWorkspaceFromUrl />
              </Suspense>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
