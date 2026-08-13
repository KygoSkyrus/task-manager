import { memo, useCallback, useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import { useTasks } from "@/context/TaskContext";

export const TaskForm = memo(function TaskForm() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const trimmed = title.trim();
      if (!trimmed) {
        setError("Please write something before adding a task.");
        return;
      }
      if (trimmed.length > 120) {
        setError("Keep it under 120 characters.");
        return;
      }
      addTask(trimmed);
      setTitle("");
      setError(null);
    },
    [title, addTask],
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div
        className={`flex items-center gap-2 rounded-2xl border bg-card/70 p-2 transition-smooth focus-within:ring-4 focus-within:ring-ring/20 ${error ? "border-destructive/60" : "border-border"
          }`}
      >
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError(null);
          }}
          aria-label="New task"
          aria-invalid={!!error}
          placeholder="What needs your calm attention today?"
          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-smooth hover:brightness-105 hover:shadow-[var(--shadow-lift)] active:scale-[0.97] cursor-pointer"
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">Add task</span>
        </button>
      </div>
      <p
        className={`overflow-hidden pl-2 text-sm text-destructive transition-smooth ${error ? "mt-2 max-h-8 opacity-100" : "max-h-0 opacity-0"
          }`}
        role="alert"
      >
        {error}
      </p>
    </form>
  );
});
