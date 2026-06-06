"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Headphones,
  HelpCircle,
  Library,
  Maximize2,
  Moon,
  NotebookPen,
  PanelRight,
  Pause,
  Play,
  Plus,
  Settings,
  Sparkles,
  Sun,
  Trash2,
  User,
  X,
} from "lucide-react";
import {
  ambientTracks,
  prayerPoints,
  reflectionQuestions,
  scripturePrompts,
  studyTopics,
} from "@/lib/study-data";
import { useStudyRoomStore } from "@/store/study-room-store";
import { StudyRoomBackground } from "./StudyRoomBackground";

type ActivePanel = "timer" | "notes" | "scripture" | "audio" | "logs" | "settings" | null;

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
};

function PanelFrame({
  title,
  activePanel,
  onClose,
  children,
  wide = false,
}: {
  title: string;
  activePanel: ActivePanel;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  if (!activePanel) return null;

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-[rgba(18,13,10,0.45)] px-4 py-20 backdrop-blur-[2px]">
      <motion.section
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className={`relative max-h-[calc(100vh-7rem)] w-full overflow-hidden rounded-[28px] border border-cream/20 bg-[#080604]/80 text-cream shadow-[0_28px_110px_rgba(0,0,0,0.55)] backdrop-blur-2xl ${
          wide ? "max-w-5xl" : "max-w-3xl"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 rounded-full p-2 text-cream transition hover:bg-cream/10"
          aria-label="Close panel"
          title="Close"
        >
          <X className="h-7 w-7" />
        </button>
        <div className="relative max-h-[calc(100vh-7rem)] overflow-y-auto px-6 pb-7 pt-8 sm:px-10">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold tracking-normal sm:text-5xl">{title}</h2>
            <div className="mx-auto mt-1 h-3 w-32 rounded-full border-b-[5px] border-gold" />
          </div>
          {children}
        </div>
      </motion.section>
    </div>
  );
}

export function StudyExperience() {
  const theme = useStudyRoomStore((state) => state.theme);
  const selectedTopic = useStudyRoomStore((state) => state.selectedTopic);
  const notes = useStudyRoomStore((state) => state.notes);
  const tasks = useStudyRoomStore((state) => state.tasks);
  const completedSessions = useStudyRoomStore((state) => state.completedSessions);
  const studyDuration = useStudyRoomStore((state) => state.studyDuration);
  const breakDuration = useStudyRoomStore((state) => state.breakDuration);
  const musicPlaying = useStudyRoomStore((state) => state.musicPlaying);
  const musicVolume = useStudyRoomStore((state) => state.musicVolume);
  const ambience = useStudyRoomStore((state) => state.ambience);
  const setTheme = useStudyRoomStore((state) => state.setTheme);
  const setSelectedTopic = useStudyRoomStore((state) => state.setSelectedTopic);
  const setNotes = useStudyRoomStore((state) => state.setNotes);
  const addTask = useStudyRoomStore((state) => state.addTask);
  const toggleTask = useStudyRoomStore((state) => state.toggleTask);
  const deleteTask = useStudyRoomStore((state) => state.deleteTask);
  const setStudyDuration = useStudyRoomStore((state) => state.setStudyDuration);
  const setBreakDuration = useStudyRoomStore((state) => state.setBreakDuration);
  const incrementCompletedSessions = useStudyRoomStore(
    (state) => state.incrementCompletedSessions,
  );
  const setMusicPlaying = useStudyRoomStore((state) => state.setMusicPlaying);
  const setMusicVolume = useStudyRoomStore((state) => state.setMusicVolume);
  const toggleAmbience = useStudyRoomStore((state) => state.toggleAmbience);
  const setAmbienceVolume = useStudyRoomStore((state) => state.setAmbienceVolume);

  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [taskText, setTaskText] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(studyDuration * 60);
  const [running, setRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<"study" | "break">("study");

  const scripture = useMemo(
    () => scripturePrompts.find((item) => item.topic === selectedTopic) ?? scripturePrompts[0],
    [selectedTopic],
  );
  const completeTasks = tasks.filter((task) => task.completed).length;
  const timerDuration = timerMode === "study" ? studyDuration : breakDuration;

  useEffect(() => {
    if (!running) setSecondsLeft(timerDuration * 60);
  }, [running, timerDuration]);

  useEffect(() => {
    if (!running) return;

    const interval = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setRunning(false);
          if (timerMode === "study") incrementCompletedSessions();
          return timerDuration * 60;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [incrementCompletedSessions, running, timerDuration, timerMode]);

  const handleAddTask = (event: FormEvent) => {
    event.preventDefault();
    if (!taskText.trim()) return;
    addTask(taskText.trim());
    setTaskText("");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#14100e]">
      <StudyRoomBackground />
      <div className="pointer-events-none absolute inset-0 bg-[#2b1d16]/20" />

      <header className="fixed left-0 right-0 top-0 z-30 flex h-24 items-center justify-between px-6 text-cream sm:px-12 lg:px-20">
        <button
          type="button"
          onClick={() => setActivePanel("scripture")}
          className="text-left text-3xl font-bold tracking-normal text-cream drop-shadow-md"
        >
          Study
          <span className="block -translate-y-1 text-lg font-semibold text-gold">Room</span>
        </button>
        <nav className="hidden items-center gap-10 text-base font-semibold drop-shadow-md md:flex">
          <button type="button" onClick={() => setActivePanel("scripture")}>
            Scripture
          </button>
          <button type="button" onClick={() => setActivePanel("timer")}>
            Timer & Tasks
          </button>
          <button type="button" onClick={() => setActivePanel("notes")}>
            Notes
          </button>
        </nav>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setTheme(theme === "day" ? "night" : "day")}
            className="rounded-full p-2 drop-shadow-md transition hover:bg-cream/10"
            aria-label="Toggle day or night"
            title="Day / night"
          >
            {theme === "day" ? <Moon className="h-7 w-7" /> : <Sun className="h-7 w-7" />}
          </button>
          <button
            type="button"
            onClick={() => setActivePanel("logs")}
            className="hidden rounded-full p-2 drop-shadow-md transition hover:bg-cream/10 sm:block"
            aria-label="Open study logs"
            title="Logs"
          >
            <Library className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={() => setActivePanel("scripture")}
            className="hidden rounded-full p-2 drop-shadow-md transition hover:bg-cream/10 sm:block"
            aria-label="Open scripture panel"
            title="Scripture"
          >
            <BookOpen className="h-7 w-7" />
          </button>
          <User className="hidden h-7 w-7 drop-shadow-md sm:block" />
        </div>
      </header>

      <button
        type="button"
        onClick={() => setActivePanel("scripture")}
        className="absolute left-[22%] top-[22%] z-20 h-11 w-11 rounded-full border-4 border-cream bg-transparent shadow-[0_0_24px_rgba(255,248,231,0.35)] transition hover:scale-110"
        aria-label="Open scripture hotspot"
      />
      <button
        type="button"
        onClick={() => setActivePanel("notes")}
        className="absolute bottom-[17%] left-[27%] z-20 h-11 w-11 rounded-full border-4 border-cream bg-transparent shadow-[0_0_24px_rgba(255,248,231,0.35)] transition hover:scale-110"
        aria-label="Open notes hotspot"
      />
      <button
        type="button"
        onClick={() => setActivePanel("timer")}
        className="absolute bottom-[25%] right-[24%] z-20 h-11 w-11 rounded-full border-4 border-cream bg-transparent shadow-[0_0_24px_rgba(255,248,231,0.35)] transition hover:scale-110"
        aria-label="Open timer hotspot"
      />

      <aside className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 overflow-hidden rounded-full border border-cream/10 bg-[rgba(12,8,6,0.45)] text-cream shadow-2xl backdrop-blur-xl md:block">
        {[
          { icon: Settings, label: "Settings", panel: "settings" as const },
          { icon: PanelRight, label: "Scripture", panel: "scripture" as const },
          { icon: NotebookPen, label: "Notes", panel: "notes" as const },
          { icon: Headphones, label: "Audio", panel: "audio" as const },
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setActivePanel(item.panel)}
            className={`grid h-16 w-16 place-items-center border-b border-cream/10 transition last:border-b-0 hover:bg-gold/20 ${
              activePanel === item.panel ? "text-gold" : "text-cream/60"
            }`}
            aria-label={`Open ${item.label}`}
            title={item.label}
          >
            <item.icon className="h-7 w-7" />
          </button>
        ))}
      </aside>

      <div className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4 text-cream">
        <button
          type="button"
          className="rounded-full p-2 text-cream/80 transition hover:text-gold"
          aria-label="Previous track"
          title="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => setMusicPlaying(!musicPlaying)}
          className="grid h-16 w-16 place-items-center rounded-full border-2 border-cream bg-cream/10 text-cream shadow-2xl backdrop-blur-md transition hover:border-gold hover:text-gold"
          aria-label={musicPlaying ? "Pause music" : "Play music"}
          title={musicPlaying ? "Pause music" : "Play music"}
        >
          {musicPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 fill-current" />}
        </button>
        <button
          type="button"
          className="rounded-full p-2 text-cream/80 transition hover:text-gold"
          aria-label="Next track"
          title="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="fixed bottom-6 right-6 z-30 hidden items-center gap-2 rounded-full bg-[#0d0907]/70 px-4 py-2 text-sm text-cream/75 backdrop-blur-xl sm:flex">
        <span>{selectedTopic.toLowerCase()}</span>
        <span className="text-gold">/</span>
        <Clock className="h-4 w-4 text-gold" />
        <span className="font-mono">{formatTime(secondsLeft)}</span>
      </div>

      <PanelFrame
        title="Timer & Tasks"
        activePanel={activePanel === "timer" ? activePanel : null}
        onClose={() => setActivePanel(null)}
      >
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto mb-12 grid max-w-sm grid-cols-2 overflow-hidden border border-cream/20 bg-cream/5">
            {(["study", "break"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  setTimerMode(mode);
                  setRunning(false);
                }}
                className={`px-6 py-4 text-lg font-bold capitalize ${
                  timerMode === mode ? "bg-cream/10 text-cream" : "text-cream/50"
                }`}
              >
                {mode === "study" ? "Pomodoro" : "Break"}
              </button>
            ))}
          </div>

          <div className="mb-12 text-center">
            <p className="font-mono text-6xl font-bold sm:text-7xl">
              {formatTime(secondsLeft)}
            </p>
            <p className="mt-3 text-cream/50">{selectedTopic}</p>
          </div>

          <div className="mb-12 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setRunning((current) => !current)}
              className="rounded-full bg-gold px-14 py-4 text-xl font-bold text-[#17100b] transition hover:bg-cream"
            >
              {running ? "Pause" : "Start"}
            </button>
            <button
              type="button"
              onClick={() => {
                setRunning(false);
                setSecondsLeft(timerDuration * 60);
              }}
              className="rounded-full p-4 text-cream transition hover:bg-cream/10"
              aria-label="Reset timer"
              title="Reset"
            >
              <Maximize2 className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-4">
            <label className="text-sm font-semibold text-cream/60">
              Study minutes
              <input
                type="number"
                min={1}
                max={120}
                value={studyDuration}
                onChange={(event) => setStudyDuration(Number(event.target.value))}
                className="mt-2 w-full rounded-xl border border-cream/20 bg-black/25 px-4 py-3 text-cream outline-none focus:border-gold"
              />
            </label>
            <label className="text-sm font-semibold text-cream/60">
              Break minutes
              <input
                type="number"
                min={1}
                max={30}
                value={breakDuration}
                onChange={(event) => setBreakDuration(Number(event.target.value))}
                className="mt-2 w-full rounded-xl border border-cream/20 bg-black/25 px-4 py-3 text-cream outline-none focus:border-gold"
              />
            </label>
          </div>

          <form onSubmit={handleAddTask} className="mb-5 flex gap-3">
            <input
              value={taskText}
              onChange={(event) => setTaskText(event.target.value)}
              placeholder="Add study task"
              className="min-w-0 flex-1 rounded-full border border-gold/60 bg-transparent px-5 py-4 text-cream outline-none placeholder:text-cream/40"
            />
            <button
              type="submit"
              className="grid h-14 w-14 place-items-center rounded-full bg-gold text-[#17100b]"
              aria-label="Add task"
            >
              <Plus className="h-6 w-6" />
            </button>
          </form>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 rounded-xl bg-cream/10 p-3">
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  className={`grid h-7 w-7 place-items-center rounded-full border ${
                    task.completed ? "border-gold bg-gold text-black" : "border-cream/40"
                  }`}
                  aria-label="Toggle task"
                >
                  <Check className="h-4 w-4" />
                </button>
                <span className={`flex-1 ${task.completed ? "text-cream/40 line-through" : ""}`}>
                  {task.text}
                </span>
                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  className="rounded-full p-2 text-cream/50 hover:text-cream"
                  aria-label="Delete task"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </PanelFrame>

      <PanelFrame
        title="Notes"
        activePanel={activePanel === "notes" ? activePanel : null}
        onClose={() => setActivePanel(null)}
        wide
      >
        <div className="grid min-h-[31rem] overflow-hidden rounded-2xl border border-cream/10 bg-black/20 md:grid-cols-[17rem_1fr]">
          <aside className="border-b border-cream/10 bg-black/50 p-5 md:border-b-0 md:border-r">
            <button
              type="button"
              className="mb-5 grid h-24 w-full place-items-center rounded-xl border border-dashed border-cream/25 text-cream/50"
            >
              <Plus className="mb-1 h-7 w-7" />
              Add Note
            </button>
            <div className="rounded-xl bg-cream/10 p-4">
              <p className="mb-3 text-sm text-cream/50">Today</p>
              <h3 className="mb-2 font-bold">{notes ? "Study notes" : "New reflection"}</h3>
              <p className="line-clamp-4 text-sm leading-6 text-cream/60">
                {notes || "Write your observations, questions, and prayer response."}
              </p>
            </div>
          </aside>
          <div className="p-6">
            <h3 className="mb-4 text-3xl font-bold">{notes ? "Study notes" : "Hi!"}</h3>
            <div className="mb-0 flex items-center gap-5 rounded-t-xl border border-cream/10 bg-black/20 px-4 py-3 text-xl font-bold">
              <span>B</span>
              <span className="italic">I</span>
              <span className="underline">U</span>
              <Trash2 className="ml-auto h-5 w-5" />
            </div>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="min-h-[22rem] w-full resize-none rounded-b-xl border border-t-0 border-cream/10 bg-black/20 p-5 leading-7 text-cream outline-none placeholder:text-cream/40"
              placeholder="This is your Bible study notes app..."
            />
            <div className="mt-5 flex justify-end">
              <button className="rounded-full bg-gold px-10 py-3 font-bold text-[#17100b]">
                Save
              </button>
            </div>
          </div>
        </div>
      </PanelFrame>

      <PanelFrame
        title="Scripture"
        activePanel={activePanel === "scripture" ? activePanel : null}
        onClose={() => setActivePanel(null)}
      >
        <div className="mx-auto max-w-2xl text-center">
          <select
            value={selectedTopic}
            onChange={(event) => setSelectedTopic(event.target.value as typeof selectedTopic)}
            className="mb-7 rounded-full border border-cream/20 bg-black/40 px-5 py-3 font-semibold text-cream outline-none"
          >
            {studyTopics.map((topic) => (
              <option key={topic}>{topic}</option>
            ))}
          </select>
          <p className="mb-5 text-2xl leading-10">&ldquo;{scripture.text}&rdquo;</p>
          <p className="mb-8 text-xl font-bold text-gold">{scripture.reference}</p>
          <p className="rounded-2xl border border-gold/20 bg-gold/10 p-5 leading-7 text-cream/80">
            {scripture.prompt}
          </p>
          <div className="mt-8 grid gap-4 text-left md:grid-cols-2">
            <div className="rounded-2xl bg-cream/10 p-5">
              <h3 className="mb-4 flex items-center gap-2 font-bold">
                <HelpCircle className="h-5 w-5 text-gold" />
                Reflection
              </h3>
              {reflectionQuestions[selectedTopic].map((question) => (
                <p key={question} className="mb-3 text-sm leading-6 text-cream/70">
                  {question}
                </p>
              ))}
            </div>
            <div className="rounded-2xl bg-cream/10 p-5">
              <h3 className="mb-4 flex items-center gap-2 font-bold">
                <Sparkles className="h-5 w-5 text-gold" />
                Prayer
              </h3>
              {prayerPoints[selectedTopic].map((point) => (
                <p key={point} className="mb-3 text-sm leading-6 text-cream/70">
                  {point}
                </p>
              ))}
            </div>
          </div>
        </div>
      </PanelFrame>

      <PanelFrame
        title="Mood"
        activePanel={activePanel === "audio" || activePanel === "settings" ? activePanel : null}
        onClose={() => setActivePanel(null)}
      >
        <div className="mx-auto max-w-xl">
          <div className="mb-7 grid grid-cols-3 gap-4">
            {[
              { label: "Quiet", icon: Moon },
              { label: "Warm", icon: Flame },
              { label: "Chill", icon: Headphones },
            ].map((mood) => (
              <button
                key={mood.label}
                type="button"
                className="grid h-28 place-items-center rounded-xl bg-[#101024]/80 text-cream/60 transition hover:text-gold"
              >
                <mood.icon className="h-8 w-8 text-gold" />
                <span className="font-bold">{mood.label}</span>
              </button>
            ))}
          </div>
          <label className="mb-6 block font-bold">
            Lo-fi study loop
            <input
              type="range"
              min={0}
              max={100}
              value={musicVolume}
              onChange={(event) => setMusicVolume(Number(event.target.value))}
              className="range-warm mt-3 w-full"
            />
          </label>
          <h3 className="mb-4 text-xl font-bold">Background noises</h3>
          <div className="space-y-5">
            {ambientTracks.map((track) => (
              <div key={track.id} className="grid grid-cols-[8rem_1fr] items-center gap-4">
                <button
                  type="button"
                  onClick={() => toggleAmbience(track.id)}
                  className={`text-left font-semibold ${
                    ambience[track.id].enabled ? "text-gold" : "text-cream/50"
                  }`}
                >
                  {track.label}
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={ambience[track.id].volume}
                  onChange={(event) => setAmbienceVolume(track.id, Number(event.target.value))}
                  className="range-warm w-full"
                  aria-label={`${track.label} volume`}
                />
              </div>
            ))}
          </div>
        </div>
      </PanelFrame>

      <PanelFrame
        title="Logs"
        activePanel={activePanel === "logs" ? activePanel : null}
        onClose={() => setActivePanel(null)}
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 grid gap-3 md:grid-cols-3">
            {[
              { label: "Total hours", value: Math.floor((completedSessions * studyDuration) / 60), icon: Clock },
              { label: "Day streak", value: completedSessions ? 1 : 0, icon: Sun },
              { label: "Total sessions", value: completedSessions, icon: Check },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-cream/10 p-5">
                <div className="mb-2 flex items-center justify-between text-cream/60">
                  <span className="font-bold">{stat.label}</span>
                  <stat.icon className="h-7 w-7 text-gold" />
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {tasks.slice(0, 4).map((task) => (
              <article key={task.id} className="rounded-2xl border border-cream/10 bg-cream/5 p-5">
                <p className="mb-2 text-sm text-cream/50">Current plan</p>
                <h3 className="mb-4 text-xl font-bold">{task.text}</h3>
                <p className="mb-2 text-sm text-cream/60">
                  Completed tasks: <span className="text-gold">{completeTasks}</span>
                </p>
                <p className="text-sm text-cream/60">
                  Remaining tasks: <span className="text-gold">{tasks.length - completeTasks}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </PanelFrame>
    </main>
  );
}
