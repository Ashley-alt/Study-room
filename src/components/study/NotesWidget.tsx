"use client";

import { PenLine } from "lucide-react";
import { useStudyRoomStore } from "@/store/study-room-store";

export function NotesWidget() {
  const notes = useStudyRoomStore((state) => state.notes);
  const setNotes = useStudyRoomStore((state) => state.setNotes);

  return (
    <section className="glass-panel rounded-2xl p-5 text-cream">
      <div className="mb-3 flex items-center gap-2">
        <PenLine className="h-5 w-5 text-gold" />
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/75">
          Notes
        </h2>
      </div>
      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Write what stood out, cross references, or a prayer response..."
        className="min-h-44 w-full resize-none rounded-xl border border-cream/15 bg-navy-950/50 p-4 text-sm leading-6 text-cream outline-none placeholder:text-cream/50 focus:border-gold/60"
      />
      <p className="mt-2 text-xs text-cream/50">Autosaved locally</p>
    </section>
  );
}
