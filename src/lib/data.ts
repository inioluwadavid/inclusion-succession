const IMG = "https://cdn.magicpatterns.com/patterns/generated-images";

export const images = {
  amoye: `${IMG}/10f33d76-a841-490f-b851-904588f5a3d8.jpg`,
  marvin: `${IMG}/e5465d39-c99b-4934-850a-15f3de554fca.jpg`,
  bryan: `${IMG}/f0b45766-d3a0-48c8-ae38-c910b6f57c2a.jpg`,
  keisha: `${IMG}/f73d6aab-1ad6-45b5-99ce-7d44b1e42669.jpg`,
  winta: `${IMG}/7ccebcd4-9caa-42b7-8138-01b2f8e2cf0c.jpg`,
  andre: `${IMG}/3e5d352a-f347-46cc-899f-f5452fcf1c32.jpg`,
  opp01: `${IMG}/f06ad21a-c7f5-4d20-a148-b211ea07bc67.jpg`,
  opp02: `${IMG}/9bb90e7a-4e6a-43fa-ae97-f7310b9a83d1.jpg`,
  opp03: `${IMG}/c9e87b9f-000b-4705-a7d5-d32e03cd8d2c.jpg`,
  opp04: `${IMG}/518cec99-1187-4e1e-9d83-ab8ba547b10b.jpg`,
  opp05: `${IMG}/96332412-9274-4616-9d4d-51c83da558f6.jpg`,
  opp06: `${IMG}/0ff54c21-ebe5-4e47-b4c0-73199d56c238.jpg`,
};

export const user = {
  name: "Amoye Henry",
  firstName: "Amoye",
  role: "Buyer",
  cohort: "Cohort 1",
  location: "Toronto, ON",
  avatar: images.amoye,
  email: "amoye.henry@email.com",
  profileCompletion: 85,
  criteria: [
    { label: "Target industry", value: "B2B professional services" },
    { label: "Target revenue", value: "$500K – $2M" },
    { label: "Geography", value: "Southern Ontario" },
    { label: "Capital available", value: "$150K equity" },
    { label: "Financing", value: "Pre-qualified up to $750K" },
    { label: "Timeline", value: "Close by Q4 2027" },
  ],
  thesisFile: "Henry_Acquisition_Thesis_v3.pdf",
  thesisUpdated: "Feb 12, 2027",
  completionSteps: [
    { label: "Contact details", done: true },
    { label: "Acquisition criteria", done: true },
    { label: "Thesis uploaded", done: true },
    { label: "Readiness assessment", done: true },
    { label: "LinkedIn & short bio", done: false },
  ],
};

export type Person = { name: string; specialty: string; avatar: string };

export const people = {
  marvin: {
    name: "Marvin Coleby",
    specialty: "Business & Entrepreneurship",
    avatar: images.marvin,
  },
  bryan: {
    name: "Bryan Duarte",
    specialty: "Investor in Residence",
    avatar: images.bryan,
  },
  keisha: {
    name: "Keisha Grant",
    specialty: "Acquisition Finance",
    avatar: images.keisha,
  },
  winta: {
    name: "Winta Asefaw",
    specialty: "Legal & Business Advisory",
    avatar: images.winta,
  },
  andre: {
    name: "Andre Thompson",
    specialty: "Operations & Transition",
    avatar: images.andre,
  },
} satisfies Record<string, Person>;

export const continueLessonHref = "/learning/thesis-and-targets/lesson/l6-3";

export const journey = {
  stage: 3,
  totalStages: 8,
  title: "Target Businesses Identified",
  status: "Ready to engage sellers",
  facts: [
    { label: "Capital available", value: "$150K equity" },
    { label: "Financing", value: "Pre-qualified up to $750K" },
    { label: "Target timeline", value: "Close by Q4 2027" },
  ],
};

export type ModuleStatus = "completed" | "in-progress" | "not-started";

export type Week = {
  number: number;
  title: string;
  date: string;
  lessonsDone: number;
  lessonsTotal: number;
  status: ModuleStatus;
};

const week = (
  number: number,
  title: string,
  date: string,
  lessonsDone: number,
  status: ModuleStatus,
): Week => ({ number, title, date, lessonsDone, lessonsTotal: 3, status });

