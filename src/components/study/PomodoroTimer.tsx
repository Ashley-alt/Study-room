"use client";

import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useStudyRoomStore } from "@/store/study-room-store";
import { SessionCompleteModal } from "./SessionCompleteModal";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
};

export function PomodoroTimer() {
  const studyDuration = useStudyRoomStore((state) => state.studyDuration);
  const breakDuration = useStudyRoomStore((state) => state.breakDuration);
  const setStudyDuration = useStudyRoomStore((state) => state.setStudyDuration);
  const setBreakDuration = useStudyRoomStore((state) => state.setBreakDuration);
  const completedSessions = useStudyRoomStore((state) => state.completedSessions);
  const incrementCompletedSessions = useStudyRoomStore(
    (state) => state.incrementCompletedSessions,
  );
  const [secondsLeft, setSecondsLeft] = useState(studyDuration * 60);
  const [running, setRunning] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const progress = useMemo(() => {
    const total = studyDuration * 60;
    return total ? 100 - (secondsLeft / total) * 100 : 0;
  }, [secondsLeft, studyDuration]);

  useEffect(() => {
    if (!running) setSecondsLeft(studyDuration * 60);
  }, [studyDuration, running]);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setRunning(false);
          incrementCompletedSessions();
          setModalOpen(true);
          return studyDuration * 60;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [incrementCompletedSessions, running, studyDuration]);

  return (
    <>
      <section className="glass-panel rounded-2xl p-5 text-cream">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/75">
              Focus
            </h2>
            <p className="text-xs text-cream/50">25 / 5 rhythm by default</p>
          </div>
          <span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs text-gold">
            {completedSessions} sessions
          </span>
        </div>
        <div className="mb-5 grid place-items-center">
          <div className="relative grid h-36 w-36 place-items-center rounded-full border border-cream/15 bg-navy-950/40">
            <div
              className="absolute inset-2 rounded-full"
              style={{
                background: `conic-gradient(#d8a84e ${progress}%, rgba(255,248,231,0.12) ${progress}%)`,
              }}
            />
            <div className="relative grid h-28 w-28 place-items-center rounded-full bg-navy-950/90">
              <span className="font-mono text-3xl font-semibold">
                {formatTime(secondsLeft)}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-5 grid grid-cols-2 gap-3">
          <label className="text-xs uppercase tracking-[0.16em] text-cream/50">
            Study
            <input
              type="number"
              min={1}
              max={120}
              value={studyDuration}
              onChange={(event) => setStudyDuration(Number(event.target.value))}
              className="mt-2 w-full rounded-xl border border-cream/15 bg-navy-950/50 px-3 py-2 text-sm text-cream outline-none focus:border-gold/60"
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
              className="mt-2 w-full rounded-xl border border-cream/15 bg-navy-950/50 px-3 py-2 text-sm text-cream outline-none focus:border-gold/60"
            />
          </label>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setRunning((current) => !current)}
            className="rounded-full bg-gold p-3 text-navy-950 transition hover:bg-cream"
            aria-label={running ? "Pause timer" : "Start timer"}
            title={running ? "Pause timer" : "Start timer"}
          >
            {running ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={() => {
              setRunning(false);
              setSecondsLeft(studyDuration * 60);
            }}
            className="rounded-full border border-cream/20 p-3 text-cream transition hover:border-gold/60 hover:text-gold"
            aria-label="Reset timer"
            title="Reset timer"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </section>
      <SessionCompleteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sessions={completedSessions}
      />
    </>
  );
}
