"use client";

import { motion } from "framer-motion";
import { useStudyRoomStore } from "@/store/study-room-store";

export function StudyRoomBackground() {
  const theme = useStudyRoomStore((state) => state.theme);
  const isDay = theme === "day";

  return (
    <div
      className={`absolute inset-0 overflow-hidden transition-colors duration-700 ${
        isDay ? "bg-[#caa982]" : "bg-[#111825]"
      }`}
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 ${
          isDay
            ? "bg-[linear-gradient(180deg,#d6b18f_0%,#c9a379_34%,#937254_100%)]"
            : "bg-[linear-gradient(180deg,#17283a_0%,#2a2a35_38%,#604333_100%)]"
        }`}
      />

      <div className="absolute inset-x-[5%] top-[3%] h-[73%] overflow-hidden rounded-b-[28px] border-x-[12px] border-t-[12px] border-[#2a221d]/50 bg-[#7f9267] shadow-[inset_0_0_80px_rgba(0,0,0,0.32)]">
        <div
          className={`absolute inset-0 ${
            isDay
              ? "bg-[linear-gradient(180deg,#94a86b_0%,#b6a664_38%,#be895d_100%)]"
              : "bg-[linear-gradient(180deg,#1f3144_0%,#455060_42%,#805d47_100%)]"
          }`}
        />
        <motion.div
          className="absolute left-[31%] top-[12%] h-20 w-20 rounded-full bg-cream/70 blur-[1px]"
          animate={{ opacity: isDay ? 0.72 : 0.18 }}
        />
        <div className="absolute inset-x-0 bottom-[22%] h-[16%] bg-[#b7774d]/50" />
        <div className="absolute inset-x-0 bottom-[28%] h-[4%] bg-[#d9c18a]/50" />
        {Array.from({ length: 18 }).map((_, index) => (
          <div
            key={index}
            className="absolute bottom-[23%] w-[2.5%] rounded-t-full bg-[#57402f]/60"
            style={{
              left: `${index * 6 - 2}%`,
              height: `${34 + (index % 5) * 8}%`,
            }}
          >
            <div className="absolute -left-8 -top-14 h-24 w-28 rounded-full bg-[#6f7d4f]/70 blur-[2px]" />
          </div>
        ))}
        <div className="absolute inset-y-0 left-[25%] w-[8px] bg-[#2d2a26]/60" />
        <div className="absolute inset-y-0 left-[47%] w-[8px] bg-[#2d2a26]/60" />
        <div className="absolute inset-y-0 left-[71%] w-[8px] bg-[#2d2a26]/60" />
        <div className="absolute inset-x-0 bottom-0 h-[18px] bg-[#2d241e]/70" />
        <motion.div
          className="absolute left-[14%] top-[24%] h-10 w-16 rounded-full bg-cream/25 blur-sm"
          animate={{ x: [0, 28, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[19%] top-[17%] h-9 w-24 rounded-full bg-cream/20 blur-sm"
          animate={{ x: [0, -36, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(180deg,rgba(98,66,44,0)_0%,#7b5439_16%,#3b261d_100%)]" />
      <div className="absolute bottom-[4%] left-[1%] h-[33%] w-[45%] -rotate-1 rounded-t-[16px] bg-[linear-gradient(130deg,#9b765c,#6b4b3a)] shadow-2xl" />
      <div className="absolute bottom-[7%] right-[4%] h-[28%] w-[36%] rotate-1 rounded-t-[20px] bg-[linear-gradient(145deg,#7c5744,#4b3026)] shadow-2xl" />

      <div className="absolute bottom-[37%] left-[8%] h-[28%] w-[23%]">
        <div className="absolute bottom-0 h-[72%] w-full rounded-t-lg bg-[#6e513e] shadow-xl" />
        <div className="absolute bottom-[59%] left-[8%] right-[8%] h-5 rounded-full bg-[#2d251f]" />
        <div className="absolute bottom-[10%] left-[11%] right-[11%] h-[52%] rounded bg-[#2b211c]" />
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="absolute bottom-[18%] h-[42%] w-px bg-cream/30"
            style={{ left: `${16 + index * 7}%` }}
          />
        ))}
        <div className="absolute -right-7 top-0 h-36 w-8 rounded-full bg-[#2c2420]" />
      </div>

      <div className="absolute bottom-[26%] left-[41%] h-[38%] w-[18%]">
        <div className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 rounded-full bg-[#5d4534]" />
        <div className="absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 rounded-t-full bg-[linear-gradient(180deg,#ffe0a4,#bb8954)] shadow-glow" />
        <div className="absolute left-1/2 top-6 h-16 w-20 -translate-x-1/2 rounded-t-full bg-cream/40 blur-md" />
        <div className="absolute bottom-0 left-1/2 h-8 w-28 -translate-x-1/2 rounded-full bg-[#32241e]" />
      </div>

      <div className="absolute bottom-[24%] right-[23%] h-[38%] w-[13%]">
        <div className="absolute bottom-0 left-[42%] h-[72%] w-3 rounded-full bg-[#594233]" />
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-[#6f7e52]"
            style={{
              left: `${index % 2 ? 18 : 47}%`,
              top: `${8 + index * 10}%`,
              height: `${30 + index * 2}px`,
              width: `${58 - index * 3}px`,
              transform: `rotate(${index % 2 ? -22 : 20}deg)`,
            }}
          />
        ))}
        <div className="absolute bottom-0 h-28 w-full rounded-t-[48px] bg-[#9a6545]" />
      </div>

      <div className="absolute bottom-[14%] left-[12%] h-[14%] w-[9%] rounded-b-[42px] rounded-t-[14px] bg-[linear-gradient(180deg,#d5b789,#8f674f)] shadow-xl">
        <div className="absolute -right-7 top-7 h-10 w-8 rounded-full border-[8px] border-[#b89069]" />
        {[0, 1, 2].map((item) => (
          <span
            key={item}
            className="absolute left-1/2 h-10 w-2 rounded-full bg-cream/60 blur-sm animate-steam"
            style={{ top: `-${item * 16 + 20}px`, animationDelay: `${item * 0.7}s` }}
          />
        ))}
      </div>

      <div className="absolute bottom-[13%] left-[29%] h-[9%] w-[18%] -rotate-6 rounded-lg bg-[linear-gradient(135deg,#f5e7c4,#caa66e)] shadow-xl">
        <div className="absolute left-1/2 top-2 bottom-2 w-px bg-walnut/40" />
        <div className="absolute left-5 right-5 top-5 h-px bg-walnut/25" />
        <div className="absolute left-6 right-7 top-9 h-px bg-walnut/20" />
      </div>

      <div className="absolute bottom-[16%] right-[15%] h-[15%] w-[18%] rounded-xl bg-[linear-gradient(145deg,#b58a61,#75513d)] shadow-2xl">
        <div className="absolute left-5 right-5 top-5 h-3 rounded-full bg-[#5d4234]/70" />
        <div className="absolute bottom-4 left-6 right-6 h-4 rounded-full bg-[#5d4234]/50" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,12,9,0.45)_0%,transparent_16%,transparent_76%,rgba(18,12,9,0.42)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_46%,rgba(0,0,0,0.28)_100%)]" />
    </div>
  );
}
