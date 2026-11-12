"use client";

import type { ReactNode } from "react";
import { toast } from "sonner";

/** A button whose only effect, for now, is a confirmation toast. */
export function ToastButton({
  message,
  success = false,
  className,
  children,
}: {
  message: string;
  /** Show the toast with a success tick. */
  success?: boolean;
  className: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => (success ? toast.success(message) : toast(message))}
      className={className}
    >
      {children}
    </button>
  );
}
