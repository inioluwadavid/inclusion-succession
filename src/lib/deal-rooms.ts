import { images } from "@/lib/data";

const IMG = "https://cdn.magicpatterns.com/patterns/generated-images";

export type DealRoomDocument = {
  title: string;
  meta: string;
  icon: "text" | "spreadsheet" | "file";
  /** Who can see the file. */
  access: "Both parties" | "Buyer + facilitator";
};

export type DiligenceItem = {
  label: string;
  category: string;
  owner: string;
  done: boolean;
};

export type DealRoomQuestion = {
  question: string;
  meta: string;
  answer?: { by: string; text: string };
};

export type DealRoomSummary = {
  id: string;
  code: string;
  name: string;
  status: string;
  /** Locked rooms are waiting on the owner's consent and show no content. */
  locked: boolean;
};

export const dealRooms: DealRoomSummary[] = [
  {
    id: "dr-01",
    code: "Opportunity 01",
    name: "Morrison Advisory Group",
    status: "Updated yesterday",
    locked: false,
  },
  {
    id: "dr-04",
    code: "Opportunity 04",
    name: "Food Distribution Business",
    status: "Awaiting owner consent",
    locked: true,
  },
];

export const defaultDealRoomId = dealRooms[0].id;

/** Full content for the one open deal room. */
export const openDealRoom = {
  id: "dr-01",
  code: "Opportunity 01",
  name: "Morrison Advisory Group",
  subtitle: "Professional Services · Hamilton, ON · Opened Feb 9, 2027",
  nda: "Mutual NDA signed Feb 12, 2027",
  stats: [
    { label: "Stage", value: "Discovery & early diligence" },
    { label: "Revenue", value: "$840K (FY2025)" },
    { label: "SDE", value: "$265K" },
    { label: "Asking range", value: "$750K – $900K" },
  ],
  members: [
    { name: "Amoye Henry", role: "Buyer", avatar: images.amoye },
    {
      name: "Gail Morrison",
      role: "Seller",
      avatar: `${IMG}/508c5110-3f78-4da1-85cd-cd7567ce1994.jpg`,
    },
    { name: "Bryan Duarte", role: "Facilitator", avatar: images.bryan },
    { name: "Winta Asefaw", role: "Legal advisor", avatar: images.winta },
  ],
  note: "Considering 20% seller financing",
  documents: [
    {
      title: "Mutual NDA — countersigned",
      meta: "Winta Asefaw · Feb 12 · 184 KB",
      icon: "text",
      access: "Both parties",
    },
    {
      title: "Business overview & client mix",
      meta: "Gail Morrison · Feb 15 · 1.1 MB",
      icon: "text",
      access: "Both parties",
    },
    {
      title: "Financial summary FY2023–2025",
      meta: "Gail Morrison · Feb 16 · 640 KB",
      icon: "spreadsheet",
      access: "Both parties",
    },
    {
      title: "Org chart & key roles",
      meta: "Gail Morrison · Feb 16 · 320 KB",
      icon: "text",
      access: "Both parties",
    },
    {
      title: "Buyer acquisition thesis",
      meta: "Amoye Henry · Feb 10 · 96 KB",
      icon: "file",
      access: "Both parties",
    },
    {
      title: "Financing pre-qualification letter",
      meta: "Amoye Henry · Feb 14 · 140 KB",
      icon: "text",
      access: "Buyer + facilitator",
    },
  ] satisfies DealRoomDocument[] as DealRoomDocument[],
  diligence: [
    {
      label: "Three years of financial statements",
      category: "Financial",
      owner: "Gail",
      done: true,
    },
    {
      label: "Revenue by client (top 20)",
      category: "Financial",
      owner: "Gail",
      done: true,
    },
    {
      label: "Accounts receivable aging",
      category: "Financial",
      owner: "Gail",
      done: false,
    },
    {
      label: "Client engagement agreements",
      category: "Legal",
      owner: "Gail",
      done: false,
    },
    {
      label: "Office lease and assignment terms",
      category: "Legal",
      owner: "Winta",
      done: false,
    },
    {
      label: "Process documentation review",
      category: "Operations",
      owner: "Amoye",
      done: true,
    },
    {
      label: "Software and systems inventory",
      category: "Operations",
      owner: "Gail",
      done: false,
    },
    {
      label: "Employee tenure and compensation",
      category: "People",
      owner: "Gail",
      done: false,
    },
  ] as DiligenceItem[],
  questions: [
    {
      question: "How many clients account for more than 10% of revenue?",
      meta: "Amoye Henry · Feb 15",
      answer: {
        by: "Gail Morrison",
        text: "Two clients, at 14% and 11%. Both have been with us for over eight years.",
      },
    },
    {
      question:
        "Would Denise (operations lead) be open to a retention agreement?",
      meta: "Amoye Henry · Feb 16",
      answer: {
        by: "Gail Morrison",
        text: "I believe so. I would like to discuss this in person before raising it with her.",
      },
    },
    {
      question:
        "Are any client relationships held personally by you rather than the firm?",
      meta: "Bryan Duarte · Feb 17",
    },
  ] as DealRoomQuestion[],
  meetings: [
    {
      title: "Introductory call",
      date: "Feb 11, 2027",
      attendees: "Amoye, Gail, Bryan",
      summary:
        "Gail shared the history of the firm and her goals for transition: protect the team and keep client service consistent. Amoye presented her thesis and background.",
      actions: [
        "Gail to share business overview",
        "Winta to circulate mutual NDA",
        "Schedule in-person meeting in March",
      ],
    },
  ],
  milestones: [
    { label: "Introduction approved", date: "Feb 9", done: true },
    { label: "NDA signed", date: "Feb 12", done: true },
    { label: "First meeting", date: "Feb 11", done: true },
    { label: "Financials reviewed", date: "Feb 26", done: false },
    { label: "On-site visit", date: "Mar 3", done: false },
    { label: "Match confirmed", date: "Mar 29", done: false },
  ],
};
