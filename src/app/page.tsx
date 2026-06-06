import Link from "next/link";
import {
  BookHeart,
  CheckCircle2,
  Headphones,
  NotebookPen,
  Timer,
} from "lucide-react";
import { StudyRoomBackground } from "@/components/study/StudyRoomBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-navy-950 text-cream">
      <StudyRoomBackground />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,21,38,0.9),rgba(7,21,38,0.45)_55%,rgba(7,21,38,0.8))]" />

      <section className="relative z-10 flex min-h-screen flex-col justify-between px-5 py-6 sm:px-8 lg:px-12">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 bg-gold/15 text-gold">
              <BookHeart className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold uppercase tracking-[0.22em]">
              Study Room
            </span>
          </div>
          <Link
            href="/study"
            className="rounded-full border border-cream/20 bg-cream/10 px-4 py-2 text-sm font-medium text-cream backdrop-blur-xl transition hover:border-gold/60 hover:text-gold"
          >
            Enter
          </Link>
        </nav>

        <div className="grid min-h-[72vh] content-center pb-10 pt-12">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-gold">
              Lo-fi focus for scripture, prayer, and reflection
            </p>
            <h1 className="max-w-2xl text-5xl font-semibold tracking-normal text-cream sm:text-6xl lg:text-7xl">
              Study Room
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/80">
              A peaceful Bible study space with ambient controls, scripture
              prompts, notes, prayer points, study goals, and a local Pomodoro
              rhythm.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/study"
                className="rounded-full bg-gold px-6 py-3 text-center text-sm font-semibold text-navy-950 transition hover:bg-cream"
              >
                Start studying
              </Link>
              <a
                href="#features"
                className="rounded-full border border-cream/20 bg-cream/10 px-6 py-3 text-center text-sm font-semibold text-cream transition hover:border-gold/60 hover:text-gold"
              >
                Explore features
              </a>
            </div>
          </div>
        </div>

        <section
          id="features"
          className="grid gap-3 pb-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              icon: Timer,
              title: "Focus timer",
              text: "Custom study sessions with local progress tracking.",
            },
            {
              icon: NotebookPen,
              title: "Saved notes",
              text: "Autosaved reflections, cross references, and responses.",
            },
            {
              icon: Headphones,
              title: "Ambience",
              text: "Lo-fi player UI with nature and study sound controls.",
            },
            {
              icon: CheckCircle2,
              title: "Study goals",
              text: "A simple checklist for reading, prayer, and review.",
            },
          ].map((feature) => (
            <article
              key={feature.title}
              className="glass-panel rounded-2xl p-4"
            >
              <feature.icon className="mb-4 h-5 w-5 text-gold" />
              <h2 className="mb-2 text-base font-semibold">{feature.title}</h2>
              <p className="text-sm leading-6 text-cream/70">{feature.text}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
