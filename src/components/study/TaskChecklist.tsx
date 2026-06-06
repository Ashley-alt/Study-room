"use client";

import { FormEvent, useState } from "react";
import { Check, Plus, RotateCcw, Trash2 } from "lucide-react";
import { useStudyRoomStore } from "@/store/study-room-store";

export function TaskChecklist() {
  const [taskText, setTaskText] = useState("");
  const tasks = useStudyRoomStore((state) => state.tasks);
  const addTask = useStudyRoomStore((state) => state.addTask);
  const toggleTask = useStudyRoomStore((state) => state.toggleTask);
  const deleteTask = useStudyRoomStore((state) => state.deleteTask);
  const resetTasks = useStudyRoomStore((state) => state.resetTasks);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!taskText.trim()) return;
    addTask(taskText.trim());
    setTaskText("");
  };

  return (
    <section className="glass-panel rounded-2xl p-5 text-cream">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-gold" />
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/75">
            Checklist
          </h2>
        </div>
        <button
          type="button"
          onClick={resetTasks}
          className="rounded-full border border-cream/15 p-2 text-cream/70 transition hover:border-gold/50 hover:text-gold"
          aria-label="Reset checklist"
          title="Reset checklist"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          value={taskText}
          onChange={(event) => setTaskText(event.target.value)}
          placeholder="Add study task"
          className="min-w-0 flex-1 rounded-full border border-cream/15 bg-navy-950/50 px-4 py-2 text-sm text-cream outline-none placeholder:text-cream/50 focus:border-gold/60"
        />
        <button
          type="submit"
          className="rounded-full bg-gold p-2 text-navy-950 transition hover:bg-cream"
          aria-label="Add task"
          title="Add task"
        >
          <Plus className="h-5 w-5" />
        </button>
      </form>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 rounded-xl border border-cream/10 bg-cream/10 p-3"
          >
            <button
              type="button"
              onClick={() => toggleTask(task.id)}
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition ${
                task.completed
                  ? "border-gold bg-gold text-navy-950"
                  : "border-cream/30 text-transparent hover:border-gold"
              }`}
              aria-label={task.completed ? "Mark task incomplete" : "Mark task complete"}
            >
              <Check className="h-4 w-4" />
            </button>
            <span
              className={`min-w-0 flex-1 text-sm ${
                task.completed ? "text-cream/50 line-through" : "text-cream/80"
              }`}
            >
              {task.text}
            </span>
            <button
              type="button"
              onClick={() => deleteTask(task.id)}
              className="rounded-full p-1.5 text-cream/50 transition hover:bg-cream/10 hover:text-cream"
              aria-label={`Delete ${task.text}`}
              title="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
