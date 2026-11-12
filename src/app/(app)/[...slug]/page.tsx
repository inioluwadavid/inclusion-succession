import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { button, card, eyebrow } from "@/components/ui";

// Placeholder for sections of the platform that have not been built yet,
// so sidebar and dashboard links land inside the app shell instead of a 404.
type Params = Promise<{ slug: string[] }>;

async function Title({ params }: { params: Params }) {
  const { slug } = await params;
  return slug[0].replace(/-/g, " ");
}

export default function PlaceholderPage({ params }: { params: Params }) {
  return (
    <section className={`${card} p-8 md:p-12`}>
      <p className={`${eyebrow} text-deepteal`}>Coming soon</p>
      <h1 className="mt-2 text-3xl font-black capitalize tracking-tight text-navy">
        <Suspense fallback={<>&nbsp;</>}>
          <Title params={params} />
        </Suspense>
      </h1>
      <p className="mt-2 max-w-xl text-[15px] text-ink-muted">
        This part of the platform hasn&apos;t been built yet.
      </p>
      <Link href="/" className={`${button("outline", "h-10 px-4")} mt-6`}>
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>
    </section>
  );
}
