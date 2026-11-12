"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { appNotifications } from "@/lib/messages";

type NotificationsState = {
  unreadIds: ReadonlySet<string>;
  markRead: (id: string) => void;
  markAllRead: () => void;
};

const NotificationsContext = createContext<NotificationsState | null>(null);

/** Shares which notifications are unread between the top bar bell and the Messages page. */
export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [unreadIds, setUnreadIds] = useState<ReadonlySet<string>>(
    () => new Set(appNotifications.filter((n) => n.unread).map((n) => n.id)),
  );

  const value = useMemo<NotificationsState>(
    () => ({
      unreadIds,
      markRead: (id) =>
        setUnreadIds((prev) => {
          if (!prev.has(id)) return prev;
          const next = new Set(prev);
          next.delete(id);
          return next;
        }),
      markAllRead: () => setUnreadIds(new Set()),
    }),
    [unreadIds],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context)
    throw new Error(
      "useNotifications must be used inside NotificationsProvider",
    );
  return context;
}
