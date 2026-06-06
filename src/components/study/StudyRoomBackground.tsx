"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BACKGROUND_ROTATION_MS,
  studyBackgrounds,
} from "@/lib/backgrounds";
import { useStudyRoomStore } from "@/store/study-room-store";

export function StudyRoomBackground() {
  const theme = useStudyRoomStore((state) => state.theme);
  const isDay = theme === "day";
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const activeBackground = studyBackgrounds[backgroundIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBackgroundIndex((current) => (current + 1) % studyBackgrounds.length);
    }, BACKGROUND_ROTATION_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className={`absolute inset-0 overflow-hidden transition-colors duration-700 ${
        isDay ? "bg-[#caa982]" : "bg-[#111825]"
      }`}
    >
      <motion.div
        key={activeBackground.imageUrl}
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${activeBackground.imageUrl})`,
          backgroundPosition: activeBackground.position,
        }}
      />

      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDay ? "bg-[#7b5432]/35" : "bg-[#050608]/55"
        }`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,7,5,0.58)_0%,rgba(10,7,5,0.12)_24%,rgba(10,7,5,0.22)_68%,rgba(10,7,5,0.62)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.4)_100%)]" />

      <motion.div
        className="absolute left-[12%] top-[17%] h-12 w-28 rounded-full bg-cream/20 blur-sm"
        animate={{ x: [0, 36, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[17%] top-[18%] h-10 w-24 rounded-full bg-gold/20 blur-md"
        animate={{ x: [0, -32, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <a
        href={activeBackground.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto absolute bottom-5 left-6 z-10 rounded-full bg-black/35 px-3 py-1.5 text-xs font-medium text-cream/75 backdrop-blur-md"
      >
        {activeBackground.attribution}
      </a>
    </div>
  );
}