export type Module = {
  number: number;
  weeks: string;
  title: string;
  slug: string;
  delivery: string;
  mode: string;
  summary: string;
  status: ModuleStatus;
  lessonsDone: number;
  lessonsTotal: number;
  facilitators: Person[];
  covers: string[];
  schedule: Week[];
};

export const modules: Module[] = [
  {
    number: 1,
    weeks: "Weeks 1–4",
    title: "Acquisition Readiness",
    slug: "acquisition-readiness",
    mode: "Online",
    summary:
      "Assess where you stand and learn how entrepreneurship through acquisition works.",
    delivery: "Online · January 11 onwards",
    status: "completed",
    lessonsDone: 12,
    lessonsTotal: 12,
    facilitators: [people.marvin, people.bryan],
    covers: [
      "Onboarding and readiness assessment",
      "Foundations of entrepreneurship through acquisition",
      "Business valuation essentials",
    ],
    schedule: [
      week(1, "Welcome and onboarding", "Jan 11", 3, "completed"),
      week(2, "Entrepreneurship Through Acquisition", "Jan 18", 3, "completed"),
      week(3, "Understanding Business Valuation", "Jan 25", 3, "completed"),
      week(4, "Your Acquisition Readiness Assessment", "Feb 1", 3, "completed"),
    ],
  },
  {
    number: 2,
    weeks: "Weeks 5–8",
    title: "Thesis and Targets",
    slug: "thesis-and-targets",
    mode: "Online",
    summary:
      "Write your acquisition thesis and build a focused list of target businesses.",
    delivery: "Online · February 8 onwards",
    status: "in-progress",
    lessonsDone: 5,
    lessonsTotal: 12,
    facilitators: [people.bryan, people.marvin, people.keisha],
    covers: [
      "Developing a written acquisition thesis",
      "Identifying 10–15 target businesses",
      "Introduction to deal rooms",
      "Buyer and seller matching",
    ],
    schedule: [
      week(5, "Writing Your Acquisition Thesis", "Feb 8", 3, "completed"),
      week(6, "Building Your Target List", "Feb 15", 2, "in-progress"),
      week(7, "Inside the Deal Room", "Feb 22", 0, "not-started"),
      week(8, "Buyer and Seller Matching", "Mar 1", 0, "not-started"),
    ],
  },
  {
    number: 3,
    weeks: "Weeks 9–12",
    title: "Deal Mechanics",
    slug: "deal-mechanics",
    mode: "Online",
    summary:
      "Diligence, financing, and governance — and confirming your seller match.",
    delivery: "Online · March 8 onwards",
    status: "not-started",
    lessonsDone: 0,
    lessonsTotal: 12,
    facilitators: [people.winta, people.keisha, people.bryan],
    covers: [
      "Due diligence",
      "Acquisition financing and seller financing",
      "Governance and post-acquisition operations",
      "Confirming a seller match",
    ],
    schedule: [
      week(9, "Due Diligence Fundamentals", "Mar 8", 0, "not-started"),
      week(10, "Acquisition & Seller Financing", "Mar 15", 0, "not-started"),
      week(
        11,
        "Governance & Post-Acquisition Operations",
        "Mar 22",
        0,
        "not-started",
      ),
      week(12, "Confirming Your Seller Match", "Mar 29", 0, "not-started"),
    ],
  },
  {
    number: 4,
    weeks: "Weeks 13–16",
    title: "Shadow the Seller",
    slug: "shadow-the-seller",
    mode: "Alongside a seller",
    summary: "A full month working closely with a matched business owner.",
    delivery: "Alongside a seller · April 5 onwards",
    status: "not-started",
    lessonsDone: 0,
    lessonsTotal: 12,
    facilitators: [people.andre, people.marvin],
    covers: [
      "Observing day-to-day business operations",
      "Meeting the management team",
      "Testing buyer-seller fit",
      "Developing a transition plan",
      "Final presentation",
    ],
    schedule: [
      week(13, "Observing Day-to-Day Operations", "Apr 5", 0, "not-started"),
      week(14, "Meeting the Management Team", "Apr 12", 0, "not-started"),
      week(15, "Testing Buyer–Seller Fit", "Apr 19", 0, "not-started"),
      week(
        16,
        "Transition Plan & Final Presentation",
        "Apr 26",
        0,
        "not-started",
      ),
    ],
  },
];

