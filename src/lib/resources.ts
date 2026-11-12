export type ResourceIcon =
  | "book"
  | "clock"
  | "calendar"
  | "calculator"
  | "file"
  | "clipboard"
  | "route"
  | "landmark";

export type Resource = {
  title: string;
  /** File type and size, e.g. "PDF · 3.4 MB". */
  meta: string;
  description: string;
  icon: ResourceIcon;
  /** Optional audience note shown under the description. */
  audience?: string;
};

export const resourceGroups: { title: string; items: Resource[] }[] = [
  {
    title: "Program essentials",
    items: [
      {
        title: "Inclusive Succession Onboarding Manual",
        meta: "PDF · 3.4 MB",
        icon: "book",
        description:
          "Everything you need for your first week: program structure, expectations, and how introductions work.",
      },
      {
        title: "Attendance Policy",
        meta: "PDF · 210 KB",
        icon: "clock",
        description:
          "Participation requirements for live sessions, deal rooms, and the Shadow the Seller month.",
      },
      {
        title: "Program Calendar",
        meta: "ICS + PDF · 96 KB",
        icon: "calendar",
        description:
          "All 16 weeks of live sessions, deadlines, and deal room dates for Cohort 1.",
      },
    ],
  },
  {
    title: "Workbooks & templates",
    items: [
      {
        title: "Business Valuation Workbook",
        meta: "XLSX · 1.2 MB",
        icon: "calculator",
        description:
          "Calculate SDE and EBITDA, apply multiples, and build a defensible valuation range.",
      },
      {
        title: "Acquisition Thesis Template",
        meta: "DOCX · 180 KB",
        icon: "file",
        description:
          "A one-page structure for the businesses you want to own and why you are the right buyer.",
        audience: "For buyers",
      },
      {
        title: "Due Diligence Checklist",
        meta: "XLSX · 310 KB",
        icon: "clipboard",
        description:
          "120 items across financial, legal, operational, and people diligence — prioritized.",
      },
      {
        title: "Transition Planning Template",
        meta: "DOCX · 220 KB",
        icon: "route",
        description:
          "Plan the handover of clients, staff, suppliers, and owner responsibilities over 12 months.",
      },
    ],
  },
  {
    title: "Guides",
    items: [
      {
        title: "Financing and Seller Financing Guide",
        meta: "PDF · 2.1 MB",
        icon: "landmark",
        description:
          "How bank loans, BDC programs, and vendor take-back notes fit together in small acquisitions.",
      },
    ],
  },
];
