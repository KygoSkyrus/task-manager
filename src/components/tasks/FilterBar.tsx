import { memo } from "react";
import { useTasks, type Filter } from "@/context/TaskContext";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Completed" },
];

export const FilterBar = memo(function FilterBar() {
  const { filter, setFilter, counts, clearCompleted } = useTasks();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex rounded-2xl border border-border bg-card/60 p-1">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-current={active}
              className={`rounded-xl px-3.5 py-2 text-sm font-medium transition-smooth sm:px-4  cursor-pointer ${active
                ? "bg-gradient-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {f.label}
              <span className="ml-1.5 text-xs opacity-70">{counts[f.key]}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={clearCompleted}
        disabled={counts.completed === 0}
        className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
      >
        Clear completed
      </button>
    </div>
  );
});
