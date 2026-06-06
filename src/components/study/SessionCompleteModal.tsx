"use client";

import { motion } from "framer-motion";
import { BookHeart, X } from "lucide-react";

type SessionCompleteModalProps = {
  open: boolean;
  onClose: () => void;
  sessions: number;
};

export function SessionCompleteModal({
  open,
  onClose,
  sessions,
}: SessionCompleteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy-950/70 px-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="glass-panel relative w-full max-w-md rounded-2xl p-7 text-center text-cream"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-cream/60 transition hover:bg-cream/10 hover:text-cream"
          aria-label="Close session complete modal"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-gold/20 text-gold">
          <BookHeart className="h-7 w-7" />
        </div>
        <h2 className="mb-3 text-2xl font-semibold">Session complete</h2>
        <p className="mb-5 leading-7 text-cream/75">
          Well done. Let what you studied settle slowly, and carry one clear
          response into the rest of your day.
        </p>
        <p className="mb-6 text-sm text-cream/60">
          Completed study sessions: <span className="text-gold">{sessions}</span>
        </p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-navy-950 transition hover:bg-cream"
        >
          Return to room
        </button>
      </motion.div>
    </div>
  );
}
