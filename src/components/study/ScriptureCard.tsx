"use client";

import { BookOpen } from "lucide-react";
import { scripturePrompts, studyTopics } from "@/lib/study-data";
import { useStudyRoomStore } from "@/store/study-room-store";

export function ScriptureCard() {
  const selectedTopic = useStudyRoomStore((state) => state.selectedTopic);
  const setSelectedTopic = useStudyRoomStore((state) => state.setSelectedTopic);
  const scripture = scripturePrompts.find((item) => item.topic === selectedTopic);

  if (!scripture) return null;

  return (
    <section className="glass-panel rounded-2xl p-5 text-cream">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-gold" />
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/75">
            Scripture
          </h2>
        </div>
        <select
          value={selectedTopic}
          onChange={(event) => setSelectedTopic(event.target.value as typeof selectedTopic)}
          className="rounded-full border border-cream/20 bg-navy-950/60 px-3 py-1.5 text-sm text-cream outline-none"
        >
          {studyTopics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </div>
      <p className="mb-3 text-lg leading-7 text-cream md:text-xl">
        &ldquo;{scripture.text}&rdquo;
      </p>
      <p className="mb-4 font-semibold text-gold">{scripture.reference}</p>
      <div className="rounded-xl border border-gold/25 bg-gold/10 p-4 text-sm leading-6 text-cream/80">
        {scripture.prompt}
      </div>
    </section>
  );
}
