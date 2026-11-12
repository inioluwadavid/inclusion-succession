import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { newThreads, threads } from "@/lib/messages";
import { MessagesView } from "@/components/messages/messages-view";

export const metadata: Metadata = { title: "Messages · Inclusive Succession" };

const allThreads = [...threads, ...newThreads];

export function generateStaticParams() {
  return allThreads.map((thread) => ({ thread: thread.id }));
}

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ thread: string }>;
}) {
  const { thread } = await params;
  if (!allThreads.some((t) => t.id === thread)) notFound();
  return <MessagesView threadId={thread} />;
}
