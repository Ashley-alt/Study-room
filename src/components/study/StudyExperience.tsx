"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AudioMixer } from "./AudioMixer";
import { BottomDock } from "./BottomDock";
import { NotesWidget } from "./NotesWidget";
import { PomodoroTimer } from "./PomodoroTimer";
import { PrayerPointsWidget } from "./PrayerPointsWidget";
import { ReflectionWidget } from "./ReflectionWidget";
import { ScriptureCard } from "./ScriptureCard";
import { SettingsPanel } from "./SettingsPanel";
import { StudyRoomBackground } from "./StudyRoomBackground";
import { TaskChecklist } from "./TaskChecklist";

export function StudyExperience() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-navy-950">
      <StudyRoomBackground />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,21,38,0.56),transparent_34%,rgba(7,21,38,0.55))]" />

      <div className="relative z-10 flex min-h-screen">
        <div className="flex min-h-screen flex-1 flex-col justify-between px-4 py-5 pb-28 sm:px-6 lg:px-8">
          <header className="flex items-center justify-between gap-4 text-cream">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gold">
                Study Room
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
                Bible study focus space
              </h1>
            </div>
            <div className="hidden rounded-full border border-cream/20 bg-navy-950/50 px-4 py-2 text-sm text-cream/70 backdrop-blur-xl sm:block">
              Local-only MVP
            </div>
          </header>

          <div className="mt-auto grid max-w-xl gap-4 pb-12 text-cream md:pb-8">
            <PomodoroTimer />
          </div>
        </div>

        <motion.aside
          className="fixed bottom-24 right-3 top-5 z-30 w-[calc(100vw-1.5rem)] overflow-y-auto pr-1 sm:right-5 sm:w-[25rem] lg:bottom-5 lg:w-[28rem]"
          animate={{
            x: panelOpen ? 0 : 460,
            opacity: panelOpen ? 1 : 0,
            pointerEvents: panelOpen ? "auto" : "none",
          }}
          transition={{ type: "spring", stiffness: 210, damping: 28 }}
        >
          <div className="grid gap-4 pb-4">
            <ScriptureCard />
            <NotesWidget />
            <ReflectionWidget />
            <PrayerPointsWidget />
            <TaskChecklist />
            <AudioMixer />
          </div>
        </motion.aside>
      </div>

      {settingsOpen ? <SettingsPanel /> : null}
      <BottomDock
        panelOpen={panelOpen}
        settingsOpen={settingsOpen}
        onTogglePanel={() => setPanelOpen((current) => !current)}
        onToggleSettings={() => setSettingsOpen((current) => !current)}
      />
    </main>
  );
}
