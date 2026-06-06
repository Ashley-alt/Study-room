"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AmbientId, StudyTopic, defaultTasks } from "@/lib/study-data";

export type ThemeMode = "day" | "night";

export type StudyTask = {
  id: string;
  text: string;
  completed: boolean;
};

type AmbientState = Record<AmbientId, { enabled: boolean; volume: number }>;

type StudyRoomState = {
  theme: ThemeMode;
  selectedTopic: StudyTopic;
  notes: string;
  tasks: StudyTask[];
  completedSessions: number;
  studyDuration: number;
  breakDuration: number;
  musicPlaying: boolean;
  musicVolume: number;
  ambience: AmbientState;
  setTheme: (theme: ThemeMode) => void;
  setSelectedTopic: (topic: StudyTopic) => void;
  setNotes: (notes: string) => void;
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  resetTasks: () => void;
  incrementCompletedSessions: () => void;
  setStudyDuration: (minutes: number) => void;
  setBreakDuration: (minutes: number) => void;
  setMusicPlaying: (playing: boolean) => void;
  setMusicVolume: (volume: number) => void;
  toggleAmbience: (id: AmbientId) => void;
  setAmbienceVolume: (id: AmbientId, volume: number) => void;
};

const createTask = (text: string): StudyTask => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  text,
  completed: false,
});

const defaultAmbience: AmbientState = {
  rain: { enabled: true, volume: 42 },
  fireplace: { enabled: false, volume: 32 },
  wind: { enabled: false, volume: 24 },
  coffeeShop: { enabled: false, volume: 18 },
  pages: { enabled: false, volume: 28 },
};

export const useStudyRoomStore = create<StudyRoomState>()(
  persist(
    (set) => ({
      theme: "night",
      selectedTopic: "Faith",
      notes: "",
      tasks: defaultTasks.map(createTask),
      completedSessions: 0,
      studyDuration: 25,
      breakDuration: 5,
      musicPlaying: false,
      musicVolume: 56,
      ambience: defaultAmbience,
      setTheme: (theme) => set({ theme }),
      setSelectedTopic: (selectedTopic) => set({ selectedTopic }),
      setNotes: (notes) => set({ notes }),
      addTask: (text) =>
        set((state) => ({ tasks: [createTask(text), ...state.tasks] })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task,
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
      resetTasks: () => set({ tasks: defaultTasks.map(createTask) }),
      incrementCompletedSessions: () =>
        set((state) => ({ completedSessions: state.completedSessions + 1 })),
      setStudyDuration: (studyDuration) =>
        set({ studyDuration: Math.min(120, Math.max(1, studyDuration)) }),
      setBreakDuration: (breakDuration) =>
        set({ breakDuration: Math.min(30, Math.max(1, breakDuration)) }),
      setMusicPlaying: (musicPlaying) => set({ musicPlaying }),
      setMusicVolume: (musicVolume) => set({ musicVolume }),
      toggleAmbience: (id) =>
        set((state) => ({
          ambience: {
            ...state.ambience,
            [id]: {
              ...state.ambience[id],
              enabled: !state.ambience[id].enabled,
            },
          },
        })),
      setAmbienceVolume: (id, volume) =>
        set((state) => ({
          ambience: {
            ...state.ambience,
            [id]: { ...state.ambience[id], volume },
          },
        })),
    }),
    {
      name: "study-room-preferences",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        selectedTopic: state.selectedTopic,
        notes: state.notes,
        tasks: state.tasks,
        completedSessions: state.completedSessions,
        studyDuration: state.studyDuration,
        breakDuration: state.breakDuration,
        musicPlaying: state.musicPlaying,
        musicVolume: state.musicVolume,
        ambience: state.ambience,
      }),
    },
  ),
);
