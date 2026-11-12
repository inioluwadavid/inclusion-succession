import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Inclusive Succession Learning Platform",
  description:
    "Your journey to business ownership: learning, acquisition journey, seller marketplace and mentorship.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lato.variable} h-full`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
