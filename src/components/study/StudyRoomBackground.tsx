"use client";

import { motion } from "framer-motion";
import { useStudyRoomStore } from "@/store/study-room-store";

export function StudyRoomBackground() {
  const theme = useStudyRoomStore((state) => state.theme);
  const isDay = theme === "day";

  return (
    <div
      className={`absolute inset-0 overflow-hidden transition-colors duration-700 ${
        isDay ? "bg-[#6e8aa0]" : "bg-navy-950"
      }`}
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 ${
          isDay
            ? "bg-[radial-gradient(circle_at_22%_10%,rgba(255,248,231,0.72),transparent_28%),linear-gradient(180deg,#7ea1b2_0%,#e4c99f_78%,#31241e_100%)]"
            : "bg-[radial-gradient(circle_at_68%_12%,rgba(216,168,78,0.16),transparent_22%),linear-gradient(180deg,#071526_0%,#142a3d_55%,#241914_100%)]"
        }`}
      />

      <motion.div
        className="absolute left-[8%] top-[10%] h-16 w-16 rounded-full bg-cream/80 shadow-glow"
        animate={{ opacity: isDay ? 0.8 : 0.22, scale: isDay ? 1 : 0.72 }}
        transition={{ duration: 0.8 }}
      />

      <motion.div
        className="absolute right-[9%] top-[8%] h-28 w-28 rounded-full bg-gold/25 blur-2xl"
        animate={{ opacity: isDay ? 0.22 : 0.78 }}
        transition={{ duration: 1 }}
      />

      <div className="absolute left-1/2 top-[9%] h-[34%] w-[36%] -translate-x-1/2 rounded-t-[72px] border border-cream/20 bg-navy-900/50 shadow-2xl backdrop-blur-sm md:w-[28%]">
        <div className="absolute inset-x-5 top-5 bottom-5 grid grid-cols-2 gap-3">
          <div className="rounded-tl-[48px] border border-cream/10 bg-[#10263a]/70" />
          <div className="rounded-tr-[48px] border border-cream/10 bg-[#10263a]/70" />
        </div>
        <div className="absolute inset-x-7 top-1/2 h-px bg-cream/15" />
        <div className="absolute left-1/2 top-6 bottom-6 w-px bg-cream/15" />
        {Array.from({ length: 18 }).map((_, index) => (
          <motion.span
            key={index}
            className="absolute top-0 h-12 w-px rounded-full bg-cream/30"
            style={{ left: `${8 + index * 5}%` }}
            animate={{ y: [0, 58], opacity: [0, 0.5, 0] }}
            transition={{
              duration: 0.9 + (index % 4) * 0.18,
              repeat: Infinity,
              delay: index * 0.12,
              ease: "linear",
            }}
          />
        ))}
        <motion.div
          className="absolute -left-12 top-12 h-10 w-28 rounded-full bg-cream/20 blur-sm"
          animate={{ x: [0, 38, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-5 top-24 h-8 w-24 rounded-full bg-cream/14 blur-sm"
          animate={{ x: [0, -44, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[34%] bg-[linear-gradient(180deg,rgba(36,25,20,0),#1f1511_28%,#120d0b_100%)]" />

      <div className="absolute bottom-[12%] left-1/2 h-[18%] w-[78%] -translate-x-1/2 rounded-t-[48px] bg-[linear-gradient(180deg,#7b5138,#3a241b)] shadow-[0_-18px_90px_rgba(0,0,0,0.25)] md:w-[62%]" />
      <div className="absolute bottom-[22%] left-[27%] h-[17%] w-[20%] -rotate-3 rounded-[10px] bg-[linear-gradient(135deg,#f7edcf,#d4b37a)] shadow-2xl">
        <div className="absolute left-1/2 top-4 bottom-4 w-px bg-walnut/30" />
        <div className="absolute left-7 right-7 top-7 h-px bg-walnut/30" />
        <div className="absolute left-9 right-10 top-14 h-px bg-walnut/20" />
        <div className="absolute left-8 right-12 top-20 h-px bg-walnut/20" />
      </div>
      <div className="absolute bottom-[25%] left-[18%] h-[18%] w-[7%] rounded-t-full bg-[linear-gradient(180deg,#d9a957,#8b542f)] shadow-glow">
        <div className="absolute left-1/2 top-6 h-[52%] w-2 -translate-x-1/2 rounded-full bg-walnut/30" />
        <div className="absolute -top-5 left-1/2 h-8 w-5 -translate-x-1/2 rounded-full bg-gold blur-[1px] animate-flicker" />
      </div>
      <div className="absolute bottom-[25%] right-[25%] h-[13%] w-[10%] rounded-b-[36px] rounded-t-[10px] bg-[linear-gradient(180deg,#fff8e7,#c69b72)] shadow-2xl">
        <div className="absolute -right-6 top-5 h-10 w-8 rounded-full border-[8px] border-parchment/80" />
        {[0, 1, 2].map((item) => (
          <span
            key={item}
            className="absolute left-1/2 h-9 w-2 rounded-full bg-cream/50 blur-sm animate-steam"
            style={{ top: `-${item * 15 + 18}px`, animationDelay: `${item * 0.65}s` }}
          />
        ))}
      </div>
      <div className="absolute bottom-[25%] right-[12%] flex h-[18%] w-[12%] items-end gap-2">
        <div className="h-[72%] flex-1 rounded-t bg-moss" />
        <div className="h-full flex-1 rounded-t bg-ember" />
        <div className="h-[58%] flex-1 rounded-t bg-parchment" />
      </div>
      <div className="absolute bottom-[33%] left-[53%] h-[26%] w-[11%] rounded-t-full bg-[linear-gradient(180deg,#f2d37b,#5b3d2e)] shadow-glow">
        <div className="absolute left-1/2 top-[56%] h-[40%] w-[160%] -translate-x-1/2 rounded-full bg-gold/20 blur-xl" />
      </div>
      <div className="absolute bottom-[12%] left-[13%] h-[12%] w-[8%] rounded-b-2xl bg-[#291914]" />
      <div className="absolute bottom-[12%] right-[15%] h-[12%] w-[8%] rounded-b-2xl bg-[#291914]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.34)_100%)]" />
    </div>
  );
}
