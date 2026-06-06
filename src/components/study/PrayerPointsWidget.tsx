"use client";

import { Sparkles } from "lucide-react";
import { prayerPoints } from "@/lib/study-data";
import { useStudyRoomStore } from "@/store/study-room-store";

export function PrayerPointsWidget() {
  const selectedTopic = useStudyRoomStore((state) => state.selectedTopic);

  return (
    <section className="glass-panel rounded-2xl p-5 text-cream">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-gold" />
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/75">
          Prayer
        </h2>
      </div>
      <ul className="space-y-3">
        {prayerPoints[selectedTopic].map((point) => (
          <li key={point} className="flex gap-3 text-sm leading-6 text-cream/80">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}
