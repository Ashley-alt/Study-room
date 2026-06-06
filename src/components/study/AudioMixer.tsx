"use client";

import { Headphones, Pause, Play, Volume2 } from "lucide-react";
import { ambientTracks } from "@/lib/study-data";
import { useStudyRoomStore } from "@/store/study-room-store";

export function AudioMixer() {
  const musicPlaying = useStudyRoomStore((state) => state.musicPlaying);
  const musicVolume = useStudyRoomStore((state) => state.musicVolume);
  const ambience = useStudyRoomStore((state) => state.ambience);
  const setMusicPlaying = useStudyRoomStore((state) => state.setMusicPlaying);
  const setMusicVolume = useStudyRoomStore((state) => state.setMusicVolume);
  const toggleAmbience = useStudyRoomStore((state) => state.toggleAmbience);
  const setAmbienceVolume = useStudyRoomStore((state) => state.setAmbienceVolume);

  return (
    <section className="glass-panel rounded-2xl p-5 text-cream">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Headphones className="h-5 w-5 text-gold" />
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/75">
            Audio
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setMusicPlaying(!musicPlaying)}
          className="rounded-full bg-gold p-2 text-navy-950 transition hover:bg-cream"
          aria-label={musicPlaying ? "Pause lo-fi music" : "Play lo-fi music"}
          title={musicPlaying ? "Pause lo-fi music" : "Play lo-fi music"}
        >
          {musicPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
      </div>
      <div className="mb-5 rounded-xl border border-cream/10 bg-navy-950/50 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-medium">Lo-fi study loop</p>
          <span className="text-xs text-cream/50">/audio/lofi-placeholder.mp3</span>
        </div>
        <label className="flex items-center gap-3 text-xs text-cream/60">
          <Volume2 className="h-4 w-4 text-gold" />
          <input
            type="range"
            min={0}
            max={100}
            value={musicVolume}
            onChange={(event) => setMusicVolume(Number(event.target.value))}
            className="range-warm w-full"
          />
          <span className="w-8 text-right">{musicVolume}</span>
        </label>
      </div>
      <div className="space-y-3">
        {ambientTracks.map((track) => (
          <div
            key={track.id}
            className="rounded-xl border border-cream/10 bg-cream/10 p-3"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => toggleAmbience(track.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  ambience[track.id].enabled
                    ? "bg-gold text-navy-950"
                    : "border border-cream/20 text-cream/70 hover:border-gold/50"
                }`}
              >
                {track.label}
              </button>
              <span className="truncate text-xs text-cream/40">{track.path}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={ambience[track.id].volume}
              onChange={(event) =>
                setAmbienceVolume(track.id, Number(event.target.value))
              }
              className="range-warm w-full"
              aria-label={`${track.label} volume`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