export const marketplaceStats = [
  { label: "Curated opportunities", value: 6, href: "/marketplace" },
  { label: "Saved", value: 3, href: "/marketplace?tab=saved" },
  { label: "Awaiting owner", value: 1, href: "/marketplace/requests" },
  { label: "Introductions", value: 1, href: "/marketplace/requests" },
];

export type Opportunity = {
  id: string;
  number: number;
  code: string;
  image: string;
  ready: boolean;
  readiness: string;
  /** Thesis match score out of 5. */
  match: number;
  title: string;
  region: string;
  industry: string;
  revenue: string;
  established: string;
  employees: string;
  transition: string;
  summary: string;
  saved: boolean;
  /** Set once an introduction has been approved. */
  dealRoomHref?: string;
  /** An introduction request is with the owner. */
  ownerReviewing?: boolean;
};

const opportunity = (
  number: number,
  image: string,
  ready: boolean,
  match: number,
  title: string,
  region: string,
  industry: string,
  [revenue, established, employees, transition]: [
    string,
    string,
    string,
    string,
  ],
  summary: string,
  extra: Partial<Opportunity> = {},
): Opportunity => {
  const nn = String(number).padStart(2, "0");
  return {
    id: `opp-${nn}`,
    number,
    code: `Opportunity ${nn}`,
    image,
    ready,
    readiness: ready ? "Ready for introductions" : "Preparing to transition",
    match,
    title,
    region,
    industry,
    revenue,
    established,
    employees,
    transition,
    summary,
    saved: false,
    ...extra,
  };
};

export const opportunities: Opportunity[] = [
  opportunity(
    1,
    images.opp01,
    true,
    5,
    "Professional Services Business",
    "Southern Ontario",
    "Professional Services",
    ["$500K–$1M", "15+ years", "5–10", "1–3 years"],
    "A well-regarded advisory practice serving small and mid-sized businesses, with long-standing client relationships and a stable, experienced team.",
    { saved: true, dealRoomHref: "/deal-rooms/dr-01" },
  ),
  opportunity(
    2,
    images.opp02,
    false,
    4,
    "Manufacturing Business",
    "Ontario",
    "Manufacturing",
    ["$1M–$5M", "20+ years", "10–25", "1–5 years"],
    "A precision components manufacturer supplying regional industrial customers, with modern equipment and a skilled, long-tenured shop floor.",
    { saved: true },
  ),
  opportunity(
    3,
    images.opp03,
    true,
    3,
    "Business Services Company",
    "Southern Ontario",
    "Business Services",
    ["$200K–$500K", "10+ years", "3–5", "1–3 years"],
    "A lean back-office services firm handling bookkeeping and administration for local businesses, with documented processes and low overhead.",
    { saved: true },
  ),
  opportunity(
    4,
    images.opp04,
    true,
    4,
    "Food Distribution Business",
    "Greater Toronto Area",
    "Distribution & Logistics",
    ["$1M–$5M", "12+ years", "10–25", "1–3 years"],
    "A specialty food distributor serving independent grocers and restaurants, with an owned warehouse lease and established delivery routes.",
    { ownerReviewing: true },
  ),
  opportunity(
    5,
    images.opp05,
    false,
    3,
    "Property Maintenance Company",
    "Eastern Ontario",
    "Home & Property Services",
    ["$500K–$1M", "15+ years", "10–25", "1–5 years"],
    "A commercial landscaping and snow-removal company with multi-year contracts across office parks and condominium properties.",
  ),
  opportunity(
    6,
    images.opp06,
    true,
    1,
    "Health & Wellness Clinic",
    "Ottawa Region",
    "Healthcare",
    ["$200K–$500K", "10+ years", "3–5", "1–3 years"],
    "A community physiotherapy and wellness clinic with a loyal patient base, strong referral partnerships, and room to add services.",
  ),
];

/** The three opportunities highlighted on the dashboard. */
export const featuredOpportunities = opportunities.slice(0, 3);

