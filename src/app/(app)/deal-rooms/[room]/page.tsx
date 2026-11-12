import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dealRooms } from "@/lib/deal-rooms";
import { DealRoomsView } from "@/components/deal-rooms/deal-rooms-view";

export const metadata: Metadata = {
  title: "Deal Rooms · Inclusive Succession",
};

export function generateStaticParams() {
  return dealRooms.map((room) => ({ room: room.id }));
}

export default async function DealRoomPage({
  params,
}: {
  params: Promise<{ room: string }>;
}) {
  const { room } = await params;
  if (!dealRooms.some((r) => r.id === room)) notFound();
  return <DealRoomsView roomId={room} />;
}
