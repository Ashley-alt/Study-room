"use client";

import Link from "next/link";
import { BookOpen, Moon, PanelRightOpen, Settings, Sun } from "lucide-react";
import { useStudyRoomStore } from "@/store/study-room-store";

type BottomDockProps = {
  panelOpen: boolean;
  settingsOpen: boolean;
  onTogglePanel: () => void;
  onToggleSettings: () => void;
};

export function BottomDock({
  panelOpen,
  settingsOpen,
  onTogglePanel,
  onToggleSettings,
}: BottomDockProps) {
  const theme = useStudyRoomStore((state) => state.theme);
  const setTheme = useStudyRoomStore((state) => state.setTheme);

  return (
    <nav className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-cream/20 bg-navy-950/60 px-3 py-2 text-cream shadow-2xl backdrop-blur-xl">
      <Link
        href="/"
        className="grid h-11 w-11 place-items-center rounded-full text-cream/75 transition hover:bg-cream/10 hover:text-cream"
        aria-label="Go to landing page"
        title="Home"
      >
        <BookOpen className="h-5 w-5" />
      </Link>
      <button
        type="button"
        onClick={() => setTheme(theme === "day" ? "night" : "day")}
        className="grid h-11 w-11 place-items-center rounded-full text-cream/75 transition hover:bg-cream/10 hover:text-cream"
        aria-label={theme === "day" ? "Switch to night mode" : "Switch to day mode"}
        title={theme === "day" ? "Night mode" : "Day mode"}
      >
        {theme === "day" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </button>
      <button
        type="button"
        onClick={onTogglePanel}
        className={`grid h-11 w-11 place-items-center rounded-full transition ${
          panelOpen ? "bg-gold text-navy-950" : "text-cream/75 hover:bg-cream/10"
        }`}
        aria-label={panelOpen ? "Close study panel" : "Open study panel"}
        title="Study panel"
      >
        <PanelRightOpen className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={onToggleSettings}
        className={`grid h-11 w-11 place-items-center rounded-full transition ${
          settingsOpen ? "bg-gold text-navy-950" : "text-cream/75 hover:bg-cream/10"
        }`}
        aria-label={settingsOpen ? "Close settings" : "Open settings"}
        title="Settings"
      >
        <Settings className="h-5 w-5" />
      </button>
    </nav>
  );
}