export const marketplaceFilters = {
  industries: [
    "Professional Services",
    "Manufacturing",
    "Business Services",
    "Distribution & Logistics",
    "Home & Property Services",
    "Healthcare",
  ],
  locations: [
    "Ontario",
    "Southern Ontario",
    "Greater Toronto Area",
    "Eastern Ontario",
    "Ottawa Region",
  ],
  revenues: ["$200K–$500K", "$500K–$1M", "$1M–$5M"],
  sizes: ["3–5", "5–10", "10–25"],
  timelines: ["1–3 years", "1–5 years"],
};

export const mentors = [
  { ...people.bryan, advisor: true },
  { ...people.winta, advisor: true },
  { ...people.marvin, advisor: false },
];

export const resources = [
  {
    title: "Inclusive Succession Onboarding Manual",
    meta: "PDF · 3.4 MB",
    icon: "book",
  },
  {
    title: "Business Valuation Workbook",
    meta: "XLSX · 1.2 MB",
    icon: "calculator",
  },
  { title: "Acquisition Thesis Template", meta: "DOCX · 180 KB", icon: "file" },
  {
    title: "Due Diligence Checklist",
    meta: "XLSX · 310 KB",
    icon: "clipboard",
  },
] as const;

export const sessions = [
  {
    month: "Feb",
    day: "18",
    title: "Thesis review: target scoring",
    meta: "2:00 – 2:45 PM ET · Bryan Duarte",
  },
  {
    month: "Feb",
    day: "22",
    title: "Live cohort session: Inside the Deal Room",
    meta: "6:30 – 8:00 PM ET · Marvin Coleby",
  },
  {
    month: "Feb",
    day: "24",
    title: "NDA & introduction etiquette",
    meta: "12:00 – 12:30 PM ET · Winta Asefaw",
  },
];

export const notifications = [
  {
    title: "Introduction request under review",
    time: "2h ago",
    icon: "handshake",
  },
  {
    title: "Reminder: Thesis review with Bryan Duarte",
    time: "5h ago",
    icon: "calendar",
  },
  { title: "Assignment due in 9 days", time: "Yesterday", icon: "book" },
] as const;

export const programInfo = [
  { label: "Program length", value: "4 months" },
  { label: "Structure", value: "3 months online, 1 month alongside a seller" },
  { label: "Commitment", value: "6–8 hours per week" },
  { label: "Cohort size", value: "25 participants" },
  { label: "Program begins", value: "January 11, 2027" },
  { label: "Program fee", value: "Free", highlight: true },
];

export type MilestoneStatus = "completed" | "in-progress" | "upcoming";

export type Milestone = {
  number: number;
  short: string;
  title: string;
  date: string;
  status: MilestoneStatus;
  description: string;
  nextSteps: string[];
  /** The first action is rendered as the primary button. */
  actions: { label: string; href: string }[];
  advisor: Person & { profileHref: string; messageHref: string };
  resources: string[];
};

const advisors = {
  bryan: {
    ...people.bryan,
    profileHref: "/mentorship/bryan",
    messageHref: "/messages/t1",
  },
  winta: {
    ...people.winta,
    profileHref: "/mentorship/winta",
    messageHref: "/messages/t4",
  },
  keisha: {
    ...people.keisha,
    profileHref: "/mentorship/keisha",
    messageHref: "/messages/new-keisha",
  },
  andre: {
    ...people.andre,
    profileHref: "/mentorship/andre",
    messageHref: "/messages/new-andre",
  },
};

