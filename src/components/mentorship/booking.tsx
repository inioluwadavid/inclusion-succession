"use client";

import {
  useEffect,
  useId,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { bookingSlots, type Mentor } from "@/lib/mentors";
import { button } from "@/components/ui";

function BookingDialog({
  mentor,
  onClose,
}: {
  mentor: Mentor;
  onClose: () => void;
}) {
  const titleId = useId();
  const [slot, setSlot] = useState("");
  const [topic, setTopic] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!slot) return;
    toast.success(
      `Booked with ${mentor.name} — ${slot}. A calendar invite is on its way.`,
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-navy-900/60" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[92vh] w-full flex-col rounded-t-2xl bg-white shadow-lift sm:max-w-lg sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
          <div>
            <h2 id={titleId} className="text-lg font-black text-navy">
              Book time with {mentor.name}
            </h2>
            <p className="mt-0.5 text-sm text-ink-muted">
              45-minute video call · All times Eastern
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 rounded-lg p-2 text-ink-muted transition-colors duration-150 hover:bg-mist hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="scroll-thin flex-1 overflow-y-auto">
          <form className="space-y-5 px-6 py-6" onSubmit={submit}>
            <fieldset>
              <legend className="mb-2 text-sm font-bold text-navy">
                Choose a time
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {bookingSlots.map((option) => (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2.5 text-sm font-bold transition-colors duration-150 has-focus-visible:ring-2 has-focus-visible:ring-teal ${
                      option === slot
                        ? "border-teal bg-teal-50 text-deepteal"
                        : "border-line text-ink hover:bg-mist"
                    }`}
                  >
                    <input
                      type="radio"
                      name="slot"
                      value={option}
                      checked={option === slot}
                      onChange={() => setSlot(option)}
                      className="sr-only"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label
                htmlFor={`${titleId}-topic`}
                className="text-sm font-bold text-navy"
              >
                What would you like to discuss?
              </label>
              <textarea
                id={`${titleId}-topic`}
                rows={3}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={`e.g. ${mentor.specializations[0]}`}
                className="mt-2 w-full resize-none rounded-lg border border-line p-3 text-sm placeholder:text-ink-muted focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className={button("outline", "h-10 px-4")}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!slot}
                className={button("primary", "h-10 flex-1 px-4")}
              >
                Confirm booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/** A button that opens the booking dialog for one mentor. */
export function BookButton({
  mentor,
  className,
  children,
}: {
  mentor: Mentor;
  className: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      {open && <BookingDialog mentor={mentor} onClose={() => setOpen(false)} />}
    </>
  );
}
