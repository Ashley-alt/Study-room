"use client";

import { HelpCircle } from "lucide-react";
import { reflectionQuestions } from "@/lib/study-data";
import { useStudyRoomStore } from "@/store/study-room-store";

export function ReflectionWidget() {
  const selectedTopic = useStudyRoomStore((state) => state.selectedTopic);

  return (
    <section className="glass-panel rounded-2xl p-5 text-cream">
      <div className="mb-3 flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-gold" />
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/75">
          Reflection
        </h2>
      </div>
      <div className="space-y-3">
        {reflectionQuestions[selectedTopic].map((question) => (
          <p
            key={question}
            className="rounded-xl border border-cream/10 bg-cream/10 p-3 text-sm leading-6 text-cream/80"
          >
            {question}
          </p>
        ))}
      </div>
    </section>
  );
}