export const milestones: Milestone[] = [
  {
    number: 1,
    short: "Readiness",
    title: "Acquisition Readiness",
    date: "Completed Feb 5",
    status: "completed",
    description:
      "Readiness assessment completed with a score of 78/100. Strengths in operations and leadership; financing plan flagged for development.",
    nextSteps: ["Share assessment results with Keisha for financing review"],
    actions: [
      { label: "Revisit Module 1", href: "/learning/acquisition-readiness" },
      { label: "Readiness debrief notes", href: "/mentorship/sessions" },
    ],
    advisor: advisors.bryan,
    resources: [
      "Business Valuation Workbook",
      "Inclusive Succession Onboarding Manual",
    ],
  },
  {
    number: 2,
    short: "Thesis",
    title: "Acquisition Thesis Completed",
    date: "Completed Feb 12",
    status: "completed",
    description:
      "One-page thesis approved: B2B professional services, $500K–$2M revenue, Southern Ontario, with an owner open to a 6–12 month handover.",
    nextSteps: ["Use thesis criteria to score your target list"],
    actions: [{ label: "View my acquisition thesis", href: "/thesis" }],
    advisor: advisors.bryan,
    resources: ["Acquisition Thesis Template"],
  },
  {
    number: 3,
    short: "Targets",
    title: "Target Businesses Identified",
    date: "Due Feb 26",
    status: "in-progress",
    description:
      "Build a scored shortlist of 10–15 businesses that match your thesis. You have 11 targets so far, including 3 from the Seller Marketplace.",
    nextSteps: [
      "Add at least 2 more targets to reach 13",
      "Finish the target scoring exercise in Week 6",
      "Review your top five with Bryan on Feb 18",
    ],
    actions: [
      { label: "Browse the Seller Marketplace", href: "/marketplace" },
      { label: "Continue the scoring exercise", href: continueLessonHref },
      { label: "Saved opportunities", href: "/marketplace?tab=saved" },
    ],
    advisor: advisors.bryan,
    resources: ["Acquisition Thesis Template", "Due Diligence Checklist"],
  },
  {
    number: 4,
    short: "Introductions",
    title: "Seller Introductions",
    date: "Target Mar 5",
    status: "upcoming",
    description:
      "Request consent-based introductions to owners on your shortlist. One introduction (Opportunity 01) is already approved; one is awaiting the owner.",
    nextSteps: [
      "Attend the NDA & introduction etiquette session",
      "Prepare a 2-minute buyer introduction",
    ],
    actions: [
      { label: "My introduction requests", href: "/marketplace/requests" },
      { label: "Open Opportunity 01 deal room", href: "/deal-rooms/dr-01" },
    ],
    advisor: advisors.winta,
    resources: ["Inclusive Succession Onboarding Manual"],
  },
  {
    number: 5,
    short: "Diligence",
    title: "Due Diligence",
    date: "Target Mar 19",
    status: "upcoming",
    description:
      "Verify financials, contracts, customers, and people for your lead opportunity inside the deal room.",
    nextSteps: ["Draft your top-ten diligence questions"],
    actions: [
      {
        label: "Due diligence checklist",
        href: "/deal-rooms/dr-01?tab=diligence",
      },
      { label: "Module 3: Deal Mechanics", href: "/learning/deal-mechanics" },
    ],
    advisor: advisors.winta,
    resources: ["Due Diligence Checklist"],
  },
  {
    number: 6,
    short: "Financing",
    title: "Financing and Deal Structuring",
    date: "Target Mar 26",
    status: "upcoming",
    description:
      "Model a financing structure combining equity, lending, and seller financing that works for both parties.",
    nextSteps: [
      "Gather personal financial statements for lender pre-qualification",
    ],
    actions: [
      {
        label: "Book time with Keisha Grant",
        href: "/mentorship/keisha?book=1",
      },
    ],
    advisor: advisors.keisha,
    resources: ["Financing and Seller Financing Guide"],
  },
  {
    number: 7,
    short: "Shadowing",
    title: "Seller Shadowing",
    date: "Apr 5 – Apr 30",
    status: "upcoming",
    description:
      "Spend month four alongside your matched owner, observing operations and meeting the team.",
    nextSteps: ["Confirm seller match by Mar 29"],
    actions: [
      {
        label: "Module 4: Shadow the Seller",
        href: "/learning/shadow-the-seller",
      },
    ],
    advisor: advisors.andre,
    resources: ["Program Calendar"],
  },
  {
    number: 8,
    short: "Transition",
    title: "Transition Planning",
    date: "Apr 30",
    status: "upcoming",
    description:
      "Present a 12-month transition plan covering customers, team, and owner involvement.",
    nextSteps: ["Review the transition planning template"],
    actions: [
      {
        label: "Week 16: Final presentation",
        href: "/learning/shadow-the-seller/week/16",
      },
    ],
    advisor: advisors.andre,
    resources: ["Transition Planning Template"],
  },
];
