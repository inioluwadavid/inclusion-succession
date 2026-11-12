import { people, type Person } from "@/lib/data";

export type Mentor = Person & {
  id: string;
  bio: string;
  specializations: string[];
  /** Assigned to the current participant. */
  advisor: boolean;
  messageHref: string;
};

export const mentors: Mentor[] = [
  {
    ...people.bryan,
    id: "bryan",
    advisor: true,
    messageHref: "/messages/t1",
    bio: "Bryan has backed and advised more than 30 lower-middle-market acquisitions across Ontario. He helps buyers pressure-test their thesis and get investment-ready.",
    specializations: ["Deal sourcing", "Valuation", "Investor readiness"],
  },
  {
    ...people.winta,
    id: "winta",
    advisor: true,
    messageHref: "/messages/t4",
    bio: "A corporate lawyer focused on small business transactions, Winta guides participants through letters of intent, purchase agreements, and confidentiality.",
    specializations: ["Purchase agreements", "NDAs & consent", "Governance"],
  },
  {
    ...people.marvin,
    id: "marvin",
    advisor: false,
    messageHref: "/messages/new-marvin",
    bio: "Marvin built and sold two service businesses over 25 years. He coaches buyers on stepping into ownership and leading established teams.",
    specializations: ["Ownership mindset", "Operations", "Leadership"],
  },
  {
    ...people.keisha,
    id: "keisha",
    advisor: false,
    messageHref: "/messages/new-keisha",
    bio: "Keisha spent 15 years in commercial lending. She helps buyers structure financing, from bank debt and BDC programs to vendor take-back notes.",
    specializations: [
      "Seller financing",
      "Bank & BDC lending",
      "Deal structure",
    ],
  },
  {
    ...people.andre,
    id: "andre",
    advisor: false,
    messageHref: "/messages/new-andre",
    bio: "Andre leads the Shadow the Seller month, helping buyers and owners plan a handover that protects customers, staff, and culture.",
    specializations: ["Transition planning", "Team retention", "100-day plans"],
  },
];

export const assignedAdvisors = mentors.filter((mentor) => mentor.advisor);

export const bookingSlots = [
  "Tue, Feb 23 · 10:00 AM",
  "Tue, Feb 23 · 2:30 PM",
  "Thu, Feb 25 · 11:00 AM",
  "Fri, Feb 26 · 1:00 PM",
];

export const upcomingSessions = [
  {
    month: "Feb",
    day: "18",
    title: "Thesis review: target scoring",
    format: "Video call",
    group: false,
    time: "2:00 – 2:45 PM ET",
    host: "Bryan Duarte",
    note: "Bring your shortlist of 11 targets and scoring rubric.",
  },
  {
    month: "Feb",
    day: "22",
    title: "Live cohort session: Inside the Deal Room",
    format: "Group session",
    group: true,
    time: "6:30 – 8:00 PM ET",
    host: "Marvin Coleby",
    note: "Week 7 kickoff with all 25 participants.",
  },
  {
    month: "Feb",
    day: "24",
    title: "NDA & introduction etiquette",
    format: "Video call",
    group: false,
    time: "12:00 – 12:30 PM ET",
    host: "Winta Asefaw",
    note: "Prep before your first seller conversation.",
  },
];

export const pastSessions = [
  {
    title: "Readiness assessment debrief",
    meta: "Fri, Feb 5 · Bryan Duarte",
    avatar: people.bryan.avatar,
    note: "Readiness score 78/100. Focus on financing plan.",
  },
  {
    title: "Ownership mindset 1:1",
    meta: "Tue, Jan 26 · Marvin Coleby",
    avatar: people.marvin.avatar,
    note: "Discussed managing long-tenured staff.",
  },
];
