"use client";

import { Moon, SlidersHorizontal, Sun } from "lucide-react";
import { studyTopics } from "@/lib/study-data";
import { useStudyRoomStore } from "@/store/study-room-store";

export function SettingsPanel() {
  const theme = useStudyRoomStore((state) => state.theme);
  const selectedTopic = useStudyRoomStore((state) => state.selectedTopic);
  const studyDuration = useStudyRoomStore((state) => state.studyDuration);
  const breakDuration = useStudyRoomStore((state) => state.breakDuration);
  const setTheme = useStudyRoomStore((state) => state.setTheme);
  const setSelectedTopic = useStudyRoomStore((state) => state.setSelectedTopic);
  const setStudyDuration = useStudyRoomStore((state) => state.setStudyDuration);
  const setBreakDuration = useStudyRoomStore((state) => state.setBreakDuration);

  return (
    <section className="glass-panel fixed left-4 top-20 z-30 w-[calc(100vw-2rem)] rounded-2xl p-5 text-cream sm:w-80">
      <div className="mb-4 flex items-center gap-2">
        <SlidersHorizontal className="h-5 w-5 text-gold" />
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/75">
          Settings
        </h2>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-2 rounded-full border border-cream/15 bg-navy-950/50 p-1">
        <button
          type="button"
          onClick={() => setTheme("day")}
          className={`flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm transition ${
            theme === "day" ? "bg-gold text-navy-950" : "text-cream/70"
          }`}
        >
          <Sun className="h-4 w-4" />
          Day
        </button>
        <button
          type="button"
          onClick={() => setTheme("night")}
          className={`flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm transition ${
            theme === "night" ? "bg-gold text-navy-950" : "text-cream/70"
          }`}
        >
          <Moon className="h-4 w-4" />
          Night
        </button>
      </div>
      <label className="mb-4 block text-xs uppercase tracking-[0.16em] text-cream/50">
        Topic
        <select
          value={selectedTopic}
          onChange={(event) => setSelectedTopic(event.target.value as typeof selectedTopic)}
          className="mt-2 w-full rounded-xl border border-cream/15 bg-navy-950/60 px-3 py-2 text-sm normal-case tracking-normal text-cream outline-none focus:border-gold/60"
        >
          {studyTopics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-xs uppercase tracking-[0.16em] text-cream/50">
          Study
          <input
            type="number"
            min={1}
            max={120}
            value={studyDuration}
            onChange={(event) => setStudyDuration(Number(event.target.value))}
            className="mt-2 w-full rounded-xl border border-cream/15 bg-navy-950/60 px-3 py-2 text-sm normal-case tracking-normal text-cream outline-none focus:border-gold/60"
          />
        </label>
        <label className="text-xs uppercase tracking-[0.16em] text-cream/50">
          Break
          <input
            type="number"
            min={1}
            max={30}
            value={breakDuration}
            onChange={(event) => setBreakDuration(Number(event.target.value))}
            className="mt-2 w-full rounded-xl border border-cream/15 bg-navy-950/60 px-3 py-2 text-sm normal-case tracking-normal text-cream outline-none focus:border-gold/60"
          />
        </label>
      </div>
    </section>
  );
}
