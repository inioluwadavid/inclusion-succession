import type { Metadata } from "next";
import { defaultDealRoomId } from "@/lib/deal-rooms";
import { DealRoomsView } from "@/components/deal-rooms/deal-rooms-view";

export const metadata: Metadata = {
  title: "Deal Rooms · Inclusive Succession",
};

export default function DealRoomsPage() {
  return <DealRoomsView roomId={defaultDealRoomId} />;
}
