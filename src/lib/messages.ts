import { people } from "@/lib/data";
import { openDealRoom } from "@/lib/deal-rooms";
import { mentors } from "@/lib/mentors";

export type ChatMessage = { from: "me" | "them"; text: string; time: string };

export type Thread = {
  id: string;
  name: string;
  /** First name used in the composer placeholder. */
  firstName: string;
  subtitle: string;
  /** Photo URL, or initials for a team account. */
  avatar: string | { initials: string };
  listTime: string;
  unread: number;
  messages: ChatMessage[];
  /** Shown as a badge in the conversation header. */
  consentApproved?: boolean;
  /** Announcement threads cannot be replied to. */
  readOnly?: boolean;
};

const gail = openDealRoom.members.find((member) => member.role === "Seller")!;

export const threads: Thread[] = [
  {
    id: "t1",
    name: people.bryan.name,
    firstName: "Bryan",
    subtitle: people.bryan.specialty,
    avatar: people.bryan.avatar,
    listTime: "9:42 AM",
    unread: 2,
    messages: [
      {
        from: "me",
        text: "Hi Bryan — I have 11 targets scored so far. Is it worth including two that are slightly outside my revenue range?",
        time: "Yesterday, 4:10 PM",
      },
      {
        from: "them",
        text: "Good question. Keep them, but flag them separately. Sellers often under-report revenue in early conversations.",
        time: "9:40 AM",
      },
      {
        from: "them",
        text: "Bring the full list Thursday and we will narrow to your top five together.",
        time: "9:42 AM",
      },
    ],
  },
  {
    id: "t2",
    name: gail.name,
    firstName: "Gail",
    subtitle: "Opportunity 01 · Approved match",
    avatar: gail.avatar,
    listTime: "Yesterday",
    unread: 1,
    consentApproved: true,
    messages: [
      {
        from: "them",
        text: "Amoye, thank you for the thoughtful note. I have shared our client overview in the deal room.",
        time: "Feb 15, 11:02 AM",
      },
      {
        from: "me",
        text: "Thank you, Gail. I read it last night — the retention numbers are impressive. Could we meet the week of March 1?",
        time: "Feb 15, 8:30 PM",
      },
      {
        from: "them",
        text: "March 3 works. I will ask Denise, our operations lead, to join for the second half.",
        time: "Yesterday, 3:15 PM",
      },
    ],
  },
  {
    id: "t3",
    name: "Inclusive Succession Team",
    firstName: "the team",
    subtitle: "Program announcements",
    avatar: { initials: "IS" },
    listTime: "Mon",
    unread: 0,
    readOnly: true,
    messages: [
      {
        from: "them",
        text: "Welcome to Week 6! This week focuses on building and scoring your target list. Live session recordings are now in the Learning Centre.",
        time: "Mon, 8:00 AM",
      },
    ],
  },
  {
    id: "t4",
    name: people.winta.name,
    firstName: "Winta",
    subtitle: people.winta.specialty,
    avatar: people.winta.avatar,
    listTime: "Feb 12",
    unread: 0,
    messages: [
      {
        from: "them",
        text: "The mutual NDA for Opportunity 01 is countersigned. You now have access to the deal room.",
        time: "Feb 12, 10:20 AM",
      },
      {
        from: "me",
        text: "Wonderful, thank you Winta!",
        time: "Feb 12, 10:31 AM",
      },
    ],
  },
];

/** Mentors without an existing conversation get an empty one at /messages/new-<id>. */
export const newThreads: Thread[] = mentors
  .filter((mentor) => mentor.messageHref.startsWith("/messages/new-"))
  .map((mentor) => ({
    id: mentor.messageHref.split("/").pop()!,
    name: mentor.name,
    firstName: mentor.name.split(" ")[0],
    subtitle: mentor.specialty,
    avatar: mentor.avatar,
    listTime: "",
    unread: 0,
    messages: [],
  }));

export type NotificationCategory =
  "Introductions" | "Mentorship" | "Learning" | "Announcements";

export type AppNotification = {
  id: string;
  category: NotificationCategory;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  href: string;
};

export const notificationCategories: NotificationCategory[] = [
  "Introductions",
  "Mentorship",
  "Learning",
  "Announcements",
];

export const appNotifications: AppNotification[] = [
  {
    id: "n1",
    category: "Introductions",
    title: "Introduction request under review",
    body: "The owner of Opportunity 04 is reviewing your request. Most owners respond within 5 business days.",
    time: "2h ago",
    unread: true,
    href: "/marketplace/requests",
  },
  {
    id: "n2",
    category: "Mentorship",
    title: "Reminder: Thesis review with Bryan Duarte",
    body: "Tomorrow at 2:00 PM ET. Bring your scored target list.",
    time: "5h ago",
    unread: true,
    href: "/mentorship/sessions",
  },
  {
    id: "n3",
    category: "Learning",
    title: "Assignment due in 9 days",
    body: "Shortlist 10–15 target businesses — due Feb 26.",
    time: "Yesterday",
    unread: true,
    href: "/learning",
  },
  {
    id: "n4",
    category: "Announcements",
    title: "Week 7 live session moved to 6:30 PM",
    body: "Inside the Deal Room now starts 30 minutes later on Monday, Feb 22.",
    time: "Mon",
    unread: false,
    href: "/mentorship/sessions",
  },
  {
    id: "n5",
    category: "Introductions",
    title: "Introduction approved — Opportunity 01",
    body: "The owner approved your request. Your private deal room is now open.",
    time: "Feb 9",
    unread: false,
    href: "/deal-rooms/dr-01",
  },
  {
    id: "n6",
    category: "Learning",
    title: "Module 1 complete",
    body: "You finished Acquisition Readiness. Your certificate is in your profile.",
    time: "Feb 5",
    unread: false,
    href: "/profile",
  },
];
